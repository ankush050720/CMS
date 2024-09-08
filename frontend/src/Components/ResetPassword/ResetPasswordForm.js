import { useState } from 'react';
import { resetPassword } from '../../services/resetPasswordService';
import './ResetPasswordForm.css'; // Import the corresponding CSS file

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [token] = useState(new URLSearchParams(window.location.search).get('token'));
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await resetPassword(token, password);
      setMessage(res.msg);
    } catch (err) {
      setMessage(err.message || 'Server error');
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        {/* Add your logo if needed */}
        <img src="https://via.placeholder.com/150" alt="Logo Placeholder" />
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
