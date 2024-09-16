import axios from 'axios';
import { API_URL } from '../utils/config';

export const resetPassword = async (token, newPassword) => {
  try {
    const res = await axios.post(`${API_URL}/api/auth/reset-password`, {
      token,
      newPassword,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || 'Server error';
  }
};
