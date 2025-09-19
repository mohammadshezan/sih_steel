import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './DemandStock.css';

// Fallback sample data if backend unavailable
const fallbackPlantInventory = [
  { name: 'Bokaro', stock: 1200 },
  { name: 'Durgapur', stock: 900 },
  { name: 'Rourkela', stock: 700 },
];

const customerDemand = [
  { customer: 'Tata Steel', date: '2025-09-20', tonnage: 300, destination: 'Jamshedpur' },
  { customer: 'JSW', date: '2025-09-21', tonnage: 200, destination: 'Bellary' },
];

const stockyardInventory = [
  { yard: 'Yard A', stock: 400 },
  { yard: 'Yard B', stock: 350 },
];

// Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function DemandStock() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/demand/inventory');
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          setPlants(data.map(p => ({ name: p.plant || p.name, stock: p.steelStock || p.stock })));
        } else {
          setPlants(fallbackPlantInventory);
        }
      } catch (_) {
        setPlants(fallbackPlantInventory);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
    const interval = setInterval(fetchInventory, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="demand-stock">
      <h2>Plant Inventory</h2>
      <div className="map-card">
        <MapContainer center={[23.669, 86.148]} zoom={5} className="leaflet-embed">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {(plants.length ? plants : fallbackPlantInventory).map((p) => {
            const coords = p.name === 'Bokaro' ? [23.669, 86.148] : p.name === 'Durgapur' ? [23.52, 87.321] : [22.221, 84.882];
            return (
              <Marker key={p.name} position={coords}>
                <Popup>
                  <strong>{p.name}</strong><br />Stock: {p.stock} t
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
      <table>
        <thead><tr><th>Plant</th><th>Steel Stock (tons)</th></tr></thead>
        <tbody>
          {(plants.length ? plants : fallbackPlantInventory).map(p => (
            <tr key={p.name}><td>{p.name}</td><td>{p.stock}</td></tr>
          ))}
        </tbody>
      </table>
      <h2>Customer Demand</h2>
      <table>
        <thead><tr><th>Customer</th><th>Date</th><th>Tonnage</th><th>Destination</th></tr></thead>
        <tbody>
          {customerDemand.map(d => (
            <tr key={d.customer+d.date}><td>{d.customer}</td><td>{d.date}</td><td>{d.tonnage}</td><td>{d.destination}</td></tr>
          ))}
        </tbody>
      </table>
      <h2>Stockyard Inventory</h2>
      <table>
        <thead><tr><th>Yard</th><th>Stock (tons)</th></tr></thead>
        <tbody>
          {stockyardInventory.map(s => (
            <tr key={s.yard}><td>{s.yard}</td><td>{s.stock}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="ai-alerts">
        <h3>AI Alerts</h3>
        <ul>
          <li>Low stock at Rourkela!</li>
          <li>Demand spike forecast for Tata Steel (Jamshedpur)</li>
        </ul>
      </div>
    </div>
  );
}

export default DemandStock;
