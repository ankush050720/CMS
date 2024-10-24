import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import CookiePopup from './components/CookiePopup';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage';
import Home from './pages/Home/Home';
import ClubPage from './pages/ClubPage/ClubPage';
import EventPage from './pages/EventPage/EventPage';
import GuestPage from './pages/GuestPage/GuestPage';
import MemberPage from './pages/MemberPage/MemberPage';
import ChairpersonPage from './pages/ChairpersonPage/ChairpersonPage';
import FacultyMentorPage from './pages/FacultyMentorPage/FacultyMentorPage';
import AdminPage from './pages/AdminPage/AdminPage';
import Profile from './pages/ProfilePage/ProfilePage';
import RegisteredEvents from './pages/RegisteredEventPage/RegisteredEventPage';
import AcceptInvitation from './pages/AcceptInvitationPage/AcceptInvitationPage';
import FeedbackForm from './pages/FeedbackForm';
import About from './pages/AboutPage/AboutPage';
import Contact from './pages/ContactPage/ContactPage';
import { isMobile } from 'react-device-detect';

const MobileBlocker = () => (
  <div style={{
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    fontWeight: 'bold',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }}>
    <h1>Mobile Access Blocked</h1>
    <p>Our site is best viewed on a desktop. Please switch to desktop mode or use a PC to continue.</p>
  </div>
);

const App = () => {
  const [showCookiePopup, setShowCookiePopup] = useState(false);

  // Check if cookies have been accepted
  useEffect(() => {
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    
    if (!cookieAccepted) {
      setShowCookiePopup(true); // Show the popup if cookies haven't been accepted yet
    }
  }, []);

  const handleCookieAccept = () => {
    localStorage.setItem('cookieAccepted', 'true'); // Store in localStorage
    setShowCookiePopup(false); // Hide the popup
  };

  return (
    <Router>
      <Loader>
        <div>
          {/* Show the cookie popup if it hasn't been accepted */}
          {showCookiePopup && <CookiePopup onAccept={handleCookieAccept} />}

          {/* Block mobile users */}
          {isMobile ? (
            <MobileBlocker />
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/events" element={<EventPage />} />
              <Route path="/:clubName" element={<ClubPage />} />
              <Route path="/feedback/:eventId" element={<FeedbackForm />} />
              <Route path="/guest" element={<GuestPage />} />
              <Route path="/member" element={<MemberPage />} />
              <Route path="/chairperson" element={<ChairpersonPage />} />
              <Route path="/faculty-mentor" element={<FacultyMentorPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/profile" element={<Profile email="user@example.com" phoneNumber="123-456-7890" role="Member" />} />
              <Route path="/registered-events" element={<RegisteredEvents />} />
              <Route path="/accept-invitation" element={<AcceptInvitation />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
            </Routes>
          )}
        </div>
      </Loader>
    </Router>
  );
};

export default App;