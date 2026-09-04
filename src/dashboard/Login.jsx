import React, { useState } from 'react';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Safety check for your own master account
    if (email === 'admin@cbe.com' && password === 'admin123') {
        alert('Welcome back Master Owner! Entering Super Admin System...');
        window.location.href = '/dashboard'; // Takes you to your control page
    } else {
        alert(`Simulating normal business owner login for: ${email}`);
        window.location.href = '/dashboard';
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">CBE Quicksite</h1>
        <p className="login-subtitle">Sign in to manage your digital architecture links</p>
        
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Secure Password</label>
            <input 
              type="password" 
              className="form-input"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            🚀 Authenticate Session
          </button>
        </form>
      </div>
    </div>
  );
}