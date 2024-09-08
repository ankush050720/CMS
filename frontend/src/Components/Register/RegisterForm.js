import { useState } from 'react';
import { register } from '../../services/registerService';
import './RegisterForm.css'; // Import the corresponding CSS file

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('guest');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, password, role);
      alert('User registered successfully');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        {/* Add your logo if needed */}
        <img src="https://via.placeholder.com/150" alt="Logo Placeholder" />
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="guest">Guest</option>
            </select>
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="create-account">
          <a href="/login">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
