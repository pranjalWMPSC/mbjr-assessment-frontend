import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRScanner from './src/QRScanner';
import RegistrationForm from './src/RegistrationForm';
import VideoPlayer from './src/VideoPlayer';
import Assessment from './src/Assessment';
import Certificate from './src/Certificate';
import AdminPanel from './src/AdminPanel';
import AdminLogin from './src/AdminLogin';

function App() {
  const navigate = window.reactRouterNavigate || null;
  return (
    <Router>
      <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 9999 }}>
        <button
          onClick={() => window.location.assign('/certificate?test=1')}
          style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.6rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(99,102,241,0.08)' }}
        >Test Certificate</button>
      </div>
      <Routes>
        <Route path="/" element={<QRScanner />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/video" element={<VideoPlayer />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/certificate" element={<Certificate />} />
      </Routes>
    </Router>
  );
}

export default App;
