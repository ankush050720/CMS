import { useState } from 'react';
import { resetPassword } from '../../services/resetPasswordService';

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
      {message && <p>{message}</p>}
    </form>
  );
};

export default ResetPasswordForm;
