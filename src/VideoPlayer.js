import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
function VideoPlayer() {
  const navigate = useNavigate();
  const name = useLocation().state?.name || '';
  const location = useLocation();
  const state = location.state || {};
  const [videoEnded, setVideoEnded] = React.useState(false);
  const handleContinue = () => {
    if (videoEnded) {
      navigate('/assessment', { state });
    }
  };
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)', fontFamily: 'Inter, Arial, sans-serif', padding: '1rem' }}>
      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2rem', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
        <h2 style={{ textAlign: 'center', color: '#6366f1', marginBottom: '0.5rem' }}>Watch Video</h2>
        <video style={{ width: '100%', borderRadius: '12px', marginBottom: '1rem' }} controls onEnded={() => setVideoEnded(true)}>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button
          onClick={handleContinue}
          disabled={!videoEnded}
          style={{
            background: videoEnded ? 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)' : '#cbd5e1',
            color: videoEnded ? '#fff' : '#64748b',
            border: 'none',
            borderRadius: '8px',
            padding: '0.8rem',
            fontWeight: 600,
            fontSize: '1.1rem',
            cursor: videoEnded ? 'pointer' : 'not-allowed',
            boxShadow: videoEnded ? '0 2px 8px rgba(99,102,241,0.08)' : 'none',
            transition: 'background 0.3s, color 0.3s'
          }}
        >
          {videoEnded ? 'Continue to Assessment' : 'Watch Full Video to Continue'}
        </button>
      </div>
    </div>
  );
}
export default VideoPlayer;
