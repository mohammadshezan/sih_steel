import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './RouteSchedule.css';
import { apiFetch } from './utils/api';

// Fallback positions if backend not available
const rakePositions = [
  { id: 1, name: 'Rake 1', lng: 86.148, lat: 23.669, status: 'On Time' },
  { id: 2, name: 'Rake 2', lng: 85.8, lat: 22.8, status: 'Delayed' },
];

// Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function RouteSchedule() {
  const [filter, setFilter] = useState('');
  const [positions, setPositions] = useState(rakePositions);
  const [alerts, setAlerts] = useState([]);
  const [lastPlan, setLastPlan] = useState(null);
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/iot/rake');
        const data = await res.json();
        // transform backend format to {id, name, lng, lat, status}
        const mapped = data.map((r, idx) => ({
          id: r.id || idx,
          name: r.id || `Rake ${idx+1}`,
          lng: r.coords?.[1] ? r.coords[1] : (r.lng || 86.148),
          lat: r.coords?.[0] ? r.coords[0] : (r.lat || 23.669),
          status: r.status || 'On Time',
        }));
        setPositions(mapped);
      } catch (_) {
        setPositions(rakePositions);
      }
    };
    const fetchAlerts = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/alerts/list');
        const data = await res.json();
        setAlerts(Array.isArray(data) ? data : []);
      } catch (_) {
        setAlerts([]);
      }
    };
    const fetchLastPlan = async () => {
      try {
        const data = await apiFetch('http://localhost:5001/api/rake/last');
        if (data && data.origin && data.destinationCoords) setLastPlan(data);
        else setLastPlan(null);
      } catch (_) {
        setLastPlan(null);
      }
    };
    fetchPositions();
    fetchAlerts();
    fetchLastPlan();
    const interval = setInterval(() => {
      fetchPositions();
      fetchAlerts();
      fetchLastPlan();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter logic (simple demo)
  const filteredRakes = filter
    ? positions.filter(r => r.name.toLowerCase().includes(filter.toLowerCase()))
    : positions;

  return (
    <div className="route-schedule-pro">
      <div className="route-header">
        <h2>Train & Rake Tracking</h2>
        <input
          type="text"
          placeholder="Filter by train/rake/plant/destination..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="route-filter"
        />
      </div>
      <div className="route-card-row">
        <div className="route-map-card">
          <h3>Live Rail Map</h3>
          <div className="route-map-pro">
            <MapContainer center={[23.669,86.148]} zoom={6} className="leaflet-embed">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
              {filteredRakes.map(r => (
                <Marker key={r.id} position={[r.lat, r.lng]}>
                  <Popup>{r.name}: {r.status}</Popup>
                </Marker>
              ))}
              <Polyline positions={filteredRakes.map(r => [r.lat, r.lng])} color="#1976d2" />
              {/* Planned route from last submitted plan */}
              {lastPlan && (
                <>
                  <Marker position={[lastPlan.origin.lat, lastPlan.origin.lng]}>
                    <Popup>Origin: {lastPlan.origin.name}</Popup>
                  </Marker>
                  <Marker position={[lastPlan.destinationCoords.lat, lastPlan.destinationCoords.lng]}>
                    <Popup>Destination: {lastPlan.destination}</Popup>
                  </Marker>
                  <Polyline positions={[[lastPlan.origin.lat, lastPlan.origin.lng],[lastPlan.destinationCoords.lat, lastPlan.destinationCoords.lng]]} color="#ff9800" />
                </>
              )}
              {/* Alert pins */}
              {alerts.map((a) => (
                a.coords ? (
                  <Marker key={a.id} position={[a.coords.lat, a.coords.lng]}>
                    <Popup>{a.type || 'Alert'}: {a.message}</Popup>
                  </Marker>
                ) : null
              ))}
            </MapContainer>
          </div>
        </div>
        <div className="route-status-card">
          <h3>Current Rake Status</h3>
          <ul>
            {filteredRakes.map(rake => (
              <li key={rake.id} style={{ color: rake.status === 'Delayed' ? '#e53935' : '#43a047', fontWeight: 600 }}>
                {rake.name}: {rake.status} (ETA: {rake.status === 'Delayed' ? 'Delayed' : 'On Time'})
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="gantt-chart-pro">
        <h3>Train Schedules (Gantt Chart)</h3>
        <div className="gantt-row">
          <div className="gantt-bar" style={{ width: '60%', background: '#1976d2', color: '#fff' }}>Rake 1: Bokaro → Jamshedpur (On Time)</div>
        </div>
        <div className="gantt-row">
          <div className="gantt-bar" style={{ width: '40%', background: '#e53935', color: '#fff' }}>Rake 2: Bokaro → Bellary (Delayed)</div>
        </div>
      </div>
      <div className="alerts-pro">
        <h3>Alerts & Notifications</h3>
        <ul>
          <li>Congested route: Bokaro → Bellary</li>
          <li>Track repairs near Durgapur</li>
          <li>Delay warning for Rake 2</li>
        </ul>
      </div>
    </div>
  );
}

export default RouteSchedule;
