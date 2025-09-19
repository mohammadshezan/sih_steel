import React, { useEffect, useState } from 'react';
import './ReportsAnalytics.css';
import { apiFetch } from './utils/api';

function ReportsAnalytics() {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const fetchMetrics = () => {
      apiFetch('http://localhost:5001/api/reports/metrics')
        .then(data => setMetrics(Array.isArray(data) ? data : []))
        .catch(() => setMetrics([]));
    };
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const download = async (path, filename) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5001${path}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      alert(e.message || 'Failed to download');
    }
  };


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
        <button className="export-btn" onClick={() => download('/api/reports/export/pdf', 'reports.pdf')}>Export PDF</button>
        <button className="export-btn" onClick={() => download('/api/reports/export/xlsx', 'reports.xlsx')}>Export Excel</button>
      </div>
    </div>
  );
}

export default ReportsAnalytics;
