const crypto = require('crypto');
let twilioClient = null;
try {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }
} catch (_) {}
const nodemailer = require('nodemailer');

function generateOtp(length = 6) {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) otp += digits[Math.floor(Math.random() * digits.length)];
  return otp;
}

async function sendSms(to, message) {
  if (!twilioClient || !process.env.TWILIO_FROM) return false;
  try {
    await twilioClient.messages.create({ from: process.env.TWILIO_FROM, to, body: message });
    return true;
  } catch (err) {
    return false;
  }
}

async function sendEmail(to, subject, text, html) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 587);
  if (!host || !user || !pass || !to) return false;
  try {
    const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
    await transporter.sendMail({ from: process.env.SMTP_FROM || user, to, subject, text, html });
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = { generateOtp, sendSms, sendEmail };
