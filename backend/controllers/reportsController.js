// Reports/analytics controller returning an array of metrics
exports.getMetrics = (req, res) => {
  const metrics = [
    { label: 'On-Time Deliveries', value: 92 },
    { label: 'Avg. Transit Time (h)', value: 18.4 },
    { label: 'Total Tonnage Moved', value: 12500 },
    { label: 'Cost Optimization %', value: 8 }
  ];
  res.json(metrics);
};
