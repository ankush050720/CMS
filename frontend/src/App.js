import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './components/Loader/Loader';
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

// Import isMobile from react-device-detect
import { isMobile } from 'react-device-detect';

const App = () => {
  if (isMobile) {
    // Show a message or block mobile users here
    return (
      <div style={styles.blockedContainer}>
        <h2>This app is not available on mobile devices. Please use a desktop.</h2>
      </div>
    );
  }

  // Render the main desktop app if the user is not on mobile
  return (
    <Router>
      <Loader>
        <div>
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

// Styling for the mobile block message
const styles = {
  blockedContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
  }
};

export default App;