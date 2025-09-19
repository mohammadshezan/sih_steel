// User model (MongoDB example)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'manager', 'supervisor'], required: true },
  email: { type: String },
  phone: { type: String },
  otpHash: { type: String },
  otpExpiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
