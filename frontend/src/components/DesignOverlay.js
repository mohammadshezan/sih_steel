import React, { useEffect, useState } from 'react';
import './DesignOverlay.css';

// Usage: <DesignOverlay defaultSrc="/ref.png" /> put your reference image as /public/ref.png
export default function DesignOverlay({ defaultSrc = '/ref.png' }) {
  const [enabled, setEnabled] = useState(false);
  const [src, setSrc] = useState(defaultSrc);
  const [opacity, setOpacity] = useState(0.5);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // Available only in development; keep disabled by default
    // A small toggle button will be rendered to enable it when needed
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      {!enabled && (
        <button
          style={{ position: 'fixed', right: 12, bottom: 12, zIndex: 10000, padding: '8px 10px', borderRadius: 8, border: 0, background: '#28304d', color: '#fff', opacity: 0.7 }}
          onClick={() => setEnabled(true)}
          title="Show design overlay"
        >
          Overlay
        </button>
      )}
      {enabled && (
        <>
          <img
            className="design-overlay__img"
            alt="design overlay"
            src={src}
            style={{ opacity, transform: `scale(${scale})`, transformOrigin: 'top left' }}
          />
          <div className="design-overlay__panel">
            <div className="row">
              <input type="checkbox" checked={enabled} onChange={e => setEnabled(e.target.checked)} />
              <strong>Overlay</strong>
            </div>
            <label>Image URL</label>
            <input value={src} onChange={e => setSrc(e.target.value)} placeholder="/ref.png or https://..." />
            <label>Opacity: {opacity.toFixed(2)}</label>
            <input type="range" min="0" max="1" step="0.01" value={opacity} onChange={e => setOpacity(parseFloat(e.target.value))} />
            <label>Scale: {scale.toFixed(2)}</label>
            <input type="range" min="0.5" max="2" step="0.01" value={scale} onChange={e => setScale(parseFloat(e.target.value))} />
            <div className="row"><button onClick={() => { setOpacity(0.5); setScale(1); }}>Reset</button></div>
          </div>
        </>
      )}
    </>
  );
}
