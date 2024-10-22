import React, { useState, useEffect } from "react";
import { Container, Typography, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import EventCard from "../../Components/EventCard/EventCard";
import EventModal from "../../Components/EventModal/EventModal";
import { getAllEvents } from "../../services/eventService";
import { getAllClubs } from "../../services/clubService";
import Header from "../../Components/HomeHeader/HomeHeader";
import SwiperCore from "swiper";
import "./EventPage.css";

// Initialize Swiper with the navigation and effect modules
SwiperCore.use([Navigation, EffectCoverflow]);

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState("All Clubs");

  useEffect(() => {
    const fetchEventsAndClubs = async () => {
      const eventData = await getAllEvents();
      const clubData = await getAllClubs();
      setEvents(eventData);
      setClubs(clubData);
    };

    fetchEventsAndClubs();
  }, []);

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    setIsEventModalOpen(false);
  };

  // Filter events based on selected club
  const filteredEvents =
    selectedClub === "All Clubs"
      ? events
      : events.filter((event) => event.club === selectedClub);

  return (
    <Container
      maxWidth={false} // Make sure it spans the full width
      sx={{
        paddingY: 4,
        marginTop: 0, // Remove margin to ensure it spans from the top
        minHeight: "100vh", // Ensure it covers the full viewport height
      }}
      style={{
        backgroundImage: 'url("eventBg.avif")',
        backgroundSize: "cover", // Cover the entire area
        backgroundPosition: "center", // Center the background image
        backgroundRepeat: "no-repeat", // Prevent background repeat
      }}
    >
    <Header />
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        mt={10}
        mb={10}
        style={{ fontWeight: "bolder", color:"#4086ea", fontSize: "3rem" }}
      >
        Check Out Our Events...
      </Typography>

      <Swiper
        spaceBetween={50}
        slidesPerView={1.5} // Adjust this value as needed
        centeredSlides={true} // Ensure slides are centered
        navigation
        effect="coverflow"
        grabCursor={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        loop={true}
      >
        {clubs.map((club) => (
          <SwiperSlide key={club._id} className="swiper">
            <Paper elevation={5} className="club-event-card">
              <Typography variant="h5" gutterBottom>
                {club.name}
              </Typography>

              {/* Upcoming Events */}
              <Section
                title="Upcoming"
                events={filteredEvents}
                clubName={club.name}
                status="upcoming"
                openEventModal={openEventModal}
              />

              {/* Ongoing Events */}
              <Section
                title="Ongoing"
                events={filteredEvents}
                clubName={club.name}
                status="ongoing"
                openEventModal={openEventModal}
              />

              {/* Completed Events */}
              <Section
                title="Completed"
                events={filteredEvents}
                clubName={club.name}
                status={["completed", "feedbackClosed"]}
                openEventModal={openEventModal}
              />
            </Paper>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={isEventModalOpen}
          onRequestClose={closeEventModal}
        />
      )}
    </Container>
  );
};

const Section = ({ title, events, clubName, status, openEventModal }) => {
  // Check if status is an array, and filter accordingly
  const filteredEvents = events.filter(
    (event) =>
      event.club === clubName &&
      (Array.isArray(status)
        ? status.includes(event.status)
        : event.status === status)
  );

  return filteredEvents.length > 0 ? (
    <div>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <div className="event-grid">
        {filteredEvents.map((event) => (
          <EventCard
            event={event}
            onClick={() => openEventModal(event)}
            key={event._id}
          />
        ))}
      </div>
    </div>
  ) : (
    <Typography variant="body1" align="center">
      No {title.toLowerCase()} events right now, check back later.
    </Typography>
  );
};

export default EventPage;
