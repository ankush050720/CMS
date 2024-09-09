// Home.js
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import ClubCard from '../../components/ClubCard/ClubCard';
import ClubModal from '../../components/ClubModal/ClubModal';
import EventCard from '../../components/EventCard/EventCard';  // New EventCard Component
import EventModal from '../../components/EventModal/EventModal'; // New EventModal Component
import { getAllClubs } from '../../services/clubService';
import { getAllEvents } from '../../services/eventService'; // Event service to fetch events
import './Home.css';

const Home = () => {
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);  // Events state
  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // Selected event for modal
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);  
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);  

  useEffect(() => {
    const fetchClubs = async () => {
      const data = await getAllClubs();
      setClubs(data);
    };
    const fetchEvents = async () => {
      const data = await getAllEvents();
      setEvents(data);
    };
    fetchClubs();
    fetchEvents();
  }, []);

  const openClubModal = (club) => {
    setSelectedClub(club);
    setIsClubModalOpen(true);  
  };

  const closeClubModal = () => {
    setSelectedClub(null);
    setIsClubModalOpen(false);  
  };

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    setIsEventModalOpen(false);
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
                onClick={() => openClubModal(club)} 
              />
            ))}
          </Slider>
        </div>
      </div>

      {/* Events Section */}
      <div className="events-section">
        <h1>Upcoming Events</h1>
        <div className="event-cards">
          {events.map((event, index) => (
            <EventCard
              key={index}
              event={event}
              onClick={() => openEventModal(event)}
            />
          ))}
        </div>
        <button className="button show-more-button" onClick={() => window.location.href='/events'}>
          Show More
        </button>
      </div>

      {/* Modals */}
      {selectedClub && (
        <ClubModal 
          club={selectedClub} 
          isOpen={isClubModalOpen}
          onRequestClose={closeClubModal}
        />
      )}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          isOpen={isEventModalOpen}
          onRequestClose={closeEventModal}
        />
      )}
    </div>
  );
};

export default Home;