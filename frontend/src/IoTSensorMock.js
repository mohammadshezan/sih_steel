import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './IoTSensorMock.css';

const sensors = [
  { id: 1, type: 'GPS', value: '23.669, 86.148', status: 'Active' },
  { id: 2, type: 'RFID', value: 'Wagon #2', status: 'Active' },
  { id: 3, type: 'Temperature', value: '32°C', status: 'Normal' },
];

function IoTSensorMock() {
  const mapContainer = useRef(null);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'https://api.maptiler.com/maps/streets/style.json?key=gMwgKYbmBAciA23TL122',
      center: [86.148, 23.669],
      zoom: 6,
    });
    // Add marker for GPS sensor
    new mapboxgl.Marker().setLngLat([86.148, 23.669]).setPopup(new mapboxgl.Popup().setText('Rake #1: GPS Active')).addTo(map);
    return () => map.remove();
  }, []);
  return (
    <div className="iot-sensor-mock">
      <h2>IoT Sensor Integration (Mock)</h2>
      <div ref={mapContainer} style={{ width: '100%', height: '220px', borderRadius: '8px', marginBottom: '1.5rem' }} />
      <table>
        <thead><tr><th>Sensor Type</th><th>Value</th><th>Status</th></tr></thead>
        <tbody>
          {sensors.map(s => (
            <tr key={s.id}><td>{s.type}</td><td>{s.value}</td><td>{s.status}</td></tr>
          ))}
        </tbody>
      </table>
      <div className="sensor-visuals">
        <h3>Real-Time Rake Tracking</h3>
        <div className="rake-track">Rake #1: Bokaro → Jamshedpur (GPS: 23.669, 86.148)</div>
        <div className="rake-track">Wagon #2: RFID tag detected</div>
        <div className="rake-track">Temperature: 32°C (Normal)</div>
      </div>
      <div className="env-conditions">
        <h3>Environmental Conditions</h3>
        <p>Temperature: 32°C | Humidity: 60% | Air Quality: Good</p>
      </div>
    </div>
  );
// Removed extra closing brace
}

export default IoTSensorMock;
