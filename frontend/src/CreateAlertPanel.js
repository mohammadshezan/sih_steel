import React, { useState } from 'react';
import { apiFetch } from './utils/api';

export default function CreateAlertPanel() {
  const [type, setType] = useState('Info');
  const [message, setMessage] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [result, setResult] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setResult('');
    try {
      const payload = { type, message, coords: (lat && lng) ? { lat: parseFloat(lat), lng: parseFloat(lng) } : undefined };
      const resp = await apiFetch('http://localhost:5001/api/alerts/create', { method: 'POST', body: JSON.stringify(payload) });
      setResult(`Created alert ${resp.id}`);
      setMessage(''); setLat(''); setLng('');
    } catch (e) {
      setResult(`Error: ${e.message}`);
    }
  };

  return (
    <div className="create-alert-panel" style={{ background: '#111', color: '#eee', padding: 12, borderRadius: 8 }}>
      <h3 style={{ marginTop: 0 }}>Create Alert</h3>
      <form onSubmit={submit}>
        <label style={{ display: 'block', marginBottom: 8 }}>
          Type
          <select value={type} onChange={(e) => setType(e.target.value)} style={{ marginLeft: 8 }}>
            <option>Info</option>
            <option>Congestion</option>
            <option>Repair</option>
            <option>Delay</option>
          </select>
        </label>
        <label style={{ display: 'block', marginBottom: 8 }}>
          Message
          <input value={message} onChange={(e) => setMessage(e.target.value)} required style={{ marginLeft: 8, width: '70%' }} />
        </label>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <label>
            Lat
            <input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="optional" style={{ marginLeft: 8, width: 120 }} />
          </label>
          <label>
            Lng
            <input value={lng} onChange={(e) => setLng(e.target.value)} placeholder="optional" style={{ marginLeft: 8, width: 120 }} />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
      {result && <div style={{ marginTop: 8 }}>{result}</div>}
    </div>
  );
}
