
import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);


function groupBy(arr, keyFn) {
  return arr.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function topN(obj, n) {
  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}


function AdminCharts({ registrations }) {
  const total = registrations.length;
  const passed = registrations.filter(r => r.assessment && r.assessment.score >= 60).length;
  const failed = registrations.filter(r => r.assessment && r.assessment.score < 60).length;

  // Registrations over time (by date)
  const dateCounts = groupBy(registrations, r => (r.createdAt ? r.createdAt.slice(0, 10) : 'Unknown'));
  const dateLabels = Object.keys(dateCounts).sort();
  const dateData = dateLabels.map(date => dateCounts[date]);

  // State breakdown
  const stateCounts = groupBy(registrations, r => r.state || 'Unknown');
  const stateLabels = Object.keys(stateCounts);
  const stateData = stateLabels.map(state => stateCounts[state]);

  // Organisation breakdown
  const orgCounts = groupBy(registrations, r => r.orgName || 'Unknown');
  const topOrgs = topN(orgCounts, 5);
  const orgLabels = topOrgs.map(([org]) => org);
  const orgData = topOrgs.map(([_, count]) => count);

  // Organisation type breakdown (if orgType exists)
  const orgTypeCounts = groupBy(registrations, r => r.orgType || 'Unknown');
  const orgTypeLabels = Object.keys(orgTypeCounts);
  const orgTypeData = orgTypeLabels.map(type => orgTypeCounts[type]);

  // Pass/fail pie
  const passFailData = {
    labels: ['Passed', 'Failed'],
    datasets: [
      {
        data: [passed, failed],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{
      width: '100%',
      margin: '0 auto',
      padding: '2rem 0',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
      borderRadius: 24,
      boxShadow: '0 4px 32px rgba(99,102,241,0.08)',
      minHeight: 600
    }}>
      {/* Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '2rem',
        marginBottom: '2.5rem',
        justifyItems: 'center'
      }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', minWidth: 180, textAlign: 'center', boxShadow: '0 2px 12px rgba(99,102,241,0.08)', border: '1px solid #e0e7ff' }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: '#6366f1', letterSpacing: 1 }}>{total}</div>
          <div style={{ color: '#64748b', fontWeight: 700, fontSize: 16, marginTop: 4 }}>Total Registrations</div>
        </div>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', minWidth: 180, textAlign: 'center', boxShadow: '0 2px 12px rgba(34,197,94,0.08)', border: '1px solid #e0e7ff' }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: '#22c55e', letterSpacing: 1 }}>{passed}</div>
          <div style={{ color: '#64748b', fontWeight: 700, fontSize: 16, marginTop: 4 }}>Passed Assessment</div>
        </div>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', minWidth: 180, textAlign: 'center', boxShadow: '0 2px 12px rgba(239,68,68,0.08)', border: '1px solid #e0e7ff' }}>
          <div style={{ fontSize: 36, fontWeight: 800, color: '#ef4444', letterSpacing: 1 }}>{failed}</div>
          <div style={{ color: '#64748b', fontWeight: 700, fontSize: 16, marginTop: 4 }}>Failed Assessment</div>
        </div>
        {/* Top Org Card */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', minWidth: 180, textAlign: 'center', boxShadow: '0 2px 12px rgba(16,185,129,0.08)', border: '1px solid #e0e7ff' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#6366f1', marginBottom: 6 }}>Top Organisations</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 15, color: '#334155', fontWeight: 600 }}>
            {topOrgs.map(([org, count]) => (
              <li key={org} style={{ marginBottom: 2 }}>{org} <span style={{ color: '#6366f1', fontWeight: 700 }}>({count})</span></li>
            ))}
          </ul>
        </div>
      </div>
      {/* Charts */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2.5rem',
        justifyContent: 'center',
        alignItems: 'stretch',
        width: '100%',
        margin: '0 auto',
        maxWidth: 1400
      }}>
        <div style={{ background: '#fff', borderRadius: '18px', padding: '2rem', minWidth: 320, minHeight: 340, boxShadow: '0 4px 24px rgba(99,102,241,0.10)', border: '1px solid #e0e7ff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4 style={{ textAlign: 'center', color: '#6366f1', marginBottom: 16, fontWeight: 800, fontSize: 20, letterSpacing: 0.5 }}>Registrations Over Time</h4>
          <Line
            data={{
              labels: dateLabels,
              datasets: [
                {
                  label: 'Registrations',
                  data: dateData,
                  fill: false,
                  borderColor: '#6366f1',
                  backgroundColor: '#6366f1',
                  tension: 0.2,
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </div>
        <div style={{ background: '#fff', borderRadius: '18px', padding: '2rem', minWidth: 320, minHeight: 340, boxShadow: '0 4px 24px rgba(34,197,94,0.10)', border: '1px solid #e0e7ff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4 style={{ textAlign: 'center', color: '#6366f1', marginBottom: 16, fontWeight: 800, fontSize: 20, letterSpacing: 0.5 }}>Pass/Fail Ratio</h4>
          <Pie data={passFailData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
        </div>
        <div style={{ background: '#fff', borderRadius: '18px', padding: '2rem', minWidth: 320, minHeight: 340, boxShadow: '0 4px 24px rgba(129,140,248,0.10)', border: '1px solid #e0e7ff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4 style={{ textAlign: 'center', color: '#6366f1', marginBottom: 16, fontWeight: 800, fontSize: 20, letterSpacing: 0.5 }}>Registrations by State</h4>
          <Bar
            data={{
              labels: stateLabels,
              datasets: [
                {
                  label: 'Registrations',
                  data: stateData,
                  backgroundColor: '#818cf8',
                },
              ],
            }}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        </div>
        {/* Org Type Pie Chart (if orgType exists) */}
        {orgTypeLabels.length > 1 && (
          <div style={{ background: '#fff', borderRadius: '18px', padding: '2rem', minWidth: 320, minHeight: 340, boxShadow: '0 4px 24px rgba(251,191,36,0.10)', border: '1px solid #e0e7ff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ textAlign: 'center', color: '#6366f1', marginBottom: 16, fontWeight: 800, fontSize: 20, letterSpacing: 0.5 }}>Organisation Type Breakdown</h4>
            <Pie
              data={{
                labels: orgTypeLabels,
                datasets: [
                  {
                    data: orgTypeData,
                    backgroundColor: ['#6366f1', '#fbbf24', '#22c55e', '#ef4444', '#818cf8', '#f472b6', '#a3e635'],
                  },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }}
            />
          </div>
        )}
        {/* Top Orgs Bar Chart */}
        {orgLabels.length > 1 && (
          <div style={{ background: '#fff', borderRadius: '18px', padding: '2rem', minWidth: 320, minHeight: 340, boxShadow: '0 4px 24px rgba(16,185,129,0.10)', border: '1px solid #e0e7ff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h4 style={{ textAlign: 'center', color: '#6366f1', marginBottom: 16, fontWeight: 800, fontSize: 20, letterSpacing: 0.5 }}>Top Organisations</h4>
            <Bar
              data={{
                labels: orgLabels,
                datasets: [
                  {
                    label: 'Registrations',
                    data: orgData,
                    backgroundColor: '#16a34a',
                  },
                ],
              }}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminCharts;
