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

const App = () => {
  const [cookiesEnabled, setCookiesEnabled] = useState(true);

  useEffect(() => {
    // Check if cookies are enabled
    if (!navigator.cookieEnabled) {
      setCookiesEnabled(false);
    }

    // Scale the content to simulate desktop view on mobile
    if (isMobile) {
      document.body.style.transform = 'scale(0.8)';
      document.body.style.transformOrigin = 'top left';
      document.body.style.width = '125%';

      // Adjust viewport for better scaling
      let metaTag = document.querySelector('meta[name="viewport"]');
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.name = 'viewport';
        document.head.appendChild(metaTag);
      }
      metaTag.content = 'width=1280, user-scalable=no';
    } else {
      // Reset styles when not on mobile
      document.body.style.transform = '';
      document.body.style.transformOrigin = '';
      document.body.style.width = '';

      // Reset viewport
      let metaTag = document.querySelector('meta[name="viewport"]');
      if (metaTag) {
        metaTag.content = 'width=device-width, initial-scale=1';
      }
    }
  }, []);

  const handleAcceptCookies = () => {
    if (navigator.cookieEnabled) {
      setCookiesEnabled(true);
    }
  };

  return (
    <Router>
      <Loader>
        <div>
          {/* Show the cookie popup if cookies are not enabled */}
          {!cookiesEnabled && <CookiePopup onAccept={handleAcceptCookies} />}

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
        </div>
      </Loader>
    </Router>
  );
};

export default App;