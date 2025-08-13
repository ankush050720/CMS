import { useState } from 'react';
import { login } from '../../services/loginService';
import { useRoleBasedRedirect } from '../../utils/roleBasedRedirect'; // Role-based redirect utility
import { TextField, Button, Typography, Box } from '@mui/material';
import './LoginForm.css'; // Link to the custom styles
import LoadingButton from '../../components/LoadingButton';
import LoadingForm from '../../components/LoadingForm';

const LoginForm = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const redirectUser = useRoleBasedRedirect(); // Using the redirect utility

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(emailOrPhone, password);
      const { role } = res;
      redirectUser(role);
    } catch (err) {
        console.error("Error Signing In:", err);
        if (err.response) {
          if (err.response.data && err.response.data.msg) {
            alert("Error: " + err.response.data.msg);
          } else {
            alert("Error: " + (err.response.statusText || "Request failed"));
          }
        } else if (err.message) {
          alert("Error: " + err.message);
        } else {
          alert("An error occurred. Please try again.");
        }
      }
  };

  return (
    <div className="login-form-container">
      <Box sx={{ p: 4 }} className="login-form-content">
        <Typography variant="h4" align="left" gutterBottom>
          Login
        </Typography>
        <LoadingForm onSubmit={handleLogin} autoComplete="off">
          {/* Hidden fields to prevent autofill */}
          <input type="text" name="fake-username" style={{ display: 'none' }} />
          <input type="password" name="fake-password" style={{ display: 'none' }} />

          <TextField
            fullWidth
            margin="normal"
            label="Email or Phone"
            variant="outlined"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
            name="real-email-or-phone"
            autoComplete="new-email" // Prevents autofill
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
            autoComplete="new-password" // Prevents autofill
          />
          <LoadingButton
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </LoadingButton>
        </LoadingForm>
        <Box sx={{ mt: 2, textAlign: 'left' }}>
          <Typography variant="body2">
            <a href="/forgot-password">Forgot Password?</a>
          </Typography>
          <Typography variant="body2">
            <a href="/register">Create New Account</a>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default LoginForm;
