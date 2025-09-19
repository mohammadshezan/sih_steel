const mongoose = require('mongoose');
const Alert = require('../models/Alert');

const seedAlerts = [
  { type: 'Congestion', message: 'Congested route: Bokaro → Bellary', coords: { lat: 18.0, lng: 80.0 } },
  { type: 'Repair', message: 'Track repairs near Durgapur', coords: { lat: 23.52, lng: 87.321 } },
  { type: 'Delay', message: 'Delay warning for Rake 2', coords: { lat: 22.8, lng: 85.8 } }
];

exports.getAlerts = async (req, res) => {
  try {
    const isConnected = mongoose.connection && mongoose.connection.readyState === 1;
    if (!isConnected) {
      // DB not connected, return static demo list with synthetic ids
      return res.json(
        seedAlerts.map((a, i) => ({ id: `AL-${String(i + 1).padStart(3, '0')}`, ...a }))
      );
    }
    const count = await Alert.countDocuments();
    if (count === 0) {
      await Alert.insertMany(seedAlerts);
    }
    const alerts = await Alert.find({}).sort({ createdAt: -1 }).lean();
    // Normalize id property
    return res.json(alerts.map(a => ({ id: a._id.toString(), type: a.type, message: a.message, coords: a.coords })));
  } catch (err) {
    // Fallback to demo if something goes wrong
    return res.json(
      seedAlerts.map((a, i) => ({ id: `AL-${String(i + 1).padStart(3, '0')}`, ...a }))
    );
  }
};
