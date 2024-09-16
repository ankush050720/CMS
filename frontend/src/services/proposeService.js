// services/proposeService.js
import axios from 'axios';
import { API_URL } from '../utils/config';

// Submit proposal data
export const submitProposal = async (proposalData) => {
  try {
    const res = await axios.post(`${API_URL}/api/propose/submit`, proposalData, { withCredentials: true });
    return res.data;
  } catch (err) {
    throw new Error('Unable to submit proposal');
  }
};


export const getProposal = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/propose/get-proposal`, { withCredentials: true });
    return res.data;
  } catch (err) {
    throw new Error('Unable to fetch proposals');
  }
}