import React from 'react';
import './PredictiveMaintenance.css';

const alerts = [
  'Delay pattern detected for Rake 2',
  'Frequent issue: Wagon #5 axle',
  'Recommendation: Schedule maintenance for Loco #3',
];

function PredictiveMaintenance() {
  return (
    <div className="predictive-maintenance">
      <h2>Predictive Maintenance Alerts</h2>
      <div className="ai-analysis">
        <h3>AI Analysis</h3>
        <ul>
          {alerts.map((a, idx) => (
            <li key={idx}>{a}</li>
          ))}
        </ul>
      </div>
      <div className="impact">
        <h3>Impact</h3>
        <ul>
          <li>Reduced downtime</li>
          <li>Cost savings</li>
        </ul>
      </div>
    </div>
  );
}

export default PredictiveMaintenance;
