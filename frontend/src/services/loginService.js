import axios from 'axios';
import { API_URL } from '../utils/config';

export const login = async (emailOrPhone, password) => {
  try {
    const res = await axios.post(`${API_URL}/api/auth/login`, { emailOrPhone, password });
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Logout function to clear the cookie from the backend
export const logout = async () => {
  try {
    await axios.post(`${API_URL}/api/auth/logout`, null, { withCredentials: true });
  } catch (err) {
    throw err;
  }
};
