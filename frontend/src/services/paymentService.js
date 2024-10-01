import axios from 'axios';
import { API_URL } from '../utils/config';

const PaymentService = {
  processPayment: async (amount, email, eventId) => {
    try {
      const teamResponse = await axios.get(`${API_URL}/api/events/team/get-team?userEmail=${email}`);
      const team = teamResponse.data;

      if (!team) {
        throw new Error('Team not found for the logged-in user');
      }
      
      const teamId = team._id; 
      const response = await axios.post(`${API_URL}/api/payment`, {
        amount,
        email,
        eventId, 
        teamId
      });

      return response.data.id; // Return order ID
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('Team not found for the logged-in user, please join/create a team to register');
      } else if (error.response && error.response.status === 400 && error.response.data.message === 'Team is already registered for this event'){
        alert('Team is already registered for this event');
      } else {
        alert('Payment failed. Please try again.');
      }
      console.error('Payment error:', error.message);
      throw error; // Re-throw for handling in the component
    }
  },
};

export default PaymentService;