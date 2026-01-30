

import React, { useEffect, useState } from 'react';
import AdminCharts from './AdminCharts';
const API_BASE_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_BASE_URL : process.env.REACT_APP_API_BASE_URL_PROD;



function AdminPanel() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState('analytics');
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  // Fetch paginated registrations for table
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/admin/registrations?page=${page}&limit=${pageSize}`)
      .then(res => res.json())
      .then(data => {
        setRegistrations(data.registrations || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load registrations');
        setLoading(false);
      });
  }, [page]);

  // Fetch up to 100 registrations for analytics only once
  const [analyticsRegs, setAnalyticsRegs] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/registrations?page=1&limit=100`)
      .then(res => res.json())
      .then(data => {
        setAnalyticsRegs(data.registrations || []);
      });
  }, []);

  const handleDownload = async (mobile) => {
    window.open(`${API_BASE_URL}/api/admin/certificate?mobile=${mobile}`, '_blank');
  };


  // Search and pagination logic (client-side search on current page)
  const filtered = registrations.filter(r => {
    const q = search.toLowerCase();
    return (
      r.name?.toLowerCase().includes(q) ||
      r.mobile?.toLowerCase().includes(q) ||
      r.orgName?.toLowerCase().includes(q) ||
      r.state?.toLowerCase().includes(q)
    );
  });
  const totalPages = Math.ceil(total / pageSize);
  const paginated = filtered;


  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthed');
    window.location.reload();
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, Arial, sans-serif', minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ color: '#6366f1', fontWeight: 900, letterSpacing: 1, margin: 0 }}>Admin Dashboard</h1>
        <button onClick={handleLogout} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(239,68,68,0.08)' }}>Logout</button>
      </div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: '2rem', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(99,102,241,0.06)', width: 'fit-content', background: '#e0e7ff' }}>
        <button
          onClick={() => setTab('analytics')}
          style={{
            padding: '0.9rem 2.2rem',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: tab === 'analytics' ? '#fff' : '#6366f1',
            background: tab === 'analytics' ? '#6366f1' : 'transparent',
            border: 'none',
            borderRight: '1px solid #c7d2fe',
            cursor: 'pointer',
            transition: 'background 0.2s',
            outline: 'none',
            borderRadius: tab === 'analytics' ? '12px 0 0 12px' : 0
          }}
        >
          Analytics
        </button>
        <button
          onClick={() => setTab('registrations')}
          style={{
            padding: '0.9rem 2.2rem',
            fontWeight: 700,
            fontSize: '1.1rem',
            color: tab === 'registrations' ? '#fff' : '#6366f1',
            background: tab === 'registrations' ? '#6366f1' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.2s',
            outline: 'none',
            borderRadius: tab === 'registrations' ? '0 12px 12px 0' : 0
          }}
        >
          Registrations
        </button>
      </div>

      {/* Tab Content */}
      {tab === 'analytics' && (
        <div>
          <AdminCharts registrations={analyticsRegs} />
        </div>
      )}
      {tab === 'registrations' && (
        <div style={{ marginTop: '1.5rem' }}>
          <input
            type="text"
            placeholder="Search by name, mobile, org, state..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{ marginBottom: '1.2rem', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', width: 320, background: '#f1f5f9' }}
          />
          {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
            <>
            <div style={{ overflowX: 'auto', borderRadius: 12, boxShadow: '0 2px 8px rgba(99,102,241,0.08)' }}>
              <table style={{ minWidth: 900, width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px' }}>
                <thead>
                  <tr style={{ background: '#e0e7ff' }}>
                    <th style={{ padding: '0.8rem', border: '1px solid #cbd5e1' }}>Name</th>
                    <th style={{ padding: '0.8rem', border: '1px solid #cbd5e1' }}>Mobile</th>
                    <th style={{ padding: '0.8rem', border: '1px solid #cbd5e1' }}>Email</th>
                    <th style={{ padding: '0.8rem', border: '1px solid #cbd5e1' }}>State</th>
                    <th style={{ padding: '0.8rem', border: '1px solid #cbd5e1' }}>City</th>
                    <th style={{ padding: '0.8rem', border: '1px solid #cbd5e1' }}>Organisation</th>
                    <th style={{ padding: '0.8rem', border: '1px solid #cbd5e1' }}>Assessment</th>
                    <th style={{ padding: '0.8rem', border: '1px solid #cbd5e1' }}>Certificate</th>
                    <th style={{ padding: '0.8rem', border: '1px solid #cbd5e1' }}>Created</th>
                    <th style={{ padding: '0.8rem', border: '1px solid #cbd5e1' }}>Updated</th>
                    <th style={{ padding: '0.8rem', border: '1px solid #cbd5e1' }}>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(r => (
                    <tr key={r.mobile}>
                      <td style={{ padding: '0.6rem', border: '1px solid #cbd5e1' }}>{r.name}</td>
                      <td style={{ padding: '0.6rem', border: '1px solid #cbd5e1' }}>{r.mobile}</td>
                      <td style={{ padding: '0.6rem', border: '1px solid #cbd5e1' }}>{r.email}</td>
                      <td style={{ padding: '0.6rem', border: '1px solid #cbd5e1' }}>{r.state}</td>
                      <td style={{ padding: '0.6rem', border: '1px solid #cbd5e1' }}>{r.city || ''}</td>
                      <td style={{ padding: '0.6rem', border: '1px solid #cbd5e1' }}>{r.orgName}</td>
                      <td style={{ padding: '0.6rem', border: '1px solid #cbd5e1' }}>{r.assessment ? r.assessment.score : ''}</td>
                      <td style={{ padding: '0.6rem', border: '1px solid #cbd5e1' }}>{r.certificateId ? 'Yes' : 'No'}</td>
                      <td style={{ padding: '0.6rem', border: '1px solid #cbd5e1' }}>{r.createdAt ? new Date(r.createdAt).toLocaleString() : ''}</td>
                      <td style={{ padding: '0.6rem', border: '1px solid #cbd5e1' }}>{r.updatedAt ? new Date(r.updatedAt).toLocaleString() : ''}</td>
                      <td style={{ padding: '0.6rem', border: '1px solid #cbd5e1' }}>
                        {r.certificateId && <button onClick={() => handleDownload(r.mobile)} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.4rem 1rem', cursor: 'pointer' }}>Download</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              <button disabled={page === 1} onClick={() => setPage(page - 1)} style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: page === 1 ? '#e5e7eb' : '#6366f1', color: page === 1 ? '#64748b' : '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>Prev</button>
              <span style={{ fontWeight: 600, color: '#6366f1', alignSelf: 'center' }}>Page {page} of {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(page + 1)} style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: page === totalPages ? '#e5e7eb' : '#6366f1', color: page === totalPages ? '#64748b' : '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>Next</button>
            </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
