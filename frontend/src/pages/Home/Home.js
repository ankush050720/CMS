import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import ClubCard from "../../components/ClubCard/ClubCard";
import ClubModal from "../../components/ClubModal/ClubModal";
import EventCard from "../../components/EventCard/EventCard";
import EventModal from "../../components/EventModal/EventModal";
import { getAllClubs } from "../../services/clubService";
import { getAllEvents } from "../../services/eventService";
import Header from "../../components/HomeHeader/HomeHeader";
import Footer from "../../components/Footer";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import "./Home.css";

const Home = () => {
  const videoUrl =
    "https://www.youtube-nocookie.com/embed/s7aD_mhYf98?si=3MzOKJITxUd5C-iH&controls=0";
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("club"); // Default is 'club'
  const [showScrollTopButton, setShowScrollTopButton] = useState(false); // For scroll-to-top button
  const introRef = useRef();
  const carouselRef = useRef();
  const eventSectionRef = useRef();
  const deanSectionRef = useRef();
  const videoSectionRef = useRef();

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

  const VideoPlayer = ({ videoUrl }) => {
    return (
      <div
        className="video-player"
        style={{
          position: 'relative',
          minHeight: '1000px',
          width: '100%',
          backgroundImage: 'url("/video-bg.jpg")',
          backgroundPosition: 'center top',
          backgroundSize: '100% 50%',
          backgroundRepeat: 'no-repeat',
          zIndex: '1',
          opacity: 1, // Set to 1 for always visible
          transform: 'translateY(0)', // No translation needed
        }}
      >
        <h2
          style={{
            fontFamily: 'Poppins, sans-serif',
            position: 'absolute',
            top: '12%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: '2.5rem',
            zIndex: 3,
            textAlign: 'center',
          }}
        >
          Know Our Campus
        </h2>
  
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            height: 'auto',
            zIndex: 2,
            marginTop: '75px',
          }}
        >
          <iframe
            width="100%"
            height="550px"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
  
        <div
          style={{
            position: 'absolute',
            top: '50%',
            width: '100%',
            height: '50%',
            backgroundColor: '#FBECFC',
            zIndex: 1,
          }}
        ></div>
  
        <style>{`
          .video-player {
            opacity: 1; /* Always visible */
            transform: translateY(0); /* No transform needed */
            transition: opacity 0.6s ease-out, transform 0.6s ease-out; /* Keep transition for potential future use */
          }
  
          @media (max-width: 900px) {
            .video-player {
              min-height: 600px; /* Adjusted min-height for smaller screens */
              background-size: cover; /* Change to cover for better fitting */
            }
  
            h2 {
              font-size: 1.8rem; /* Smaller font size for the title */
              top: 10%;
            }
  
            iframe {
              height: 300px;
            }
          }
  
          @media (min-width: 900px) and (max-width: 1024px) {
            .video-player {
              min-height: 800px; /* Adjusted min-height for smaller screens */
              background-size: cover; /* Change to cover for better fitting */
            }
  
            h2 {
              font-size: 2rem; /* Smaller font size for the title */
              top: 20%;
            }
  
            iframe {
              height: 500px;
            }
          }
        `}</style>
      </div>
    );
  };
  

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

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTopButton(true);
      } else {
        setShowScrollTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Intersection Observer for animations
  useEffect(() => {
    const sections = [
      introRef.current,
      carouselRef.current,
      eventSectionRef.current,
      deanSectionRef.current,
      videoSectionRef.current,
    ];
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="home-container">
    <Header />
      <div className="fixed-container"></div>
      <div className="intro" ref={introRef}>
        <div className="intro-header">
          <img src="/sr-main.png" alt="sr-logo" />
          <h1>CHAPTERS & CLUBS</h1>
          {/* <p className="cursive-text" ref={typewriterRef}></p> */}
          <div className="button-container">
            <button
              className="button login-button"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>
            <button
              className="button signup-button"
              onClick={() => (window.location.href = "/register")}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>

      <div className="dean-container" ref={deanSectionRef}>
      <h4>| FROM THE DESK OF DEAN</h4>
        <div className='dean-body'>
        <div className="dean-image">
          <img src="/dean-image.jpg" alt="Dean" />
          <div className="dean-details">
            <h4>Dr. Indrajeet Gupta</h4>
            <p>Dean, School of CS – AI</p>
          </div>
        </div>
        <div className="dean-message">
          <h1>Importance Of Societies & Clubs</h1>
          <p>
            In our ever-evolving educational landscape, societies and clubs play
            a crucial role in fostering community, personal growth, and
            collaboration. They provide a platform for students to explore their
            interests, develop leadership skills, and engage in meaningful
            projects. Participation in these organizations not only enriches the
            academic experience but also cultivates lifelong friendships and
            networking opportunities. It is essential to recognize and support
            these groups, as they contribute significantly to a vibrant campus
            life and prepare students for future challenges. Encouraging
            involvement in societies and clubs is a key aspect of our mission.
            Let us strive to create an inclusive environment where every student
            feels empowered to share their passions and make a difference.
          </p>
        </div>
        </div>
      </div>

      <div className="video-container" ref={videoSectionRef}>
        <VideoPlayer videoUrl={videoUrl} />
      </div>
      

      <div className="carousel" ref={carouselRef}>
        <h1>
          Explore Our{" "}
          <span>{selectedType === "club" ? "Clubs" : "Chapters"}...</span>
        </h1>
        <div className="selector">
          <button
            className={`selector-button ${
              selectedType === "club" ? "active" : ""
            }`}
            onClick={() => handleTypeChange("club")}
          >
            Clubs
          </button>
          <button
            className={`selector-button ${
              selectedType === "chapter" ? "active" : ""
            }`}
            onClick={() => handleTypeChange("chapter")}
          >
            Chapters
          </button>
        </div>
        <div className="club-carousel">
          {clubs
            .filter((club) => club.type && club.type === selectedType)
            .map((club, index) => (
              <ClubCard
                key={index}
                name={club.name}
                logo={club.clubLogo}
                type={club.type}
                facultyLead={club.facultyCoordinator}
                studentLead={club.studentChair}
                onMoreDetailsClick={() => openClubModal(club)}
              />
            ))}
        </div>
      </div>

      {/* Events Section */}
      <div className="events-section" ref={eventSectionRef}>
        <h1>Upcoming Events</h1>
        <div className="event-cards">
          {events
            .filter((event) => event.status === "upcoming")
            .slice(0, 6) // Limit to a maximum of 6 events
            .map((event, index) => (
              <EventCard
                key={index}
                event={event}
                onClick={() => openEventModal(event)}
              />
            ))}
        </div>
        <button
          className="button show-more-button"
          onClick={() => (window.location.href = "/events")}
        >
          Show More
        </button>
        <Footer />
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

      {/* Scroll to top button */}
      {showScrollTopButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <KeyboardArrowUpIcon fontSize="large"/>
        </button>
      )}
    </div>
  );
};

export default Home;
