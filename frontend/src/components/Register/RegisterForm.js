import { useState } from 'react';
import { register } from '../../services/registerService';
import { TextField, Button, Typography, Box } from '@mui/material';
import './RegisterForm.css'; // Assuming you have a CSS file for background image

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
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'flex-start', // Align form to the left
        alignItems: 'center', // Vertically center form
        paddingLeft: '5%', // Adjust to position the form on the left
      }}
    >
      <Box sx={{ maxWidth: 400 }}> {/* Set a max width for smaller form fields */}
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        
        {/* Dummy hidden fields to prevent autofill */}
        <input type="text" name="fake-username" style={{ display: 'none' }} />
        <input type="password" name="fake-password" style={{ display: 'none' }} />

        <form onSubmit={handleRegister} autoComplete="off">
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
            size="small" // Make the field smaller
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
            size="small" // Make the field smaller
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
            size="small" // Make the field smaller
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

        <Box sx={{ mt: 2, textAlign: 'left' }}> {/* Align the text to the left */}
          <Typography variant="body2">
            <a href="/login">Already have an account? Login</a>
          </Typography>
        </Box>
      </Box>
    </Box>
    </div>
  );
};

export default RegisterForm;
