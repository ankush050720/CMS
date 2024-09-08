import axios from 'axios';
import { API_URL } from '../config';

export const sendForgotPasswordLink = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return res.data;
  } catch (err) {
    throw err;
  }
};
