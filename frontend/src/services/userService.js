import axios from 'axios';
import { API_URL } from '../utils/config';

// Fetch user info from the backend
export const getUserInfo = async () => {
  try {
    const res = await axios.get(`${API_URL}/user/me`, { withCredentials: true }); // Ensure credentials are sent

    if (!res.data || !res.data.email) { // Check if user data is missing or incomplete
      throw new Error('User not found');
    }

    return res.data; // Return user data (email, role, etc.)
  } catch (err) {
    if (err.response && err.response.status === 401) {
      return null; // Throw specific error for unauthorized status
    }
    throw new Error('Unable to fetch user information');
  }
};
