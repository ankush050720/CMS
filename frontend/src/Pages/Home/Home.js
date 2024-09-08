import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import ClubCard from '../../components/ClubCard/ClubCard';
import ClubModal from '../../components/ClubModal/ClubModal';
import { getAllClubs } from '../../services/clubService';
import './Home.css';

const Home = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);  // New state to track if modal is open

  useEffect(() => {
    const fetchClubs = async () => {
      const data = await getAllClubs();
      setClubs(data);
    };
    fetchClubs();
  }, []);

  const openModal = (club) => {
    setSelectedClub(club);
    setIsModalOpen(true);  // Set modal open
  };

  const closeModal = () => {
    setSelectedClub(null);
    setIsModalOpen(false);  // Set modal closed
  };

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="home-container">
      <div className='intro'>
        <div className='intro-header'>
          <h1>Welcome to the Club Management System</h1>
          <p>A one-stop solution for managing technical clubs, events, and resources efficiently</p>
          <div className="button-container">
            <button className="button login-button" onClick={() => window.location.href='/login'}>
              Login
            </button>
            <button className="button signup-button" onClick={() => window.location.href='/register'}>
              SignUp
            </button>
          </div>
        </div>
      </div>

      {/* Club Cards Carousel */}
      <div className='carousel'>
        <h1>Explore Our Clubs ...</h1>
        <div className="club-carousel">
          <Slider {...settings}>
            {clubs.map((club, index) => (
              <ClubCard 
                key={index} 
                name={club.name} 
                logo={club.logo} 
                onClick={() => openModal(club)} 
              />
            ))}
          </Slider>
        </div>
      </div>

      {/* Club Modal */}
      {selectedClub && (
        <ClubModal 
          club={selectedClub} 
          isOpen={isModalOpen}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
};

export default Home;
