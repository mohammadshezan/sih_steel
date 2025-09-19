import React, { useEffect, useState } from 'react';
import { apiFetch } from './utils/api';

export default function RecentPlansPanel() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await apiFetch('http://localhost:5001/api/rake/plans');
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        setError(e.message);
      }
    };
    load();
  }, []);

  return (
    <div className="recent-plans-panel" style={{ background: '#111', color: '#eee', padding: 12, borderRadius: 8 }}>
      <h3 style={{ marginTop: 0 }}>Recent Plans</h3>
      {error && <div style={{ color: 'crimson' }}>{error}</div>}
      {items.length === 0 ? (
        <div>No plans yet.</div>
      ) : (
        <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
          {items.map((p) => (
            <li key={p._id || p.id} style={{ padding: '6px 0', borderBottom: '1px solid #333' }}>
              <div><strong>{p.cargo}</strong> → {p.destination}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>{new Date(p.submittedAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
