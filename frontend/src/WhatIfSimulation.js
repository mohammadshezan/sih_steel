import React, { useState } from 'react';
import './WhatIfSimulation.css';

function WhatIfSimulation() {
  const [demandSpike, setDemandSpike] = useState(20);
  const [result, setResult] = useState(null);

  const simulate = () => {
    // Simulate AI output
    setResult({
      extraWagons: Math.ceil(demandSpike / 10),
      congestion: demandSpike > 15 ? 'High' : 'Low',
      costImpact: `₹${1250 + demandSpike * 10}`,
    });
  };

  return (
    <div className="whatif-simulation">
      <h2>What-If Simulation</h2>
      <div className="simulation-controls">
        <label>
          Demand Spike (%):
          <input type="number" value={demandSpike} onChange={e => setDemandSpike(Number(e.target.value))} min={0} max={100} />
        </label>
        <button onClick={simulate}>Simulate</button>
      </div>
      {result && (
        <div className="simulation-result">
          <h3>Simulation Result</h3>
          <ul>
            <li>Extra Wagons Needed: {result.extraWagons}</li>
            <li>Route Congestion: {result.congestion}</li>
            <li>Cost Impact: {result.costImpact}</li>
          </ul>
        </div>
      )}
      <div className="ai-placeholder">
        <h4>AI Simulation Engine</h4>
        <p>Integrate with ML models for advanced scenario analysis.</p>
      </div>
    </div>
  );
}

export default WhatIfSimulation;
