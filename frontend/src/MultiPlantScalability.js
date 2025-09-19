import React, { useState } from 'react';
import './MultiPlantScalability.css';

const plants = [
  { name: 'Bokaro', data: 'Inventory: 1200t, Dispatch: 34' },
  { name: 'Durgapur', data: 'Inventory: 900t, Dispatch: 28' },
  { name: 'Rourkela', data: 'Inventory: 700t, Dispatch: 22' },
  { name: 'Bhilai', data: 'Inventory: 1100t, Dispatch: 30' },
];

function MultiPlantScalability() {
  const [activePlant, setActivePlant] = useState(plants[0].name);
  return (
    <div className="multi-plant">
      <h2>Multi-Plant Scalability</h2>
      <div className="plant-tabs">
        {plants.map(p => (
          <button
            key={p.name}
            className={activePlant === p.name ? 'active' : ''}
            onClick={() => setActivePlant(p.name)}
          >
            {p.name}
          </button>
        ))}
      </div>
      <div className="plant-data">
        {plants.find(p => p.name === activePlant).data}
      </div>
      <div className="national-rollout">
        <h3>National Rollout Potential</h3>
        <p>Same UI, different data. Ready for expansion.</p>
      </div>
    </div>
  );
}

export default MultiPlantScalability;
