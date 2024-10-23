import { navigate } from 'react-router-dom'; // Import navigate

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
    navigate('/login'); // Use navigate here
  },
};

export default AuthService;