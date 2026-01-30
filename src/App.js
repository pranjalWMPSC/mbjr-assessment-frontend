import Congrats from './Congrats';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import React from 'react';
import QRScanner from './QRScanner';
import RegistrationForm from './RegistrationForm';
import VideoPlayer from './VideoPlayer';
import Assessment from './Assessment';
import Certificate from './Certificate';
import AdminPanel from './AdminPanel';
import AdminLogin from './AdminLogin';
function App() {
	const [adminAuthed, setAdminAuthed] = React.useState(() => {
		return sessionStorage.getItem('adminAuthed') === 'true';
	});
	const handleAdminLogin = () => {
		setAdminAuthed(true);
		sessionStorage.setItem('adminAuthed', 'true');
	};
	return (
		<Router>
			<Routes>
				<Route path="/" element={<RegistrationForm />} />
				<Route path="/qr" element={<QRScanner />} />
				<Route path="/register" element={<RegistrationForm />} />
				<Route path="/congrats" element={<Congrats />} />
				<Route path="/video" element={<VideoPlayer />} />
				<Route path="/assessment" element={<Assessment />} />
				<Route path="/certificate" element={<Certificate />} />
				<Route path="/admin" element={adminAuthed ? <AdminPanel /> : <AdminLogin onLogin={handleAdminLogin} />} />
			</Routes>
		</Router>
	);
}

export default App;
