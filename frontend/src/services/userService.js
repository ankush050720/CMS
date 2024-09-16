import axios from 'axios';
import { API_URL } from '../utils/config';

// Fetch user info from the backend
export const getUserInfo = async () => {
  try {
    const res = await axios.get(`${API_URL}/user/me`, { withCredentials: true }); // Ensure credentials are sent
    return res.data; // Return user data (email, role, etc.)
  } catch (err) {
    if (err.response && err.response.status === 401) {
      throw new Error('Unauthorized'); // Throw specific error for unauthorized status
    }
    throw new Error('Unable to fetch user information');
  }
};
