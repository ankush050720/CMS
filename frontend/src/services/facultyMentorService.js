import axios from 'axios';
import { API_URL } from '../utils/config';

export const updateProposalStatus = async (proposalId, action, comment) => {
  try {
    console.log(action);
    const response = await axios.post(`${API_URL}/api/proposals/update-proposal-status`, {
      proposalId,
      action, 
      comment
    }, { withCredentials: true });
    alert("Updated Successfully");
    return response.data;
  } catch (error) {
    alert(error.message);
    console.error("Error updating proposal status:", error);
    throw error;
  }
};

export const addChairperson = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/proposals/add-chairperson`, data, {
      withCredentials: true,
    });
    alert("Success");
    return response;
  } catch (error) {
    alert("Error changing role");
    console.error("Error adding chairperson:", error);
    throw error;
  }
};

export const getClubMembers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/proposals/members`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.error("Error fetching club members:", error);
    throw error;
  }
};

export const getClubLeaders = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/proposals/leaders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching club members:", error);
    throw error;
  }
  
};

export const removeClubLeader = async (userId, role) => {
  try {
    const response = await axios.post(`${API_URL}/api/proposals/remove-leader`, { userId, role });
    alert("Removed leader");
    return response.data;
  } catch (error) {
    alert("Error removing leader");
    console.error('Error removing leader:', error);
    throw error;
  }
};