import React from 'react';
// Placeholder for chart library import (e.g., Chart.js or Recharts)
function AdminCharts({ registrations }) {
  // Example: count registrations per day
  // You can replace this with a real chart implementation
  const total = registrations.length;
  const passed = registrations.filter(r => r.assessment && r.assessment.score >= 60).length;
  const failed = registrations.filter(r => r.assessment && r.assessment.score < 60).length;
  return (
    <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
      <div style={{ background: '#f1f5f9', borderRadius: '12px', padding: '1.2rem', minWidth: 180, textAlign: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: '#6366f1' }}>{total}</div>
        <div style={{ color: '#64748b', fontWeight: 600 }}>Total Registrations</div>
      </div>
      <div style={{ background: '#f1f5f9', borderRadius: '12px', padding: '1.2rem', minWidth: 180, textAlign: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: '#22c55e' }}>{passed}</div>
        <div style={{ color: '#64748b', fontWeight: 600 }}>Passed Assessment</div>
      </div>
      <div style={{ background: '#f1f5f9', borderRadius: '12px', padding: '1.2rem', minWidth: 180, textAlign: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: '#ef4444' }}>{failed}</div>
        <div style={{ color: '#64748b', fontWeight: 600 }}>Failed Assessment</div>
      </div>
    </div>
  );
}
export default AdminCharts;
