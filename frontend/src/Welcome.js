import React from 'react';
import './Welcome.css';
import ministryLogo from './assets/ministry-logo.png';
import partnerLogo from './assets/partner-logo.png';

function Welcome({ onContinue }) {
  const params = new URLSearchParams(window.location.search);
  const useRefBg = params.has('refbg');
  const bgStyle = useRefBg
    ? {
        backgroundImage: `url(${process.env.PUBLIC_URL + '/reference/ref.png'})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top left',
        backgroundSize: 'contain',
      }
    : undefined;
  return (
    <div className={`welcome-page ${useRefBg ? 'use-ref-bg' : ''}`} style={bgStyle}>
      <header className="welcome-header">
        <img src={ministryLogo} alt="Ministry Logo" className="logo" />
        <span className="welcome-title">Steel Logistics Platform</span>
        <img src={partnerLogo} alt="Partner Logo" className="logo" />
      </header>
      <main className="welcome-main">
        <h1>Welcome to the Steel Logistics Platform</h1>
        <p className="welcome-desc">
          Digitally transforming steel supply chain management for Indian Railways, SAIL, and partners.<br/>
          <span style={{ color: '#1976d2', fontWeight: 'bold' }}>Efficient. Transparent. Sustainable.</span>
        </p>
        <div className="welcome-kpi-row">
          <div className="welcome-kpi-card">🚆 <span>Rail-First Logistics</span></div>
          <div className="welcome-kpi-card">📦 <span>Real-Time Tracking</span></div>
          <div className="welcome-kpi-card">💡 <span>AI-Driven Insights</span></div>
          <div className="welcome-kpi-card">🌱 <span>Net Zero 2070</span></div>
        </div>
        <button className="welcome-btn" onClick={onContinue}>Continue to Login</button>
      </main>
      <footer className="welcome-footer">
        <span>© 2025 Steel Logistics Platform | Ministry of Railways & Partners</span>
      </footer>
    </div>
  );
}

export default Welcome;
