import axios from 'axios';

import { API_URL } from '../utils/config';

const getRegisteredEvents = async () => {
  const response = await axios.get(`${API_URL}/api/events/team/registered`);
  return response.data;
};

export default { getRegisteredEvents };