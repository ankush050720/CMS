import axios from 'axios';

import { API_URL } from '../utils/config';

const getRegisteredEvents = async () => {
  const response = await axios.get(`${API_URL}/api/events/team/registered`);
  return response.data;
};

const cancelRegistration = async (teamId, eventId) => {
  const response = await axios.delete(`${API_URL}/api/events/team/${teamId}/event/${eventId}/cancel`);
  return response.data;
};

export default { getRegisteredEvents, cancelRegistration };