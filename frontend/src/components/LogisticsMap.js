import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Example coordinates: Bokaro, Yard, Customer
const bokaro = [23.6693, 86.1511];
const yard = [23.7100, 86.2000];
const customer = [23.7500, 86.2500];

const route = [bokaro, yard, customer];


const LogisticsMap = () => {
  const [rakes, setRakes] = useState([]);


  useEffect(() => {
    const fetchRakes = () => {
      fetch('http://localhost:5001/api/iot/rake')
        .then(res => res.json())
        .then(data => setRakes(data));
    };
    fetchRakes();
    const interval = setInterval(fetchRakes, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={bokaro} zoom={11} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {/* Static locations */}
      <Marker position={bokaro}>
        <Popup>Bokaro Plant</Popup>
      </Marker>
      <Marker position={yard}>
        <Popup>Yard</Popup>
      </Marker>
      <Marker position={customer}>
        <Popup>Customer</Popup>
      </Marker>
      <Polyline positions={route} color="blue" />
      {/* Dynamic rake/train positions */}
      {rakes.map(rake => (
        <Marker key={rake.id} position={rake.coords}>
          <Popup>{rake.id}: {rake.status}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LogisticsMap;
