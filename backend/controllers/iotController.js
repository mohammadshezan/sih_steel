// IoT mock data controller with random walk + optional persistence
const mongoose = require('mongoose');
const IoTSnapshot = require('../models/IoTSnapshot');

let rakePositions = [
  { id: 'Rake-101', coords: [23.6693, 86.1511], status: 'At Bokaro Plant' },
  { id: 'Rake-102', coords: [23.7100, 86.2000], status: 'At Yard' },
  { id: 'Rake-103', coords: [23.7300, 86.2200], status: 'En route to Customer' }
];

function nudge(val, delta) {
  return val + (Math.random() - 0.5) * delta;
}

function randomWalk() {
  rakePositions = rakePositions.map(r => {
    const [lat, lng] = r.coords;
    const next = [nudge(lat, 0.01), nudge(lng, 0.01)];
    const status = Math.random() < 0.1 ? 'Delayed' : (r.status || 'On Time');
    return { ...r, coords: next, status };
  });
}

const isDbConnected = () => mongoose.connection && mongoose.connection.readyState === 1;

exports.getRake = async (req, res) => {
  try {
    randomWalk();
    // persist snapshots if DB is connected
    if (isDbConnected()) {
      const docs = rakePositions.map(r => ({ rakeId: r.id, lat: r.coords[0], lng: r.coords[1], status: r.status }));
      // fire-and-forget
      IoTSnapshot.insertMany(docs, { ordered: false }).catch(() => {});
    }
    res.json(rakePositions);
  } catch (err) {
    res.json(rakePositions);
  }
};

exports.getHistory = async (req, res) => {
  try {
    if (!isDbConnected()) return res.json([]);
    const { rakeId, limit = 100 } = req.query;
    const q = rakeId ? { rakeId } : {};
    const items = await IoTSnapshot.find(q).sort({ ts: -1 }).limit(Math.min(Number(limit), 500)).lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};
