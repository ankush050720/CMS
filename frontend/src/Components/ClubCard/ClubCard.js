import React from 'react';
import './ClubCard.css';

const ClubCard = ({ name, logo, onClick }) => {
  return (
    <div className="club-card" onClick={onClick}>
      <img src={logo} alt={`${name} logo`} className="club-logo" />
      <h3 className="club-name">{name}</h3>
    </div>
  );
};

export default ClubCard;