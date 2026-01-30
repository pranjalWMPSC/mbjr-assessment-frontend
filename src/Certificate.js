import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
function Certificate() {
  const location = useLocation();
  let { name, state, orgType, orgName, mobile } = location.state || {};
  // If test param is present, use dummy data
  const params = new URLSearchParams(window.location.search);
  if (params.get('test')) {
    name = 'Test User';
    state = 'TestState';
    orgType = 'TestOrgType';
    orgName = 'TestOrgName';
    mobile = '9999999999';
  }
  const [pdfUrl, setPdfUrl] = useState('');
  useEffect(() => {
    async function fetchCertificate() {
      const res = await fetch('https://mbjr-assessment-backend.vercel.app/api/certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mobile })
      });
      const blob = await res.blob();
      setPdfUrl(URL.createObjectURL(blob));
    }
    if (name && mobile) fetchCertificate();
  }, [name, mobile]);
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)', fontFamily: 'Inter, Arial, sans-serif', padding: '1rem' }}>
      <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2rem', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
        <h2 style={{ textAlign: 'center', color: '#6366f1', marginBottom: '0.5rem' }}>Your Certificate</h2>
        {pdfUrl ? (
          <img src={pdfUrl} alt="Certificate" style={{ width: '100%', borderRadius: '12px', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(99,102,241,0.08)', animation: 'fadeIn 1s' }} />
        ) : (
          <p>Generating certificate...</p>
        )}
        {pdfUrl && (
          <>
            <a href={pdfUrl} download={`${name.replace(/\s+/g, '_')}_MBJR_Certificate.png`}>
              <button style={{ background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.8rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(99,102,241,0.08)', marginBottom: '0.5rem' }}>Download Certificate</button>
            </a>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '0.5rem' }}>
              <button
                style={{ background: '#25D366', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.7rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(37,211,102,0.08)' }}
                onClick={async () => {
                  if (navigator.share && pdfUrl) {
                    try {
                      const response = await fetch(pdfUrl);
                      const blob = await response.blob();
                      const file = new File([blob], `${name.replace(/\s+/g, '_')}_MBJR_Certificate.png`, { type: blob.type });
                      await navigator.share({
                        title: 'My MBJR Certificate',
                        text: `I just earned my certificate for water conservation at ${orgName} (${orgType}, ${state})!`,
                        files: [file],
                      });
                    } catch (err) {
                      window.open(`https://wa.me/?text=I%20just%20earned%20my%20certificate%20for%20water%20conservation%20at%20${orgName}%20(${orgType},%20${state})!%20See%20my%20certificate%20here:%20${window.location.origin}/certificate`, '_blank');
                    }
                  } else {
                    window.open(`https://wa.me/?text=I%20just%20earned%20my%20certificate%20for%20water%20conservation%20at%20${orgName}%20(${orgType},%20${state})!%20See%20my%20certificate%20here:%20${window.location.origin}/certificate`, '_blank');
                  }
                }}
              >Share on WhatsApp</button>
              <button
                style={{ background: 'linear-gradient(90deg, #fd1d1d 0%, #fcb045 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.7rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(253,29,29,0.08)' }}
                onClick={async () => {
                  if (navigator.share && pdfUrl) {
                    try {
                      const response = await fetch(pdfUrl);
                      const blob = await response.blob();
                      const file = new File([blob], `${name.replace(/\s+/g, '_')}_MBJR_Certificate.png`, { type: blob.type });
                      await navigator.share({
                        title: 'My MBJR Certificate',
                        text: `I just earned my certificate for water conservation at ${orgName} (${orgType}, ${state})!`,
                        files: [file],
                      });
                    } catch (err) {
                      window.open(`https://www.instagram.com/?url=${encodeURIComponent(window.location.origin + '/certificate')}`, '_blank');
                    }
                  } else {
                    window.open(`https://www.instagram.com/?url=${encodeURIComponent(window.location.origin + '/certificate')}`, '_blank');
                  }
                }}
              >Share on Instagram</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default Certificate;
