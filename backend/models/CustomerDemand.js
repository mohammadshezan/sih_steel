// CustomerDemand model (MongoDB example)
const mongoose = require('mongoose');

const customerDemandSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  date: { type: Date, required: true },
  tonnage: { type: Number, required: true },
  destination: { type: String, required: true }
});

module.exports = mongoose.model('CustomerDemand', customerDemandSchema);
