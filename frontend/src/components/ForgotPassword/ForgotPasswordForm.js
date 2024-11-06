import { useState } from 'react';
import { sendForgotPasswordLink } from '../../services/forgotPasswordService';
import { TextField, Button, Typography, Box } from '@mui/material';
import './ForgotPasswordForm.css';

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
    <div className="container">
      <Box className="form-content">
        <Typography variant="h4" gutterBottom>
          Forgot Password
        </Typography>
        <form onSubmit={handleForgotPassword}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
            size="small"
          />
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Send Reset Link
          </Button>
        </form>
        <Box sx={{ mt: 2, textAlign: 'left' }}>
          <Typography variant="body2">
            <a href="/login">Back to Login</a>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default ForgotPasswordForm;