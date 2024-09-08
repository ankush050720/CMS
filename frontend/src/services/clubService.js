import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getAllClubs = async () => {
  try {
    const response = await axios.get(`${API_URL}/clubs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching clubs', error);
    return [];
  }
};