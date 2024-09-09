import React from 'react';
import './EventCard.css';  // Define styles for the event cards

const EventCard = ({ event, onClick }) => {
  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // You can customize the format as needed
  };

  return (
    <div className="event-card" onClick={onClick}>
      <h3>{event.name}</h3>
      <div className="event-details">
        <span>📅 {formatDate(event.date)}</span>
        <span>💰 {event.fee}</span>
        <span>👥 {event.members}</span>
      </div>
    </div>
  );
};

export default EventCard;
