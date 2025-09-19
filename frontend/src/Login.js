import React, { useState } from 'react';
import './Login.css';

const roles = [
  { label: 'Admin (SAIL HQ)', value: 'admin' },
  { label: 'Logistics Manager', value: 'manager' },
  { label: 'Yard Supervisor', value: 'supervisor' },
];

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('manager');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (step === 1) {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5001/api/auth/otp/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
        // In dev, allow showing devCode for convenience
        if (data.devCode) setOtp(data.devCode);
        setStep(2);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5001/api/auth/otp/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, otp })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Login failed');
        // Save token for subsequent API calls
        localStorage.setItem('token', data.token);
        onLogin({ username, role: data.user?.role || role, token: data.token });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-logos">
        <img src={require('./assets/ministry-logo.png')} alt="Ministry Logo" className="login-logo" />
        <img src={require('./assets/partner-logo.png')} alt="Partner Logo" className="login-logo" />
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome! Please Login</h2>
        <label>
          Username
          <input value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
        <label>
          Role
          <select value={role} onChange={e => setRole(e.target.value)}>
            {roles.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </label>
        {step === 2 && (
          <label>
            OTP (simulated)
            <input value={otp} onChange={e => setOtp(e.target.value)} required />
          </label>
        )}
        {error && <div style={{ color: 'crimson', marginTop: 8 }}>{error}</div>}
        <button type="submit" disabled={loading}>{loading ? 'Please wait…' : (step === 1 ? 'Send OTP' : 'Login')}</button>
      </form>
      <div className="login-footer">
        <span>Digitally transforming steel supply chain for Indian Railways, SAIL, and partners.<br/>Efficient. Transparent. Sustainable.</span>
      </div>
    </div>
  );
}

export default Login;
