import axios from 'axios';
import { API_URL } from '../utils/config';
export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const checkVenue = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/events/check-venue`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const addEvent = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/events/create-event`, formData);
    alert("Added event successfully");
    return response.data;
  } catch (error) {
    console.error('Error adding event:', error);
    alert("Error adding event:", error);
    throw error;
  }
}

export const getClubEvents = async() => {
  try {
    const response = await axios.get(`${API_URL}/api/events/get-club-events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching club events:", error);
    throw error;
  }
}

export const getUpcomingEvents = async() => {
  try {
    const response = await axios.get(`${API_URL}/api/events/get-upcoming-events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching club events:", error);
    throw error;
  }
}

export const getOngoingEvents = async() => {
  try {
    const response = await axios.get(`${API_URL}/api/events/get-ongoing-events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching club events:", error);
    throw error;
  }
}

export const getClosedEvents = async() => {
  try {
    const response = await axios.get(`${API_URL}/api/events/get-closed-events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching club events:", error);
    throw error;
  }
}

export const removeEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/events/remove-event`, {
      data: { eventId }  // Sending eventId in the request body
    });
    alert("Removed event successfully");
    return response.data;
  } catch (error) {
    alert("Error while deleting event");
    console.error("Error removing event:", error);
    throw error;
  }
};

export const closeRegistration = async (eventId) => {
  try {
    const response = await axios.put(`${API_URL}/api/events/close-registration`, {
      eventId  // Directly sending eventId
    });
    alert("Closed Registration successfully");
    return response.data;
  } catch (error) {
    alert("Error while closing registration: " + error.message);
    console.error("Error closing registration:", error);
    throw error;
  }
};

export const closeEvent = async (eventId) => {
  try {
    const response = await axios.put(`${API_URL}/api/events/close-event`, {
      eventId  // Directly sending eventId
    });
    alert("Closed Event successfully");
    return response.data;
  } catch (error) {
    alert("Error while closing event: " + error.message);
    console.error("Error closing event:", error);
    throw error;
  }
};

export const closeFeedback = async (eventId) => {
  try {
    const response = await axios.put(`${API_URL}/api/events/close-feedback`, {
      eventId  // Directly sending eventId
    });
    alert("Closed Feedback successfully");
    return response.data;
  } catch (error) {
    alert("Error while closing feedback: " + error.message);
    console.error("Error closing feedback:", error);
    throw error;
  }
};


export const getAllRegistry = async (role, req, res) => {
  try {
      if (role === 'admin') {
          // Call the first controller for admin
          return await axios.get(`${API_URL}/api/events/getAllEventsWithTeams`);
      } else {
          // Call the second controller for non-admin roles
          return await axios.get(`${API_URL}/api/events/getEventsByUserClub`);
      }
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};