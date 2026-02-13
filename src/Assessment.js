import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
const questions = [
  {
    question: 'Why is water conservation important in India?',
    options: [
      'Too much water',
      'Many districts are water-stressed',
      'Only for industries',
      'Only for farmers'
    ],
    answer: 'Many districts are water-stressed'
  },
  {
    question: 'On average, how much water does one person use daily at home?',
    options: [
      '20–30 liters',
      '60–70 liters',
      '135–150 liters',
      '500 liters'
    ],
    answer: '135–150 liters'
  },
  {
    question: 'Which place in the house uses the most water?',
    options: [
      'Bedroom',
      'Bathroom',
      'Balcony',
      'Kitchen'
    ],
    answer: 'Bathroom'
  },
  {
    question: 'What can save water in toilets?',
    options: [
      'Bigger tank',
      'Dual-flush system',
      'Leaving tap open',
      'More pressure pump'
    ],
    answer: 'Dual-flush system'
  },
  {
    question: 'A leaking toilet can waste how much water daily?',
    options: [
      '5–10 liters',
      '50 liters',
      '200–400 liters',
      '1 liter'
    ],
    answer: '200–400 liters'
  },
  {
    question: 'Which uses less water while washing dishes?',
    options: [
      'Running tap',
      'Filled sink',
      'Hose pipe',
      'Shower'
    ],
    answer: 'Filled sink'
  },
  {
    question: 'RO purifier reject water should be:',
    options: [
      'Thrown away',
      'Stored and reused',
      'Mixed with drinking water',
      'Ignored'
    ],
    answer: 'Stored and reused'
  },
  {
    question: 'What saves more water while cooking?',
    options: [
      'Open boiling',
      'Pressure cooker',
      'Frying pan',
      'Microwave only'
    ],
    answer: 'Pressure cooker'
  },
  {
    question: 'What is “virtual water”?',
    options: [
      'Water on phone',
      'Water used to grow food',
      'Rainwater only',
      'Tap water'
    ],
    answer: 'Water used to grow food'
  },
  {
    question: 'One simple action everyone can start today is:',
    options: [
      'Waste water',
      'Ignore leaks',
      'Make small changes to save water',
      'Use more water'
    ],
    answer: 'Make small changes to save water'
  }
];
function Assessment() {
  const [responses, setResponses] = useState(Array(questions.length).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resultLoading, setResultLoading] = useState(false);
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
    setLoading(true);
    setResultLoading(true);
    let sc = 0;
    responses.forEach((resp, idx) => {
      if (resp === questions[idx].answer) sc += 1;
    });
    const percent = (sc / questions.length) * 100;
    setScore(percent);
    const API_BASE_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_BASE_URL : process.env.REACT_APP_API_BASE_URL_PROD;
    try {
      const res = await fetch(`${API_BASE_URL}/api/assessment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: percent, name, state, orgType, orgName, mobile })
      });
      const data = await res.json();
      setPassed(!!data.eligible);
      setTimeout(() => {
        setSubmitted(true);
        setResultLoading(false);
      }, 800); // 800ms delay for smooth loader
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && (
        <div style={{ width: '100%', maxWidth: 400, textAlign: 'center', margin: '2rem auto', fontWeight: 600, color: '#6366f1', fontSize: '1.2rem' }}>
          Checking your answers...
        </div>
      )}
      {!submitted && !loading && !resultLoading ? (
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
      ) : resultLoading ? (
        <div style={{ width: '100%', maxWidth: 400, textAlign: 'center', margin: '2rem auto', fontWeight: 600, color: '#6366f1', fontSize: '1.2rem' }}>
          Calculating your result...
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', animation: 'fadeIn 1s' }}>
          {passed ? (
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <h3 style={{ color: '#22c55e', fontWeight: 700 }}>Congratulations!</h3>
              <p style={{ color: '#6366f1', fontWeight: 600 }}>You have scored {score}%</p>
              <WrongAnswers responses={responses} questions={questions} />
              <button type="button" onClick={() => navigate('/certificate', { state: { name, state, orgType, orgName, mobile } })} style={{ background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.8rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', marginTop: '1rem', boxShadow: '0 2px 8px rgba(34,197,94,0.08)' }}>Next: Get Your Certificate</button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', marginTop: '1rem', width: '100%' }}>
              <p style={{ color: '#ef4444', fontWeight: 600, marginTop: '0.5rem' }}>Sorry, you did not pass. Your Score: {score}%</p>
              <WrongAnswers responses={responses} questions={questions} />
            </div>
          )}
		</div>
	  )}
	</>
  );
}

// Show wrong answers component
function WrongAnswers({ responses, questions }) {
  const wrongs = questions
    .map((q, idx) => ({
      idx,
      question: q.question,
      user: responses[idx],
      correct: q.answer
    }))
    .filter(item => item.user && item.user !== item.correct);
  if (wrongs.length === 0) return null;
  return (
    <div style={{ marginTop: '1.2rem', width: '100%' }}>
      <h4 style={{ color: '#ef4444', fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>Review your incorrect answers:</h4>
      <ul style={{ paddingLeft: 18, margin: 0 }}>
        {wrongs.map(w => (
          <li key={w.idx} style={{ marginBottom: 8, fontSize: '1rem', color: '#64748b' }}>
            <div><strong>Q{w.idx + 1}:</strong> {w.question}</div>
            <div style={{ color: '#ef4444' }}>Your answer: {w.user}</div>
            <div style={{ color: '#22c55e' }}>Correct answer: {w.correct}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Assessment;
