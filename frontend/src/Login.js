import React, { useState } from 'react';
import './Login.css';

const roles = [
  { label: 'Admin (SAIL HQ)', value: 'admin' },
  { label: 'Logistics Manager', value: 'manager' },
  { label: 'Yard Supervisor', value: 'supervisor' },
];

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('admin');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const handleSubmit = e => {
    e.preventDefault();
    if (step === 1) {
      // Simulate OTP send
      setStep(2);
    } else {
      // Simulate login
      onLogin({ username, role });
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
        <button type="submit">{step === 1 ? 'Send OTP' : 'Login'}</button>
      </form>
      <div className="login-footer">
        <span>Digitally transforming steel supply chain for Indian Railways, SAIL, and partners.<br/>Efficient. Transparent. Sustainable.</span>
      </div>
    </div>
  );
}

export default Login;
