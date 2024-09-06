import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [token] = useState(new URLSearchParams(window.location.search).get('token'));
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/reset-password`, {
        token,
        newPassword: password,
      });
      setMessage(res.data.msg);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Server error');
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

export default ResetPassword;