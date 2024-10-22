import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from './Components/Loader/Loader';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './Pages/ResetPasswordPage/ResetPasswordPage';
import Home from './Pages/Home/Home';
import ClubPage from './Pages/ClubPage/ClubPage';
import EventPage from './Pages/EventPage/EventPage';
import GuestPage from './Pages/GuestPage/GuestPage';
import MemberPage from './Pages/MemberPage/MemberPage';
import ChairpersonPage from './Pages/ChairpersonPage/ChairpersonPage';
import FacultyMentorPage from './Pages/FacultyMentorPage/FacultyMentorPage';
import AdminPage from './Pages/AdminPage/AdminPage';
import Profile from './Pages/ProfilePage/ProfilePage';
import RegisteredEvents from './Pages/RegisteredEventPage/RegisteredEventPage';
import AcceptInvitation from './Pages/AcceptInvitationPage/AcceptInvitationPage';
import FeedbackForm from './Pages/FeedbackForm';
import About from './Pages/AboutPage/AboutPage';
import Contact from './Pages/ContactPage/ContactPage';

const App = () => {
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

export default App;
