import React, { useEffect, useState } from 'react';

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = () => {
      fetch('http://localhost:5001/api/alerts/list')
        .then(res => res.json())
        .then(data => setAlerts(data));
    };
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="alerts-pro">
      <h2>Real-Time Alerts</h2>
      {alerts.length === 0 ? <p>No alerts.</p> : (
        <ul>
          {alerts.map((alert, idx) => (
            <li key={idx}>{alert.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Alerts;
