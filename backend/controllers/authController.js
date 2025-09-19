// Auth controller
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateOtp, sendSms, sendEmail } = require('../utils/otp');
const mongoose = require('mongoose');

const devOtpStore = new Map(); // username -> { code, expiresAt }
const isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;

// Registration
exports.register = async (req, res) => {
  try {
    const { username, password, role, email, phone } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role, email, phone });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ token, user: { username: user.username, role: user.role, email: user.email, phone: user.phone } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// Send OTP via SMS or Email
exports.sendOtp = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'username required' });
    // Dev fallback without DB
    if (!isDbConnected()) {
      const code = generateOtp(6);
      devOtpStore.set(username, { code, expiresAt: Date.now() + 5 * 60 * 1000 });
      const payload = { delivered: false, via: 'none' };
      if (process.env.NODE_ENV !== 'production') {
        payload.devCode = code;
        payload.devHint = 'Dev OTP store used (no DB).';
      }
      return res.json({ message: 'OTP generated', ...payload });
    }

    let user = await User.findOne({ username });
    if (!user) {
      // Auto-provision user in non-production to ease demos
      if (process.env.NODE_ENV === 'production') {
        return res.status(404).json({ error: 'User not found' });
      }
      const randomPass = await bcrypt.hash(Math.random().toString(36).slice(2), 8);
      user = new User({ username, password: randomPass, role: 'manager' });
      await user.save();
    }

    const code = generateOtp(6);
    const hash = await bcrypt.hash(code, 8);
    user.otpHash = hash;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    const msg = `Your login OTP is ${code}. It expires in 5 minutes.`;
    const html = `<p>Your login OTP is <strong>${code}</strong>.</p><p>It expires in 5 minutes.</p>`;
    let delivered = false;
    const preferEmail = (process.env.OTP_PREFERRED_CHANNEL || 'email').toLowerCase() === 'email';
    if (preferEmail && user.email) {
      delivered = await sendEmail(user.email, 'Your OTP', msg, html);
    }
    if (!delivered && user.phone) {
      delivered = await sendSms(user.phone, msg);
    }
    if (!delivered && !preferEmail && user.email) {
      delivered = await sendEmail(user.email, 'Your OTP', msg, html);
    }

    // Do not leak OTP in production response
    const payload = { delivered, via: delivered ? 'sms/email' : 'none' };
    if (process.env.NODE_ENV !== 'production') {
      payload.devCode = code;
      payload.devHint = 'Development mode: devCode returned for convenience.';
    }
    return res.json({ message: 'OTP generated', ...payload });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Verify OTP and issue JWT
exports.verifyOtp = async (req, res) => {
  try {
    const { username, otp } = req.body;
    if (!username || !otp) return res.status(400).json({ error: 'username and otp required' });
    // Dev fallback without DB
    if (!isDbConnected()) {
      const entry = devOtpStore.get(username);
      if (!entry) return res.status(400).json({ error: 'OTP not requested' });
      if (entry.expiresAt < Date.now()) return res.status(400).json({ error: 'OTP expired' });
      if (String(otp) !== String(entry.code)) return res.status(400).json({ error: 'Invalid OTP' });
      devOtpStore.delete(username);
      const token = jwt.sign({ id: `dev-${username}`, role: 'manager' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
      return res.json({ token, user: { username, role: 'manager' } });
    }

    const user = await User.findOne({ username });
    if (!user || !user.otpHash || !user.otpExpiresAt) return res.status(400).json({ error: 'OTP not requested' });
    if (user.otpExpiresAt < new Date()) return res.status(400).json({ error: 'OTP expired' });
    const ok = await bcrypt.compare(otp, user.otpHash);
    if (!ok) return res.status(400).json({ error: 'Invalid OTP' });
    // clear OTP
    user.otpHash = undefined;
    user.otpExpiresAt = undefined;
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    return res.json({ token, user: { username: user.username, role: user.role, email: user.email, phone: user.phone } });
  } catch (err) {
    return res.status(500).json({ error: 'OTP verification failed' });
  }
};

// Backwards-compatible endpoint
exports.otp = (req, res) => exports.sendOtp(req, res);
