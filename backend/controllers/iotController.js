// IoT mock data controller placeholder

// Sample rake/train positions (latitude, longitude, status)
const rakePositions = [
  { id: 'Rake-101', coords: [23.6693, 86.1511], status: 'At Bokaro Plant' },
  { id: 'Rake-102', coords: [23.7100, 86.2000], status: 'At Yard' },
  { id: 'Rake-103', coords: [23.7300, 86.2200], status: 'En route to Customer' }
];

exports.getRake = (req, res) => {
  res.json(rakePositions);
};
