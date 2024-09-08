import { useState } from 'react';
import { sendForgotPasswordLink } from '../../services/forgotPasswordService';
import './ForgotPasswordForm.css'; // Import the corresponding CSS file

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendForgotPasswordLink(email);
      alert('Password reset link sent to your email');
    } catch (err) {
      console.error(err);
      alert('Error sending reset link');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        {/* Add your logo if needed */}
        <img src="https://via.placeholder.com/150" alt="Logo Placeholder" />
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Send Reset Link</button>
        </form>
        <div className="create-account">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
