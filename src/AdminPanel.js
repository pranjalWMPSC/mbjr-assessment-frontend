import React, { useEffect, useState } from 'react';
import AdminCharts from './AdminCharts';

function AdminPanel() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetch('https://mbjr-assessment-backend.onrender.com/api/admin/registrations')
      .then(res => res.json())
      .then(data => {
        setRegistrations(data.registrations || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load registrations');
        setLoading(false);
      });
  }, []);

  const handleDownload = async (mobile) => {
    window.open(`https://mbjr-assessment-backend.onrender.com/api/admin/certificate?mobile=${mobile}`, '_blank');
  };

  // Search and pagination logic
  const filtered = registrations.filter(r => {
    const q = search.toLowerCase();
    return (
      r.name?.toLowerCase().includes(q) ||
      r.mobile?.toLowerCase().includes(q) ||
      r.orgName?.toLowerCase().includes(q) ||
      r.state?.toLowerCase().includes(q)
    );
  });
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, Arial, sans-serif' }}>
      <h1 style={{ color: '#6366f1', marginBottom: '1rem' }}>Admin Dashboard</h1>
      <AdminCharts registrations={registrations} />
      <input
        type="text"
        placeholder="Search by name, mobile, org, state..."
        value={search}
        onChange={e => { setSearch(e.target.value); setPage(1); }}
        style={{ marginBottom: '1.2rem', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', width: 320 }}
      />
      {loading ? <p>Loading...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : (
        <>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(99,102,241,0.08)' }}>
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
        <div style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)} style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: page === 1 ? '#e5e7eb' : '#6366f1', color: page === 1 ? '#64748b' : '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>Prev</button>
          <span style={{ fontWeight: 600, color: '#6366f1', alignSelf: 'center' }}>Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)} style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: page === totalPages ? '#e5e7eb' : '#6366f1', color: page === totalPages ? '#64748b' : '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>Next</button>
        </div>
        </>
      )}
    </div>
  );
}

export default AdminPanel;
