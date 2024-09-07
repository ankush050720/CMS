import axios from 'axios';
import { API_URL } from '../config';

export const register = async (email, password, role) => {
  try {
    const res = await axios.post(`${API_URL}/api/auth/register`, { email, password, role });
    return res.data;
  } catch (err) {
    throw err;
  }
};
