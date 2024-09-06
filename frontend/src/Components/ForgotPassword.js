import { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      alert('Password reset link sent to your email');
    } catch (err) {
      console.error(err);
      alert('Error sending reset link');
    }
  };

  return (
    <form onSubmit={handleForgotPassword}>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <button type="submit">Send Reset Link</button>
    </form>
  );
};

export default ForgotPassword;
