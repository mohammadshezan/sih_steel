import React, { useState } from 'react';
import { apiFetch } from '../utils/api';

export default function SeedDBButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSeed = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await apiFetch('http://localhost:5001/api/admin/seed', {
        method: 'POST',
        body: JSON.stringify({})
      });
      setResult(data);
    } catch (e) {
      setError(e.message || 'Failed to seed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button disabled={loading} onClick={handleSeed}>
          {loading ? 'Seeding…' : 'Seed DB'}
        </button>
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </div>
      {result && (
        <pre style={{ marginTop: 8, maxHeight: 160, overflow: 'auto' }}>
{JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
