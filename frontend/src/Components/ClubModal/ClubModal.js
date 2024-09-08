import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ClubModal.css';

const ClubModal = ({ club, isOpen, onRequestClose }) => {
  const [animateOpen, setAnimateOpen] = useState(false); // For triggering animation
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate(`/${club.name.replace(/\s+/g, '-').toLowerCase()}`);
  };

  // Handle modal opening animation
  useEffect(() => {
    if (isOpen) {
      setAnimateOpen(true);
    } else {
      setAnimateOpen(false);
    }
  }, [isOpen]);

  if (!isOpen && !animateOpen) return null; // Don't render modal if it's fully closed

  return (
    <div className={`modal-overlay ${animateOpen ? 'open' : ''}`}>
      <div className={`modal-content ${animateOpen ? 'open' : ''}`}>
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
        </div>
      </div>
    </div>
  );
};

export default ClubModal;
