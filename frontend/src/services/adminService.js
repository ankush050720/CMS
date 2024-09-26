import axios from 'axios';
import { API_URL } from '../utils/config';

export const fetchMembers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/get-members`, { withCredentials: true });
      console.log(res.data);
      return res.data; // Return the member data
    } catch (error) {
      console.error('Error fetching club members:', error);
      throw error;
    }
  };

export const getProposal = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/get-proposals`, { withCredentials: true });
      return res.data;
    } catch (err) {
      throw new Error('Unable to fetch proposals');
    }
  }

export const updateProposalStatus = async (proposalId, action, comment) => {
    try {
      console.log(action);
      const response = await axios.post(`${API_URL}/api/admin/update-proposal-status`, {
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

export const addNewClub = async (clubName) => {
    try {
        const response = await axios.post(`${API_URL}/api/admin/add-new-club`, { clubName }, { withCredentials: true });
        alert("Club added successfully");
        return response.data;
    } catch (error) {
        if (error.response) {
            // This block handles errors with responses from the server
            if (error.response.status === 400) {
                alert(error.response.data.message || "Club already exists"); // Use a fallback message
            } else {
                alert("An error occurred while adding the club.");
            }
        } else {
            // This block handles errors without a response (e.g., network issues)
            alert("Network error: Unable to reach the server.");
        }
        console.error("Error adding new club:", error);
        throw error;
    }
};


export const removeClub = async (clubId) => {
    try {
        const response = await axios.post(`${API_URL}/api/admin/remove-club`, { clubId }, { withCredentials: true })
        alert("Club removed successfully");
        return response.data;
    } catch (e) {
        alert("An error occurred while removing the club.");
        console.error("Error removing club:", e);
        throw e;
    }
}


export const getAllUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/get-users`, { withCredentials: true });
      return res.data; // Return the member data
    } catch (error) {
      console.error('Error fetching club members:', error);
      throw error;
    }
};


export const addFaculty = async (userId, clubName) => {
    try {
        const response = await axios.post(`${API_URL}/api/admin/add-faculty`, { userId, clubName }, { withCredentials: true });
        alert("Faculty added successfully");
        return response.data;
    } catch (error) {
        if (error.response) {
            // This block handles errors with responses from the server
            if (error.response.status === 404) {
                alert(error.response.data.message || "Faculty already exists in the club"); // Use a fallback message
            } else {
                alert("An error occurred while adding the faculty.");
            }
        } else {
            // This block handles errors without a response (e.g., network issues)
            alert("Network error: Unable to reach the server.");
        }
        console.error("Error adding faculty:", error);
        throw error;
    }
}

export const removeFaculty = async (facultyId) => {
    try {
        const response = await axios.post(`${API_URL}/api/admin/remove-faculty`, { facultyId }, { withCredentials: true });
        alert("Faculty removed successfully");
        return response.data;
    } catch (e) {
        alert("An error occurred while removing the faculty.");
        console.error("Error removing faculty:", e);
        throw e;
    }
}

export const getFaculties = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/get-faculties`, { withCredentials: true });
      return res.data; // Return the club data
    } catch (error) {
      console.error('Error fetching clubs:', error);
      throw error;
    }
}

