import axios from 'axios';
import { API_URL } from '../utils/config';

export const sendForgotPasswordLink = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
    return res.data;
  } catch (err) {
    throw err;
  }
};
