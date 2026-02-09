import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Congrats() {
  const navigate = useNavigate();
  const { name, state, orgType, orgName, mobile } = useLocation().state || {};
  return (
    <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', animation: 'slideUp 1s' }}>
        <h2 style={{ textAlign: 'center', color: '#22c55e', fontWeight: 700, marginBottom: '0.5rem' }}>Congratulations!</h2>
        <p style={{ color: '#6366f1', fontWeight: 600, textAlign: 'center' }}>Welcome, <span style={{ fontWeight: 700 }}>{name}</span> from <span style={{ fontWeight: 700 }}>{orgName}</span> ({orgType}, {state})</p>
        <button onClick={() => navigate('/video', { state: { name, state, orgType, orgName, mobile } })} style={{ background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.8rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem', boxShadow: '0 2px 8px rgba(34,197,94,0.08)', transition: 'transform 0.2s', animation: 'popIn 0.7s' }}>Next: Watch Video</button>
      <style>{`
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes popIn { 0% { transform: scale(0.8); } 80% { transform: scale(1.05); } 100% { transform: scale(1); } }
      `}</style>
    </div>
  );
}

export default Congrats;
