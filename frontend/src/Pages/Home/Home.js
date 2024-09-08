import React, { useState } from 'react';
import ClubCard from '../../components/ClubCard/ClubCard';
import ClubModal from '../../components/ClubModal/ClubModal';
import './Home.css';

// Dummy data for clubs (replace with real logo URLs later)
const clubs = [
  { name: 'Coding Club', logo: 'https://via.placeholder.com/150' },
  { name: 'Sankhya Club', logo: 'https://via.placeholder.com/150' },
  { name: 'Cybersecurity Club', logo: 'https://via.placeholder.com/150' },
  { name: 'Coding Club', logo: 'https://via.placeholder.com/150' },
  { name: 'Sankhya Club', logo: 'https://via.placeholder.com/150' },
  { name: 'Cybersecurity Club', logo: 'https://via.placeholder.com/150' },
  { name: 'Coding Club', logo: 'https://via.placeholder.com/150' },
  { name: 'Sankhya Club', logo: 'https://via.placeholder.com/150' },
  { name: 'Cybersecurity Club', logo: 'https://via.placeholder.com/150' },
  { name: 'Coding Club', logo: 'https://via.placeholder.com/150' },
  { name: 'Sankhya Club', logo: 'https://via.placeholder.com/150' },
  { name: 'Cybersecurity Club', logo: 'https://via.placeholder.com/150' },
  { name: 'Coding Club', logo: 'https://via.placeholder.com/150' },
  { name: 'Sankhya Club', logo: 'https://via.placeholder.com/150' },
  { name: 'Cybersecurity Club', logo: 'https://via.placeholder.com/150' },
  { name: 'Coding Club', logo: 'https://via.placeholder.com/150' },
  { name: 'Sankhya Club', logo: 'https://via.placeholder.com/150' },
  { name: 'Cybersecurity Club', logo: 'https://via.placeholder.com/150' },

  // Add all clubs here...
];

const Home = () => {
  const [selectedClub, setSelectedClub] = useState(null);

  const openModal = (club) => {
    setSelectedClub(club);
  };

  const closeModal = () => {
    setSelectedClub(null);
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Club Management System</h1>
      <a href="/login">Login</a>
      <span> / </span>
      <a href="/register">SignUp</a>

      {/* Club Cards Section */}
      <div className="club-grid">
        <h3>Explore Our Clubs</h3>
        {clubs.map((club, index) => (
          <ClubCard 
            key={index} 
            name={club.name} 
            logo={club.logo} 
            onClick={() => openModal(club)} 
          />
        ))}
      </div>

      {/* Club Modal */}
      {selectedClub && (
        <ClubModal 
          isOpen={!!selectedClub} 
          onRequestClose={closeModal} 
          club={selectedClub} 
        />
      )}
    </div>
  );
};

export default Home;
