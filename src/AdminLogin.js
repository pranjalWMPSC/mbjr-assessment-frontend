import React, { useState } from 'react';

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    // Simple password check (replace with env/JWT for production)
    if (password === 'admin123') {
      onLogin();
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 320 }}>
        <h2 style={{ textAlign: 'center', color: '#6366f1' }}>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
        />
        {error && <div style={{ color: '#ef4444', textAlign: 'center' }}>{error}</div>}
        <button type="submit" style={{ background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.8rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
