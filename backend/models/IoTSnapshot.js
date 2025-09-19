const mongoose = require('mongoose');

const iotSnapshotSchema = new mongoose.Schema({
  rakeId: { type: String, required: true, index: true },
  lat: Number,
  lng: Number,
  status: String,
  ts: { type: Date, default: Date.now, index: true },
});

module.exports = mongoose.model('IoTSnapshot', iotSnapshotSchema);