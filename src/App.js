

import React from 'react';
import Congrats from './Congrats';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import QRScanner from './QRScanner';
import RegistrationForm from './RegistrationForm';
import VideoPlayer from './VideoPlayer';
import Assessment from './Assessment';
import Certificate from './Certificate';
import AdminPanel from './AdminPanel';
import AdminLogin from './AdminLogin';
import MBJRLogo from './assets/MBJR_LOGO.png';
import SkillIndiaLogo from './assets/skillindia_logo.png';
import WMPSCLogo from './assets/wmpsc_logo.png';
import './header.css';

function App() {
		const [adminAuthed, setAdminAuthed] = React.useState(() => {
			return sessionStorage.getItem('adminAuthed') === 'true';
		});
	const handleAdminLogin = () => {
		setAdminAuthed(true);
		sessionStorage.setItem('adminAuthed', 'true');
	};

	// Protect routes: /video, /assessment, /certificate
	const ProtectedRoute = ({ children }) => {
		const registered = sessionStorage.getItem('registered') === 'true';
		const location = useLocation();
		if (!registered) {
			return <Navigate to="/" state={{ from: location }} replace />;
		}
		return children;
	};

	return (
		<Router>
			<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(120deg, #1a237e 0%, #6366f1 100%)', fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>
				{/* Modern Header with All Logos */}
				 <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
					 <header className="header-mbjr">
						 <img
							 src={SkillIndiaLogo}
							 alt="Skill India Logo"
							 className="header-logo header-logo-skill"
						 />
						 <img
							 src={MBJRLogo}
							 alt="Mai Bhi Jal Rakshak Logo"
							 className="header-logo header-logo-mbjr"
						 />
						 <img
							 src={WMPSCLogo}
							 alt="WMPSC Logo"
							 className="header-logo header-logo-wmpsc"
						 />
					 </header>
				 </div>
				 <main style={{
					 flex: 1,
					 minHeight: 0,
					 display: 'flex',
					 flexDirection: 'column',
					 alignItems: 'center',
					 justifyContent: 'center',
					 width: '100vw',
					 boxSizing: 'border-box',
					 minHeight: 'calc(100vh - 140px)', // header height approx
				 }}>
					 <div
						 style={{
							 width: '100%',
							 maxWidth: 520,
							 margin: '0 auto',
							 background: 'white',
							 borderRadius: 20,
							 boxShadow: '0 8px 32px 0 rgba(30, 41, 59, 0.10)',
							 padding: '2.5rem 1.5rem',
							 minHeight: 400,
							 display: 'flex',
							 flexDirection: 'column',
							 alignItems: 'center',
							 justifyContent: 'center',
							 boxSizing: 'border-box',
							 // position: 'relative',
							 // left: '50%',
							 // transform: 'translateX(-50%)',
						 }}
					 >
								 <Routes>
									 <Route path="/admin" element={
										 <div style={{ width: '100vw', minHeight: 'calc(100vh - 140px)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', background: 'none' }}>
											 {adminAuthed ? <AdminPanel /> : <AdminLogin onLogin={handleAdminLogin} />}
										 </div>
									 } />
									 <Route path="*" element={
										 <div
											 style={{
												 width: '100%',
												 maxWidth: 520,
												 margin: '0 auto',
												 background: 'white',
												 borderRadius: 20,
												 boxShadow: '0 8px 32px 0 rgba(30, 41, 59, 0.10)',
												 padding: '2.5rem 1.5rem',
												 minHeight: 400,
												 display: 'flex',
												 flexDirection: 'column',
												 alignItems: 'center',
												 justifyContent: 'center',
												 boxSizing: 'border-box',
											 }}
										 >
											 <Routes>
												 <Route path="/" element={<RegistrationForm />} />
												 <Route path="/qr" element={<QRScanner />} />
												 <Route path="/register" element={<RegistrationForm />} />
												 <Route path="/congrats" element={<Congrats />} />
												 <Route path="/video" element={
													 <ProtectedRoute>
														 <VideoPlayer />
													 </ProtectedRoute>
												 } />
												 <Route path="/assessment" element={
													 <ProtectedRoute>
														 <Assessment />
													 </ProtectedRoute>
												 } />
												 <Route path="/certificate" element={
													 <ProtectedRoute>
														 <Certificate />
													 </ProtectedRoute>
												 } />
											 </Routes>
										 </div>
									 } />
								 </Routes>
				   {/* Footer removed as all logos are now in the header */}
				</div>
				</main>
			</div>
			</Router>
		);
	}

export default App;