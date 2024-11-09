import { useState } from 'react';
import { register } from '../../services/registerService';
import { TextField, Button, Typography, Box } from '@mui/material';
import './RegisterForm.css';
import LoadingButton from '../../components/LoadingButton';
import LoadingForm from '../../components/LoadingForm';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(email, phone, password);
      alert('User registered successfully');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <div className="container">
      <Box className="form-content">
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        {/* Registration Form */}
        <LoadingForm onSubmit={handleRegister} autoComplete="off">
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="real-email"
            autoComplete="new-email"
            size="small"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            variant="outlined"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            name="real-phone"
            autoComplete="new-phone"
            size="small"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            name="real-password"
            autoComplete="new-password"
            size="small"
          />
          <LoadingButton fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Register
          </LoadingButton>
        </LoadingForm>
        <Box sx={{ mt: 2, textAlign: 'left' }}>
          <Typography variant="body2">
            <a href="/login">Already have an account? Login</a>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default RegisterForm;
