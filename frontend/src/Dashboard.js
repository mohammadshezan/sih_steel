import React from 'react';
import LogisticsMap from './components/LogisticsMap';
import './Dashboard.css';
import ministryLogo from './assets/ministry-logo.png';
import partnerLogo from './assets/partner-logo.png';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const kpiData = [
  { label: 'Rakes in Operation', value: 42, icon: '🚆' },
  { label: 'Avg. Delivery Time', value: '18h', icon: '⏱' },
  { label: 'Delayed Shipments', value: 3, icon: '⚠️' },
  { label: 'Steel Tonnage Moved', value: '12,500t', icon: '📦' },
  { label: 'Cost Optimization', value: '8%', icon: '💰' },
];

const railUtilization = [
  { name: 'Utilized', value: 78 },
  { name: 'Idle', value: 22 },
];

const delayTrend = [
  { date: 'Sep 14', OnTime: 38, Delayed: 4 },
  { date: 'Sep 15', OnTime: 40, Delayed: 2 },
  { date: 'Sep 16', OnTime: 39, Delayed: 3 },
  { date: 'Sep 17', OnTime: 41, Delayed: 1 },
  { date: 'Sep 18', OnTime: 42, Delayed: 0 },
];

function Dashboard({ role }) {
  return (
    <div className="dashboard-pro">
      <header className="dashboard-header">
        <img src={ministryLogo} alt="Ministry Logo" className="logo" />
        <span className="header-title">Steel Logistics Platform</span>
        <img src={partnerLogo} alt="Partner Logo" className="logo" />
      </header>
      <div className="kpi-row">
        {kpiData.map(kpi => (
          <div className="kpi-card" key={kpi.label}>
            <span className="kpi-icon">{kpi.icon}</span>
            <div className="kpi-value">{kpi.value}</div>
            <div className="kpi-label">{kpi.label}</div>
          </div>
        ))}
      </div>
      <div className="dashboard-charts">
        <div className="chart-card">
          <h3>Rail Utilization %</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={railUtilization} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                <Cell key="Utilized" fill="#1976d2" />
                <Cell key="Idle" fill="#bdbdbd" />
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>On-Time vs Delayed Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={delayTrend}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="OnTime" fill="#43a047" />
              <Bar dataKey="Delayed" fill="#e53935" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>India Rail Corridor Map</h3>
          <LogisticsMap />
        </div>
      </div>
      <footer className="dashboard-footer">
        <span>© 2025 Steel Logistics Platform | Ministry of Railways & Partners</span>
      </footer>
    </div>
  );
}

export default Dashboard;
