import axios from 'axios';
import { getUserInfo } from './userService';
import { API_URL } from '../utils/config';

const getTeamDetails = async () => {
  const response = await axios.get(`${API_URL}/api/events/team/details`);
  return response.data;
};

const addTeamMember = async (teamId, email) => {
  console.log(teamId);
  const response = await axios.post(`${API_URL}/api/events/team/add-member`, { teamId, newMemberEmail: email });
  return response.data;
};

const acceptTeamInvitation = async (token) => {
  console.log('Attempting to send request');
  const response = await axios.post(`${API_URL}/api/events/accept-invitation`, { token });
  return response.data;
};

const createTeam = async (teamName) => {
  const userInfo = await getUserInfo();
  const response = await axios.post(`${API_URL}/api/events/create`, {
    teamName,
    userEmail: userInfo.email,
  });
  return response.data;
};

// Update team name
const updateTeamName = async (teamId, newTeamName) => {
    const response = await axios.post(`${API_URL}/api/events/team/update-name`, { teamId, newTeamName });
    return response.data;
  };

const leaveTeam = async (teamId) => {
  const userInfo = await getUserInfo();
  const response = await axios.post(`${API_URL}/api/events/leave-team`, {
    teamId,
    userEmail: userInfo.email,
  });
  return response.data;
};

// Default export all functions
export default {
  getTeamDetails,
  addTeamMember,
  acceptTeamInvitation,
  createTeam,
  updateTeamName,
  leaveTeam
};
