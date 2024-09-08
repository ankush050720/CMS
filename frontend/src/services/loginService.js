import axios from 'axios';
import { API_URL } from '../config';

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    return res.data;
  } catch (err) {
    throw err;
  }
};
