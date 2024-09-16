import { useState } from 'react';
import { resetPassword } from '../../services/resetPasswordService';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

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
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, boxShadow: 3, p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="New Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
          {message && <Typography color="error" sx={{ mt: 2 }}>{message}</Typography>}
        </form>
      </Box>
    </Container>
  );
};

export default ResetPasswordForm;
