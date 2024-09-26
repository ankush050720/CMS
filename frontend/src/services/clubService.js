import axios from 'axios';
import { API_URL } from '../utils/config';

// Post club data
export const postClubData = async (clubData) => {
  try {
    const response = await axios.post(`${API_URL}/api/clubs`, clubData);
    alert("Successfully Updated") ;
    return response.data;
  } catch (error) {
    alert("Error Updating") ;
    console.error('Error posting club data:', error);
    throw error;
  }
};

// Get all clubs
export const getAllClubs = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/clubs`);
    return response.data;
  } catch (error) {
    console.error('Error getting clubs:', error);
    throw error;
  }
};

export const getClubName = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/club-name`);
    return response.data;
  } catch (error) {
    console.error('Error getting club name:', error);
    throw error;
  }
}

export const getClubMembers = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/club-members`);
    return response.data; // Returns the array of members
  } catch (error) {
    console.error("Error fetching club members:", error);
    throw error; // Optionally re-throw the error to handle it in the calling component
  }
};

export const updateMember = async (email, member) => {
  try {
    console.log(member);
    const response = await axios.put(`${API_URL}/api/clubs/${email}`, member); // Using email in the URL
    return response.data;
  } catch (error) {
    throw new Error('Failed to update member');
  }
};

// Service to delete a member
export const deleteMember = async (member) => {
  try {
    console.log("hello", member);
    const response = await axios.delete(`${API_URL}/api/clubs/${member.email}`); // Assuming email is used for identification
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete member');
  }
};

export const postClubEvents = async (events) => {
  try {
    const response = await axios.post(`${API_URL}/api/clubs/events`, { events });
    alert("Events saved/updated successfully");
    return response.data;
  } catch (error) {
    alert("Error saving events");
    console.error('Error posting events:', error);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await axios.put(`${API_URL}/api/clubs/events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update event');
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/clubs/events/${eventId}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete event');
  }
};

export const getClubEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/clubs/events`);
    return response.data; // Returns the array of events
  } catch (error) {
    console.error("Error fetching club events:", error);
    throw error; // Optionally re-throw the error to handle it in the calling component
  }
};