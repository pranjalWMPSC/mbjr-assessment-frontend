import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
function RegistrationForm() {
    React.useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async pos => {
          const coordsObj = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setCoords(coordsObj);
          // Call backend to resolve city/state
          const API_BASE_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_BASE_URL : process.env.REACT_APP_API_BASE_URL_PROD;
          const res = await fetch(`${API_BASE_URL}/api/geocode`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ location: `${coordsObj.lat},${coordsObj.lng}` })
          });
          const data = await res.json();
          setCity(data.city || '');
          if (data.state) {
            setState(data.state);
            setResolvedState(data.state);
          }
        }, err => {
          // Optionally handle denied location
        }, { enableHighAccuracy: true });
      }
    }, []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [coords, setCoords] = useState(null);
  const [orgType, setOrgType] = useState('');
  const [orgName, setOrgName] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState({});
  // city state declared only once below
  const navigate = useNavigate();
  const locationState = useLocation().state;
  const locationData = coords ? `${coords.lat},${coords.lng}` : locationState?.location || '';
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [resolvedState, setResolvedState] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const validateInputs = () => {
    const newErrors = {};
    // Name: only letters, spaces, max 40 chars, no numbers or special chars
    if (!/^[A-Za-z ]{2,40}$/.test(name)) {
      newErrors.name = 'Name must be 2-40 letters and spaces only.';
    }
    // Organisation Name: only letters, numbers, spaces, max 60 chars
    if (!/^[A-Za-z0-9 .,&()-]{2,60}$/.test(orgName)) {
      newErrors.orgName = 'Organisation name must be 2-60 characters, no special symbols.';
    }
    // Add more checks as needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateInputs()) return;
    const API_BASE_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_BASE_URL : process.env.REACT_APP_API_BASE_URL_PROD;
    const res = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, mobile, state, orgType, orgName, location: locationData })
    });
    const data = await res.json();
    setAddress(data.address || '');
    setResolvedState(data.state || '');
    setSubmitted(true);
    // Set registration flag for protected routes
    sessionStorage.setItem('registered', 'true');
    setTimeout(() => {
      navigate('/congrats', { state: { name, state, orgType, orgName, mobile } });
    }, 2000);
  };

  // Auto-fill city when location is captured
  const handleGetLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async pos => {
        const coordsObj = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCoords(coordsObj);
        // Call backend to resolve city/state
        const API_BASE_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_BASE_URL : process.env.REACT_APP_API_BASE_URL_PROD;
        const res = await fetch(`${API_BASE_URL}/api/geocode`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ location: `${coordsObj.lat},${coordsObj.lng}` })
        });
        const data = await res.json();
        setCity(data.city || '');
        if (data.state) {
          setState(data.state);
          setResolvedState(data.state);
        }
      }, err => alert('Location access denied'), { enableHighAccuracy: true });
    } else {
      alert('Geolocation not supported');
    }
  };
  const statesList = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh', 'Andaman & Nicobar', 'Lakshadweep', 'Dadra & Nagar Haveli', 'Daman & Diu'
  ];
  return (
    <form onSubmit={handleSubmit} style={{
      background: 'none', boxShadow: 'none', borderRadius: 0, padding: 0, width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: '1.2rem'
    }}>
        <h2 style={{ textAlign: 'center', color: '#6366f1', marginBottom: '0.5rem' }}>Main Bhi Jal Rakshak Registration</h2>
        {/* Location coordinates are not shown to the user */}
        {/* Location is now requested automatically on mount */}
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }} />
        {errors.name && <div style={{ color: '#ef4444', fontSize: '0.95rem', marginTop: '0.2rem' }}>{errors.name}</div>}
        <input type="text" placeholder="Mobile Number" value={mobile} onChange={e => setMobile(e.target.value)} required pattern="[0-9]{10}" maxLength={10} style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }} />
        <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }} />
        <select value={state} onChange={e => setState(e.target.value)} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}>
          <option value="">Select State</option>
          {statesList.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select value={orgType} onChange={e => setOrgType(e.target.value)} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }}>
          <option value="">Select Organisation Type</option>
          <option value="School">School</option>
          <option value="Polytechnic">Polytechnic</option>
          <option value="ITI">ITI</option>
          <option value="College">College</option>
          <option value="University">University</option>
          <option value="Other">Other</option>
        </select>
        <input type="text" placeholder="Organisation Name" value={orgName} onChange={e => setOrgName(e.target.value)} required style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem' }} />
        {errors.orgName && <div style={{ color: '#ef4444', fontSize: '0.95rem', marginTop: '0.2rem' }}>{errors.orgName}</div>}
        <button type="submit" style={{ background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.8rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(99,102,241,0.08)' }}>Let's Go</button>
        {/* Removed resolved address, city, and state display after submission as requested */}
    </form>
  );
}
export default RegistrationForm;
