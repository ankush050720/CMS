import axios from 'axios';
import { API_URL } from '../utils/config';

const PaymentService = {
  processPayment: async (amount, email) => {
    try {
      await axios.get(`${API_URL}/api/events/team/get-team?userEmail=${email}`);

      const response = await axios.post(`${API_URL}/api/payment`, { amount });

      console.log(response.data);
      return response.data.success ? true : false;

    } catch (error) {
      console.error('Payment error:', error.message);

      if (error.response && error.response.status === 404) {
        alert('Team not found for the logged-in user, please join/create a team to register');
      } else {
        alert('Payment failed. Please try again.');
      }
      return false;
    }
  },
};

export default PaymentService;