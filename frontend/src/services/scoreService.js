import axios from 'axios';
import { API_URL } from '../utils/config';

// Function to post the score for an event
export const postScore = async (eventId, avgScore) => {
  try {
    const response = await axios.post(`${API_URL}/api/score`, {
      eventId,
      avgScore,
    });
    return response.data;
  } catch (error) {
    console.error('Error posting score:', error);
    throw error;
  }
};

// Function to get the score for an event (or all events)
export const getScore = async (eventId) => {
  try {
    const response = await axios.get(`${API_URL}/api/score/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching score:', error);
    throw error;
  }
};
