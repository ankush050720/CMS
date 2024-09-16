import axios from 'axios';
import { API_URL } from '../utils/config';
export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};