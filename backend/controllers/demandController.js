// Demand controller placeholder

const Inventory = require('../models/Inventory');
const CustomerDemand = require('../models/CustomerDemand');

exports.getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find({});
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

exports.getCustomerDemand = async (req, res) => {
  try {
    const demand = await CustomerDemand.find({});
    res.json(demand);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customer demand' });
  }
};
