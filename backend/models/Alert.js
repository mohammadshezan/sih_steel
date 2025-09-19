const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  type: { type: String, default: 'Info' },
  message: { type: String, required: true },
  coords: { lat: Number, lng: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', alertSchema);