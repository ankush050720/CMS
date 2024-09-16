import axios from 'axios';
import { API_URL } from '../utils/config';

export const getAllClubs = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/clubs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching clubs', error);
    return [];
  }
};