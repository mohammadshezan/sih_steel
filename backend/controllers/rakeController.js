// In-memory last plan store retained for fallback; but we persist to Mongo when available
let lastPlan = null;
const RakePlan = require('../models/RakePlan');

// Map a destination to demo coordinates
function destinationToCoords(destination) {
  switch ((destination || '').toLowerCase()) {
    case 'jamshedpur':
      return { lat: 22.8046, lng: 86.2029 };
    case 'bellary':
      return { lat: 15.1394, lng: 76.9214 };
    case 'mumbai':
      return { lat: 19.076, lng: 72.8777 };
    case 'delhi':
      return { lat: 28.6139, lng: 77.2090 };
    default:
      return { lat: 23.669, lng: 86.148 }; // Bokaro fallback
  }
}

exports.planRake = async (req, res) => {
  try {
    const { wagons, cargo, destination } = req.body || {};
    const dest = destinationToCoords(destination);
    const plan = {
      submittedAt: new Date(),
      wagons: Array.isArray(wagons) ? wagons : [],
      cargo: cargo || 'Unknown',
      destination: destination || 'Unknown',
      destinationCoords: dest,
      origin: { name: 'Bokaro Plant', lat: 23.669, lng: 86.148 },
      createdBy: req.user?.id || undefined,
    };
    lastPlan = { ...plan, submittedAt: plan.submittedAt.toISOString() };
    // try persist
    try {
      const saved = await RakePlan.create(plan);
      lastPlan._id = saved._id.toString();
    } catch (e) {
      // ignore persistence error for now
    }
    res.json({ message: 'Rake plan stored', plan: lastPlan });
  } catch (err) {
    res.status(500).json({ error: 'Failed to store rake plan' });
  }
};

exports.getLastPlan = async (req, res) => {
  if (lastPlan) return res.json(lastPlan);
  try {
    const recent = await RakePlan.findOne({}, {}, { sort: { submittedAt: -1 } }).lean();
    if (!recent) return res.json({});
    return res.json(recent);
  } catch (_) {
    return res.json({});
  }
};

exports.listPlans = async (req, res) => {
  try {
    const items = await RakePlan.find({}).sort({ submittedAt: -1 }).limit(50).lean();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list plans' });
  }
};
