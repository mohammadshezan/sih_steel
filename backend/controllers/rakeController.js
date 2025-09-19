// In-memory last plan store (for demo). Replace with DB in production.
let lastPlan = null;

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

exports.planRake = (req, res) => {
  const { wagons, cargo, destination } = req.body || {};
  const dest = destinationToCoords(destination);
  lastPlan = {
    submittedAt: new Date().toISOString(),
    wagons: Array.isArray(wagons) ? wagons : [],
    cargo: cargo || 'Unknown',
    destination: destination || 'Unknown',
    destinationCoords: dest,
    origin: { name: 'Bokaro Plant', lat: 23.669, lng: 86.148 },
  };
  res.json({ message: 'Rake plan stored', plan: lastPlan });
};

exports.getLastPlan = (req, res) => {
  if (!lastPlan) return res.json({});
  res.json(lastPlan);
};
