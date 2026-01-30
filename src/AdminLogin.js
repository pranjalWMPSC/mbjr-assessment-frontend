
import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function AdminLogin({ onLogin }) {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      if (decoded.email === 'pranjal@wmpsc.in') {
        setEmail(decoded.email);
        onLogin();
      } else {
        setError('Unauthorized: Only pranjal@wmpsc.in can access admin panel.');
      }
    } catch (e) {
      setError('Google authentication failed.');
    }
  };

  const handleGoogleError = () => {
    setError('Google Sign-In failed.');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f8fafc' }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 320 }}>
        <h2 style={{ textAlign: 'center', color: '#6366f1' }}>Admin Login</h2>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          useOneTap
        />
        {error && <div style={{ color: '#ef4444', textAlign: 'center' }}>{error}</div>}
      </div>
    </div>
  );
}

export default AdminLogin;
