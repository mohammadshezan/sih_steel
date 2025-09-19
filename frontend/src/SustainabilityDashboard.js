import React from 'react';
import './SustainabilityDashboard.css';

const metrics = [
  { label: 'Carbon Footprint per Rake', value: '2.1 tons CO₂' },
  { label: 'Fuel Efficiency', value: '4.5 km/litre' },
  { label: 'Greener Route Suggestions', value: 'Bokaro → Bhilai' },
];

function SustainabilityDashboard() {
  return (
    <div className="sustainability-dashboard">
      <h2>Sustainability Dashboard</h2>
      <div className="metrics-row">
        {metrics.map(m => (
          <div key={m.label} className="metric">
            <h3>{m.label}</h3>
            <p>{m.value}</p>
          </div>
        ))}
      </div>
      <div className="alignment">
        <h3>Alignment</h3>
        <p>Net Zero India 2070 goals</p>
      </div>
    </div>
  );
}

export default SustainabilityDashboard;
