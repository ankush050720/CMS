import axios from 'axios';
import { API_URL } from '../utils/config';

// Fetch club members
export const fetchClubMembers = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/members/club-members`, { withCredentials: true });
    return res.data; // Return the member data
  } catch (error) {
    console.error('Error fetching club members:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try{
    const res = await axios.get(`${API_URL}/api/members/show-users`, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const addMember = async (email) => {
  try{
    const res = await axios.post(`${API_URL}/api/members/add-member`, {email} , { withCredentials: true });
    return res.data; // Return the guest users
  } catch (error) {
    console.error('Error adding member:', error);
    throw error;
  }
};


export const getRemovableMembers = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/members/removable-members`, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error('Error fetching removable members:', error);
    throw error;
  }
};

export const removeMember = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/api/members/remove-member`, { email }, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.error('Error removing member:', error);
    throw error;
  }
};