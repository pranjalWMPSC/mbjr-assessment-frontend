import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
function Certificate() {
  const location = useLocation();
  let { name, state, orgType, orgName, mobile } = location.state || {};
  const [pdfUrl, setPdfUrl] = useState('');
  const [showShare, setShowShare] = useState(false);
  useEffect(() => {
    async function fetchCertificate() {
      const API_BASE_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_BASE_URL : process.env.REACT_APP_API_BASE_URL_PROD;
      const res = await fetch(`${API_BASE_URL}/api/certificate`, {
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
    <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
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
            <button
              style={{ background: '#25D366', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.8rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(37,211,102,0.08)', margin: '0.5rem 0' }}
              onClick={async () => {
                let certMsg = `I just earned my Jal Rakshak certificate from WMPSC! Get yours at https://mbjrassessment.netlify.app/ #JalRakshak #WaterConservation #MaiBhiJalRakshak #WMPSC #SkillIndia #Certificate #SaveWater #India #Youth #Sustainability @wmp_skillcouncil`;
                if (navigator.share && pdfUrl) {
                  try {
                    const response = await fetch(pdfUrl);
                    const blob = await response.blob();
                    const file = new File([blob], `${name.replace(/\s+/g, '_')}_Jal_Rakshak_Certificate.png`, { type: blob.type });
                    await navigator.share({
                      title: 'My Jal Rakshak Certificate',
                      text: certMsg,
                      files: [file],
                    });
                  } catch (err) {
                    window.open(`https://wa.me/?text=${encodeURIComponent(certMsg)}`, '_blank');
                  }
                } else {
                  window.open(`https://wa.me/?text=${encodeURIComponent(certMsg)}`, '_blank');
                }
              }}
            >Share on WhatsApp</button>
            <button
              style={{ background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.8rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(99,102,241,0.08)', margin: '0.5rem 0' }}
              onClick={() => setShowShare(true)}
            >Share on Social Media</button>
            {showShare && (
              <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,41,59,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: '#fff', borderRadius: 12, padding: 24, maxWidth: 380, width: '90vw', boxShadow: '0 4px 32px #6366f144', position: 'relative' }}>
                  <button onClick={() => setShowShare(false)} style={{ position: 'absolute', top: 10, right: 14, background: 'none', border: 'none', fontSize: 22, color: '#64748b', cursor: 'pointer' }}>&times;</button>
                  <div style={{ color: '#6366f1', fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>Share your achievement!</div>
                  <textarea
                    readOnly
                    value={`I just earned my Jal Rakshak certificate from WMPSC! Get yours at https://mbjrassessment.netlify.app/\n\n#JalRakshak #WaterConservation #MaiBhiJalRakshak #WMPSC #SkillIndia #Certificate #SaveWater #India #Youth #Sustainability @wmp_skillcouncil`}
                    style={{ width: '100%', minHeight: 80, fontSize: '1rem', borderRadius: 6, border: '1px solid #cbd5e1', padding: 8, background: '#f3f4f6', color: '#334155', marginBottom: 8 }}
                  />
                  <div style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: 12 }}>Copy the above caption, hashtags, and tag <b>@wmp_skillcouncil</b> when you post your certificate image!</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginTop: 8 }}>
                    <button
                      style={{ background: 'linear-gradient(90deg, #fd1d1d 0%, #fcb045 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.7rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(253,29,29,0.08)' }}
                      onClick={() => {
                        alert('To share on Instagram, download your certificate and upload it manually. Paste the above caption and tag @wmp_skillcouncil.');
                      }}
                    >Instagram</button>
                    <button
                      style={{ background: '#4267B2', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.7rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px #4267B222' }}
                      onClick={() => {
                        let certMsg = `I just earned my Jal Rakshak certificate from WMPSC! Get yours at https://mbjrassessment.netlify.app/ #JalRakshak #WaterConservation #MaiBhiJalRakshak #WMPSC #SkillIndia #Certificate #SaveWater #India #Youth #Sustainability @wmp_skillcouncil`;
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://mbjrassessment.netlify.app/')}&quote=${encodeURIComponent(certMsg)}`,'_blank');
                      }}
                    >Facebook</button>
                    <button
                      style={{ background: '#0077b5', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.7rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px #0077b522' }}
                      onClick={() => {
                        let certMsg = `I just earned my Jal Rakshak certificate from WMPSC! Get yours at https://mbjrassessment.netlify.app/ #JalRakshak #WaterConservation #MaiBhiJalRakshak #WMPSC #SkillIndia #Certificate #SaveWater #India #Youth #Sustainability @wmp_skillcouncil`;
                        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://mbjrassessment.netlify.app/')}&summary=${encodeURIComponent(certMsg)}`,'_blank');
                      }}
                    >LinkedIn</button>
                    <button
                      style={{ background: '#1da1f2', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.7rem 1.2rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px #1da1f222' }}
                      onClick={() => {
                        let certMsg = `I just earned my Jal Rakshak certificate from WMPSC! Get yours at https://mbjrassessment.netlify.app/ #JalRakshak #WaterConservation #MaiBhiJalRakshak #WMPSC #SkillIndia #Certificate #SaveWater #India #Youth #Sustainability @wmp_skillcouncil`;
                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(certMsg)}`,'_blank');
                      }}
                    >Twitter</button>
                  </div>
                </div>
              </div>
            )}
            </div>
          </>
        )}
    </div>
  );
}
export default Certificate;
