import axios from 'axios';
import { API_URL } from '../utils/config';

// Submit application to the backend
export const submitApplication = async (formValues) => {
  try {
    // Make the POST request to submit the application
    const response = await axios.post(`${API_URL}/api/applications`, formValues);

    // Return the response from the backend (assuming it has success flag or message)
    return response.data;
  } catch (error) {
    console.error("Error submitting application:", error);
    // Return or throw an error if the request fails
    throw error;
  }
};

// Fetch applications for the authenticated user's club
export const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/applications`);
  
      // Return the applications data
      return response.data.applications;
    } catch (error) {
      console.error("Error fetching applications:", error);
      // Return or throw an error if the request fails
      throw error;
    }
  };

  export const deleteApplication = (id) => {
    return axios.delete(`${API_URL}/api/applications/${id}`);
  };