import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const questions = [
  {
    question: 'How much water does a high-efficiency washing machine use per load?',
    options: ['120–150 litres', '80–100 litres', '50–60 litres', '30–40 litres'],
    answer: '50–60 litres'
  },
  {
    question: 'What is the average urban water use per person per day in India?',
    options: ['90–100 LPCD', '110–120 LPCD', '135–150 LPCD', '180–200 LPCD'],
    answer: '135–150 LPCD'
  },
  {
    question: 'Greywater reuse can meet what percentage of household non-potable demand?',
    options: ['10–20%', '20–30%', '30–40%', '50–60%'],
    answer: '30–40%'
  },
  {
    question: 'Pressure cookers save up to how much water and energy?',
    options: ['30%', '50%', '60%', '70%'],
    answer: '70%'
  },
  {
    question: 'Producing 1 kg of rice requires approximately:',
    options: ['1,000 litres', '1,500 litres', '2,000 litres', '2,500 litres'],
    answer: '2,500 litres'
  },
  {
    question: 'A leaking toilet can waste how much water per day?',
    options: ['50–100 litres', '100–150 litres', '200–400 litres', '500–700 litres'],
    answer: '200–400 litres'
  },
  {
    question: 'A recharge pit (1 m × 1 m × 1 m) can recharge annually:',
    options: ['10,000–15,000 litres', '20,000–25,000 litres', '30,000–50,000 litres', '60,000–80,000 litres'],
    answer: '30,000–50,000 litres'
  },
  {
    question: 'A 1 mm drop in groundwater over 1 sq. km equals:',
    options: ['100,000 litres', '500,000 litres', '750,000 litres', '1 million litres'],
    answer: '1 million litres'
  },
  {
    question: 'What percentage of wastewater is treated in India?',
    options: ['15%', '28%', '50%', '72%'],
    answer: '28%'
  },
  {
    question: 'Non-Revenue Water losses in Indian cities range between:',
    options: ['10–20%', '20–30%', '30–50%', '60–70%'],
    answer: '30–50%'
  }
];
function Assessment() {
  const [responses, setResponses] = useState(Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { name, state, orgType, orgName, mobile } = location.state || {};
  const handleChange = (idx, value) => {
    const newResponses = [...responses];
    newResponses[idx] = value;
    setResponses(newResponses);
  };
  const [passed, setPassed] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    let sc = 0;
    responses.forEach((resp, idx) => {
      if (resp === questions[idx].answer) sc += 1;
    });
    const percent = (sc / questions.length) * 100;
    setScore(percent);
    setSubmitted(true);
    const API_BASE_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_BASE_URL : process.env.REACT_APP_API_BASE_URL_PROD;
    const res = await fetch(`${API_BASE_URL}/api/assessment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: percent, name, state, orgType, orgName, mobile })
    });
    const data = await res.json();
    if (data.eligible) {
      setPassed(true);
    }
  };
  return (
    <>
      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h2 style={{ textAlign: 'center', color: '#6366f1', marginBottom: '0.5rem' }}>Assessment</h2>
          {questions.map((q, idx) => (
            <div key={idx} style={{ marginBottom: '1rem' }}>
              <p style={{ color: '#64748b', fontWeight: 600 }}>{q.question}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {q.options.map(opt => (
                  <label key={opt} style={{ background: '#f1f5f9', borderRadius: '6px', padding: '0.4rem 0.8rem', cursor: 'pointer', fontSize: '1rem' }}>
                    <input type="radio" name={`q${idx}`} value={opt} checked={responses[idx] === opt} onChange={() => handleChange(idx, opt)} required style={{ marginRight: '0.4rem' }} />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" style={{ background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.8rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(99,102,241,0.08)' }}>Submit</button>
        </form>
      ) : (
        <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', animation: 'fadeIn 1s' }}>
          {passed ? (
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <h3 style={{ color: '#22c55e', fontWeight: 700 }}>Congratulations!</h3>
                    <p style={{ color: '#6366f1', fontWeight: 600 }}>You have scored {score}%</p>
                    <button type="button" onClick={() => navigate('/certificate', { state: { name, state, orgType, orgName, mobile } })} style={{ background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.8rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem', boxShadow: '0 2px 8px rgba(34,197,94,0.08)' }}>Next: Get Your Certificate</button>
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#ef4444', fontWeight: 600, marginTop: '0.5rem' }}>Sorry, you did not pass. Your Score: {score}%</p>
          )}
        </div>
      )}
    </>
  );
}
export default Assessment;
