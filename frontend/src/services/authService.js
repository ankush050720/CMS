import axios from 'axios';
import { API_URL } from '../utils/config';

const AuthService = {
  checkAuthStatus: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/check-auth`);
      return response.data.isAuthenticated;
    } catch (error) {
      // If a 401 error is received, the user is not authenticated
      return false;
    }
  },

  redirectToLogin: () => {
    window.location.href = '/login';
  },
};

export default AuthService;
