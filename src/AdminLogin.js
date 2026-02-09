
import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function AdminLogin({ onLogin }) {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  // Add all allowed admin emails here
  const allowedAdmins = [
    'pranjal@wmpsc.in',
    'rohit@wmpsc.in',
    // Add more admin emails below
  ];

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      if (allowedAdmins.includes(decoded.email)) {
        setEmail(decoded.email);
        onLogin();
      } else {
        setError('Unauthorized: Only authorized admins can access admin panel.');
      }
    } catch (e) {
      setError('Google authentication failed.');
    }
  };

  const handleGoogleError = () => {
    setError('Google Sign-In failed.');
  };

  return (
    <div style={{ width: '100%', maxWidth: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 320 }}>
        <h2 style={{ textAlign: 'center', color: '#6366f1' }}>Admin Login</h2>
        <div style={{ width: 280, margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
          />
        </div>
        {error && <div style={{ color: '#ef4444', textAlign: 'center' }}>{error}</div>}
    </div>
  );
}

export default AdminLogin;
