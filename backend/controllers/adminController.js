// Admin panel controller
const User = require('../models/User');
const Inventory = require('../models/Inventory');
const CustomerDemand = require('../models/CustomerDemand');
const Alert = require('../models/Alert');
const RakePlan = require('../models/RakePlan');
const mongoose = require('mongoose');

exports.getUsers = async (req, res) => {
  try {
    // return list without password and otp
    const users = await User.find({}, { password: 0, otp: 0 }).lean();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// POST /api/admin/seed - one-click seed DB
exports.seedDb = async (req, res) => {
  try {
    // Ensure Mongo connection
    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/steel';
      await mongoose.connect(uri);
    }

    const invSeed = [
      { plant: 'Bokaro', steelStock: 5200 },
      { plant: 'Durgapur', steelStock: 3400 },
      { plant: 'Rourkela', steelStock: 6100 },
    ];
    const demSeed = [
      { customer: 'SAIL - Jamshedpur', date: new Date(), tonnage: 900, destination: 'Jamshedpur' },
      { customer: 'JSW - Bellary', date: new Date(Date.now() + 86400000), tonnage: 700, destination: 'Bellary' },
      { customer: 'Tata - Mumbai', date: new Date(Date.now() + 2 * 86400000), tonnage: 650, destination: 'Mumbai' },
    ];
    const alertSeed = [
      { type: 'Congestion', message: 'Congested route: Bokaro → Bellary', coords: { lat: 18.0, lng: 80.0 } },
      { type: 'Repair', message: 'Track repairs near Durgapur', coords: { lat: 23.52, lng: 87.321 } },
      { type: 'Delay', message: 'Delay warning for Rake 2', coords: { lat: 22.8, lng: 85.8 } },
    ];

    let seeded = { inventoryInserted: 0, demandInserted: 0, alertsInserted: 0, rakePlanInserted: 0, skipped: [] };

    if ((await Inventory.countDocuments()) === 0) {
      const r = await Inventory.insertMany(invSeed);
      seeded.inventoryInserted = r.length;
    } else {
      seeded.skipped.push('inventory');
    }

    if ((await CustomerDemand.countDocuments()) === 0) {
      const r = await CustomerDemand.insertMany(demSeed);
      seeded.demandInserted = r.length;
    } else {
      seeded.skipped.push('customerDemand');
    }

    if ((await Alert.countDocuments()) === 0) {
      const r = await Alert.insertMany(alertSeed);
      seeded.alertsInserted = r.length;
    } else {
      seeded.skipped.push('alerts');
    }

    if ((await RakePlan.countDocuments()) === 0) {
      await RakePlan.create({
        wagons: ['Open-1', 'Open-2', 'Flat-3'],
        cargo: 'Steel Coils',
        destination: 'Jamshedpur',
        destinationCoords: { lat: 22.8046, lng: 86.2029 },
        origin: { name: 'Bokaro Plant', lat: 23.669, lng: 86.148 },
      });
      seeded.rakePlanInserted = 1;
    } else {
      seeded.skipped.push('rakePlans');
    }

    return res.json({ ok: true, seeded });
  } catch (err) {
    console.error('Seed API error:', err);
    return res.status(500).json({ error: 'Seeding failed' });
  }
};
