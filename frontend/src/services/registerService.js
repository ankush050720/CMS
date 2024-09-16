import axios from 'axios';
import { API_URL } from '../utils/config';

export const register = async (email, phone, password) => {
  try {
    const res = await axios.post(`${API_URL}/api/auth/register`, { email, phone, password });
    return res.data;
  } catch (err) {
    throw err;
  }
};
