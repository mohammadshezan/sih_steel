// Dashboard controller placeholder

const Inventory = require('../models/Inventory');
const CustomerDemand = require('../models/CustomerDemand');

exports.getKPIs = async (req, res) => {
  try {
    // Example KPIs: total steel stock, total customer demand, last updated
    const totalStock = await Inventory.aggregate([
      { $group: { _id: null, total: { $sum: "$steelStock" } } }
    ]);
    const totalDemand = await CustomerDemand.aggregate([
      { $group: { _id: null, total: { $sum: "$tonnage" } } }
    ]);
    const lastInventoryUpdate = await Inventory.findOne({}, {}, { sort: { updatedAt: -1 } });
    res.json({
      totalSteelStock: totalStock[0]?.total || 0,
      totalCustomerDemand: totalDemand[0]?.total || 0,
      lastInventoryUpdate: lastInventoryUpdate?.updatedAt || null
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch KPIs' });
  }
};
