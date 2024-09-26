import React from 'react';
import './ClubCard.css';

const ClubCard = ({ name, logo, onClick }) => {
  return (
    <div className="club-card" onClick={onClick}>
      <img src={logo} alt={`${name} logo`} className="club-logo" style={{height : 120 , width: 120}}/>
      <p className="club-name"><i>{name}</i></p>
    </div>
  );
};

export default ClubCard;