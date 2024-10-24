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
  const [cookiesEnabled, setCookiesEnabled] = useState(true);
  const [showCookiePopup, setShowCookiePopup] = useState(false);

  useEffect(() => {
    const checkThirdPartyCookies = () => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = `${process.env.REACT_APP_API_URL}/set-cookie`; // Change to your server's URL

      document.body.appendChild(iframe);

      iframe.onload = () => {
        const cookieCheck = iframe.contentWindow.document.cookie.includes('thirdPartyTest');

        // Clean up
        document.body.removeChild(iframe);

        setCookiesEnabled(cookieCheck);
        setShowCookiePopup(!cookieCheck); // Show the popup if cookies are not enabled
      };

      // Set a timeout to handle cases where the iframe fails to load
      setTimeout(() => {
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
          setCookiesEnabled(false);
          setShowCookiePopup(true); // Show the popup if iframe fails
        }
      }, 3000); // 3 seconds
    };

    checkThirdPartyCookies();
  }, []);

  return (
    <Router>
      <Loader>
        <div>
          {/* Show the cookie popup if third-party cookies are not enabled */}
          {showCookiePopup && <CookiePopup onAccept={() => { setCookiesEnabled(true); setShowCookiePopup(false); }} />}

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