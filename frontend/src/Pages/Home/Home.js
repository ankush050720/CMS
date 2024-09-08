import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import ClubCard from '../../components/ClubCard/ClubCard';
import ClubModal from '../../components/ClubModal/ClubModal';
import { getAllClubs } from '../../services/clubService';
import './Home.css';

const Home = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchClubs = async () => {
      const data = await getAllClubs();
      setClubs(data);
    };
    fetchClubs();
  }, []);

  const openModal = (club) => {
    setSelectedClub(club);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClub(null);
  };

  // Calculate the URL for the Read More button
  const getReadMoreUrl = () => {
    if (selectedClub) {
      return `/${selectedClub.name.replace(/\s+/g, '-').toLowerCase()}`;
    }
    return '#';
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
        <h1>Explore Our Clubs</h1>
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
      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`}>
        <div className={`modal-content ${isModalOpen ? 'open' : ''}`}>
          <button className="close-button" onClick={closeModal}>×</button>
          <div className="modal-header">
            <img src={selectedClub?.logo} alt={`${selectedClub?.name} logo`} className="club-logo" />
            <h2>{selectedClub?.name}</h2>
          </div>
          <div className="modal-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
          </div>
          <div className="modal-footer">
            <button className="read-more-button" onClick={() => window.location.href = getReadMoreUrl()}>Read More</button>
            <button className="close-modal-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
