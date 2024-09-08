import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ClubModal.css';

const ClubModal = ({ club, onRequestClose }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/${club.name.replace(/\s+/g, '-').toLowerCase()}`);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onRequestClose}>×</button>
        <div className="modal-header">
          <img src={club.logo} alt={`${club.name} logo`} className="club-logo" />
          <h2>{club.name}</h2>
        </div>
        <div className="modal-body">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
        </div>
        <div className="modal-footer">
          <button className="read-more-button" onClick={handleReadMore}>Read More</button>
          <button className="close-modal-button" onClick={onRequestClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ClubModal;
