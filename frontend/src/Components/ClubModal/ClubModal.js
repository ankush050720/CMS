import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ClubModal.css';

const ClubModal = ({ club, onRequestClose }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    // Redirect to the club's dedicated page
    navigate(`/${club.name.replace(/\s+/g, '-').toLowerCase()}`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{club.name}</h2>
        <img src={club.logo} alt={`${club.name} logo`} />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
        <button onClick={handleReadMore}>Read More</button>
        <button onClick={onRequestClose}>Close</button>
      </div>
    </div>
  );
};

export default ClubModal;
