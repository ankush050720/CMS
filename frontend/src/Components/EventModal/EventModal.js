import React, { useEffect, useState } from 'react';
import './EventModal.css';

const EventModal = ({ event, isOpen, onRequestClose }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsActive(true), 10); // Small delay to trigger transition
    } else {
      setIsActive(false);
    }
  }, [isOpen]);

  if (!isOpen && !isActive) return null;

  const handlePayment = () => {
    // Show alert or redirect to login
    alert('Payment page not yet created. Redirecting to login for now.');
    window.location.href = '/login';
  };

  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // You can customize the format as needed
  };

  return (
    <div className={`event-modal-overlay ${isActive ? 'active' : ''}`} onClick={onRequestClose}>
      <div
        className={`event-modal-content ${isActive ? 'active' : ''}`}
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicked inside
      >
        <div className="event-poster">
          <img src={event.logo || 'https://via.placeholder.com/150'} alt="Event Poster" />
        </div>
        <div className="event-info">
          <h2>{event.name}</h2>
          <p>{event.description}</p>
          <div className="event-extra-info">
            <span>📅 {formatDate(event.date)}</span>
            <span>⏰ {event.time}</span>
            <span>📍 {event.venue}</span>
            <span>💰 {event.fee}</span>
          </div>
          <button className="button payment-button" onClick={handlePayment}>
            Register Now
          </button>
        </div>
        <button className="close-icon" onClick={onRequestClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default EventModal;
