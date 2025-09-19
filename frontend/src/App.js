
import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import mapboxgl from 'mapbox-gl';
import Login from './Login';
import Welcome from './Welcome';
import Dashboard from './Dashboard';
import DemandStock from './DemandStock';
import RakePlanner from './RakePlanner';
import RouteSchedule from './RouteSchedule';
import ReportsAnalytics from './ReportsAnalytics';
import WhatIfSimulation from './WhatIfSimulation';
import IoTSensorMock from './IoTSensorMock';
import CollaborationLayer from './CollaborationLayer';
import SustainabilityDashboard from './SustainabilityDashboard';
import GenerativeAI from './GenerativeAI';
import MultiPlantScalability from './MultiPlantScalability';
import PredictiveMaintenance from './PredictiveMaintenance';
import './App.css';

const navItems = [
  'Dashboard',
  'Demand',
  'Stock',
  'Rake Planner',
  'Reports',
  'Route',
  'Collaboration',
  'Sustainability',
];

function App() {
  const [active, setActive] = useState('Dashboard');
  const [user, setUser] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  if (showWelcome) {
    return <Welcome onContinue={() => setShowWelcome(false)} />;
  }
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="main-layout">
      <aside className="sidebar">
        <h2>Steel Logistics</h2>
        <div style={{ marginBottom: '1rem', fontSize: '0.95rem', color: '#ccc' }}>
          {user.username} <span style={{ color: '#61dafb' }}>({user.role})</span>
        </div>
        <nav>
          <ul>
            {navItems.map(item => (
              <li
                key={item}
                className={active === item ? 'active' : ''}
                onClick={() => setActive(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
        <button style={{ marginTop: '2rem', background: '#28304d', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.6rem 1rem', cursor: 'pointer' }} onClick={() => setUser(null)}>Logout</button>
      </aside>
      <section className="content">
        {active === 'Dashboard' && <Dashboard role={user.role} />}
        {active === 'Demand' && <DemandStock />}
        {active === 'Rake Planner' && <RakePlanner />}
        {active === 'Route' && <RouteSchedule />}
        {active === 'Reports' && <ReportsAnalytics />}
        {active === 'What-If Simulation' && <WhatIfSimulation />}
        {active === 'IoT Mock' && <IoTSensorMock />}
        {active === 'Collaboration' && <CollaborationLayer />}
        {active === 'Sustainability' && <SustainabilityDashboard />}
        {active === 'Generative AI' && <GenerativeAI />}
        {active === 'Multi-Plant Scalability' && <MultiPlantScalability />}
        {active === 'Predictive Maintenance Alerts' && <PredictiveMaintenance />}
        {/* Placeholder for other modules */}
        {active !== 'Dashboard' && active !== 'Demand' && active !== 'Rake Planner' && active !== 'Route' && active !== 'Reports' && active !== 'What-If Simulation' && active !== 'IoT Mock' && active !== 'Collaboration' && active !== 'Sustainability' && active !== 'Generative AI' && active !== 'Multi-Plant Scalability' && active !== 'Predictive Maintenance Alerts' && (
          <div style={{ padding: '2rem' }}>
            <h2>{active}</h2>
            <p>Coming soon...</p>
          </div>
        )}
      </section>
    </div>
  );
}


export default App;
