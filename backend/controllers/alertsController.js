// Alerts with coordinates for map pinning (demo data)
exports.getAlerts = (req, res) => {
  const alerts = [
    { id: 'AL-001', type: 'Congestion', message: 'Congested route: Bokaro → Bellary', coords: { lat: 18.0, lng: 80.0 } },
    { id: 'AL-002', type: 'Repair', message: 'Track repairs near Durgapur', coords: { lat: 23.52, lng: 87.321 } },
    { id: 'AL-003', type: 'Delay', message: 'Delay warning for Rake 2', coords: { lat: 22.8, lng: 85.8 } }
  ];
  res.json(alerts);
};
