// Inventory model (MongoDB example)
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  plant: { type: String, required: true },
  steelStock: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', inventorySchema);
