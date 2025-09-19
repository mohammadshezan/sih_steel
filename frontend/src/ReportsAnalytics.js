import React, { useEffect, useState } from 'react';
import './ReportsAnalytics.css';

function ReportsAnalytics() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const fetchMetrics = () => {
      fetch('http://localhost:5001/api/reports/metrics')
        .then(res => res.json())
        .then(data => setMetrics(Array.isArray(data) ? data : []))
        .catch(() => setMetrics([]));
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="reports-analytics-pro">
      <div className="reports-header">
        <h2>Reports & Analytics</h2>
      </div>
      <div className="metrics-row-pro">
        {metrics.length === 0 ? <p>Loading...</p> : metrics.map(m => (
          <div key={m.label} className="metric-pro">
            <h3>{m.label}</h3>
            <p>{m.value}</p>
          </div>
        ))}
      </div>
      <div className="export-options-pro">
        <h3>Export Options</h3>
        <button className="export-btn" onClick={() => alert('Exported to PDF!')}>Export PDF</button>
        <button className="export-btn" onClick={() => alert('Exported to Excel!')}>Export Excel</button>
      </div>
    </div>
  );
}

export default ReportsAnalytics;
