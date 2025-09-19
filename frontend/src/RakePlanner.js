import React, { useState } from 'react';
import './RakePlanner.css';

const initialWagons = [
  { id: 1, type: 'Open', cargo: '', assigned: false },
  { id: 2, type: 'Covered', cargo: '', assigned: false },
  { id: 3, type: 'Tank', cargo: '', assigned: false },
  { id: 4, type: 'Flat', cargo: '', assigned: false },
];

const cargoTypes = ['Steel Coils', 'Billets', 'Plates', 'Scrap'];
const destinations = ['Jamshedpur', 'Bellary', 'Mumbai', 'Delhi'];

function RakePlanner() {
  const [wagons, setWagons] = useState(initialWagons);
  const [selectedCargo, setSelectedCargo] = useState(cargoTypes[0]);
  const [selectedDestination, setSelectedDestination] = useState(destinations[0]);

  const assignCargo = (wagonId) => {
    setWagons(wagons.map(w => w.id === wagonId ? { ...w, cargo: selectedCargo, assigned: true } : w));
  };

  // Send rake plan to backend
  const submitPlan = () => {
    const plan = {
      wagons,
      cargo: selectedCargo,
      destination: selectedDestination
    };
    fetch('http://localhost:5001/api/rake/plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plan)
    })
      .then(res => res.json())
      .then(data => alert('Rake plan submitted!\n' + JSON.stringify(data)));
  };

  return (
    <div className="rake-planner-pro">
      <div className="rake-header">
        <h2>Rake Formation Planner</h2>
      </div>
      <div className="planner-controls-pro">
        <label>
          Cargo Type:
          <select value={selectedCargo} onChange={e => setSelectedCargo(e.target.value)}>
            {cargoTypes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>
          Destination:
          <select value={selectedDestination} onChange={e => setSelectedDestination(e.target.value)}>
            {destinations.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>
      </div>
      <div className="wagons-row-pro">
        {wagons.map(w => (
          <div key={w.id} className={`wagon-pro ${w.assigned ? 'assigned' : ''}`}>
            <div className="wagon-title">Wagon #{w.id} <span className="wagon-type">({w.type})</span></div>
            <div className="wagon-cargo">Cargo: <strong>{w.cargo || 'None'}</strong></div>
            <button className="assign-btn" disabled={w.assigned} onClick={() => assignCargo(w.id)}>
              {w.assigned ? 'Assigned' : 'Assign Cargo'}
            </button>
          </div>
        ))}
      </div>
      <div className="planner-summary-pro">
        <h3>Summary</h3>
        <p>Destination: <strong>{selectedDestination}</strong></p>
        <p>Assigned Wagons: <strong>{wagons.filter(w => w.assigned).length} / {wagons.length}</strong></p>
        <button className="submit-btn" onClick={submitPlan}>Submit Rake Plan</button>
        <div className="ai-suggestion-pro">
          <h4>AI Suggestion</h4>
          <p>Optimal rake: Assign more open wagons for steel coils to Jamshedpur for on-time delivery.</p>
        </div>
      </div>
    </div>
  );
}

export default RakePlanner;
