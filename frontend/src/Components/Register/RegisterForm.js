import { useState } from 'react';
import { register } from '../../services/registerService';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

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
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, boxShadow: 3, p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleRegister} autoComplete="off">
          {/* Dummy hidden fields to prevent autofill */}
          <input type="text" name="fake-username" style={{ display: 'none' }} />
          <input type="password" name="fake-password" style={{ display: 'none' }} />

          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="real-email"
            autoComplete="new-email" // Prevent autofill
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
            autoComplete="new-phone" // Prevent autofill
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
            autoComplete="new-password" // Prevent autofill
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            <a href="/login">Already have an account? Login</a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
