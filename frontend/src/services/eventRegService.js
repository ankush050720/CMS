import axios from 'axios';
import { API_URL } from '../utils/config';

const EventRegService = {
  registerTeamForEvent: async (eventId, userEmail, transactionId) => {
    try {
      const teamResponse = await axios.get(`${API_URL}/api/events/team/get-team?userEmail=${userEmail}`);
      const team = teamResponse.data;

      if (!team) {
        throw new Error('Team not found for the logged-in user');
      }

      const response = await axios.post(`${API_URL}/api/events/${eventId}/register-team`, {
        teamId: team._id,
        teamMembers: team.members,
        transactionId // Pass transactionId to the backend
      });

      return response.data.success;
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'Team is already registered for this event') {
        return { alreadyRegistered: true };
      }
      console.error('Team registration error:', error);
      throw error;
    }
  },
};

export default EventRegService;