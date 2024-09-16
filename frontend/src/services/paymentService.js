import axios from 'axios';
import { API_URL } from '../utils/config';

const PaymentService = {
  processPayment: async (amount) => {
    try {
      const response = await axios.post(`${API_URL}/api/payment`, { amount });
      console.log(response.data);
      return response.data.success ? true : false;
    } catch (error) {
      console.error('Payment error:', error);
      return false;
    }
  },
};

export default PaymentService;