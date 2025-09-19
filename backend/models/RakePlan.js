// Rake Plan model (persist instead of in-memory)
const mongoose = require('mongoose');

const rakePlanSchema = new mongoose.Schema({
  wagons: { type: [String], default: [] },
  cargo: { type: String },
  destination: { type: String },
  destinationCoords: { lat: Number, lng: Number },
  origin: { name: String, lat: Number, lng: Number },
  submittedAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('RakePlan', rakePlanSchema);
