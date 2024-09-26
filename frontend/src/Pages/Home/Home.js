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
import "./Home.css";

const Home = () => {
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("club"); // Default is 'club'
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false); // For scroll-to-top button
  const images = [
    "/homeImg/sr1.png",
    "/homeImg/sr2.png",
    "/homeImg/sr3.png",
    "/homeImg/sr4.png",
  ];
  const introRef = useRef();
  const carouselRef = useRef();
  const eventSectionRef = useRef();
  const typewriterRef = useRef(null);
  const typingSpeed = 100; // Speed of typing effect

  useEffect(() => {
    // Image carousel interval
    const intervalId = setInterval(() => {
      setFade(false); // Trigger fade out
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Update image
        setFade(true); // Trigger fade in
      }, 1500); // Wait for the fade-out to complete
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, [images]);

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

  const handleTypeChange = (type) => {
    setSelectedType(type); // Set the type to either 'club' or 'chapter'
  };

  // Typewriter effect logic
  useEffect(() => {
    const text =
      "A one-stop solution for managing technical clubs, events, and resources efficiently";
    let index = 0;
    const type = () => {
      if (index < text.length) {
        if (typewriterRef.current) {
          typewriterRef.current.innerHTML = text.slice(0, index + 1) + "|";
          index++;
          setTimeout(type, typingSpeed);
        }
      } else {
        if (typewriterRef.current) {
          typewriterRef.current.innerHTML = text; // Remove the pipe cursor at the end
        }
      }
    };
    type();
  }, []);

  // Scroll-to-top button visibility
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

  // Intersection Observer for animations
  useEffect(() => {
    const sections = [
      introRef.current,
      carouselRef.current,
      eventSectionRef.current,
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
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
      <div className="intro" ref={introRef}>
        {/* Fading background */}
        <div
          className="background-fade"
          style={{
            backgroundImage: `url(${images[currentImageIndex]})`,
            opacity: fade ? 1 : 0, // Control the opacity based on fade state
          }}
        />

        {/* Content */}
        <div className="intro-header">
          <h1>Welcome to the Club Portal</h1>
          <p className="cursive-text" ref={typewriterRef}>
            {/* Typewriter effect paragraph */}
          </p>
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

      <div className="home-body">
        {/* Club Cards Carousel */}
        <div className="carousel" ref={carouselRef}>
          <h1>
            Explore Our {selectedType === "club" ? "Clubs" : "Chapters"}...
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
            <Slider {...settings}>
              {clubs
                .filter((club) => club.type && club.type === selectedType)
                .map((club, index) => (
                  <ClubCard
                    key={index}
                    name={club.name}
                    logo={club.clubLogo}
                    onClick={() => openClubModal(club)}
                  />
                ))}
            </Slider>
          </div>
        </div>

        {/* Events Section */}
        <div className="events-section" ref={eventSectionRef}>
          <h1>Upcoming Events</h1>
          <div className="event-cards">
            {events
              .filter((event) => event.status === "upcoming") // Filter for upcoming events
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
      </div>

      {/* Scroll to top button */}
      {showScrollTopButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Home;
