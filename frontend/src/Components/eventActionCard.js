// ActionCards.js
import React, {useEffect, useState} from "react";
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Grid,
    Select,
    Box,
    MenuItem
} from "@mui/material";
import ImageUpload from "../utils/ImageUpload"; // Import your ImageUpload component
import EventPage from "../pages/RenderEventPage/RenderEventPage"; // Adjust the import path as needed
import {uploadImageToCloudinary} from "../utils/cloudinaryUpload";
import { addEvent, getClubEvents, removeEvent, getUpcomingEvents, getOngoingEvents, getClosedEvents, closeRegistration, closeEvent, closeFeedback } from "../services/eventService";

const ActionCards = ({selectedAction}) => {
    const [formData,
        setFormData] = useState({
        name: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        fee: "",
        logo: null
    });
    const [clubEvents,
        setClubEvents] = useState([]);
    const [selectedEvent,
        setSelectedEvent] = useState("");
    const [upcomingEvents,
        setUpcomingEvents] = useState([]);
    const [ongoingEvents,
        setOngoingEvents] = useState([]);
    const [closedEvents,
        setClosedEvents] = useState([]);

    useEffect(() => {
        const fetchClubEvents = async() => {
            try {
                const eventData = await getClubEvents();
                setClubEvents(eventData);
            } catch (error) {
                console.error("Error fetching club members:", error);
            }
        };

        fetchClubEvents();
    }, []);

    useEffect(() => {
        const fetchUpcomingEvents = async() => {
            try {
                const eventData = await getUpcomingEvents();
                setUpcomingEvents(eventData);
            } catch (error) {
                console.error("Error fetching club members:", error);
            }
        };

        fetchUpcomingEvents();
    }, []);


    useEffect(() => {
        const fetchOngoingEvents = async() => {
            try {
                const eventData = await getOngoingEvents();
                setOngoingEvents(eventData);
            } catch (error) {
                console.error("Error fetching club members:", error);
            }
        };

        fetchOngoingEvents();
    }, []);

    useEffect(() => {
        const fetchClosedEvents = async() => {
            try {
                const eventData = await getClosedEvents();
                setClosedEvents(eventData);
            } catch (error) {
                console.error("Error fetching club members:", error);
            }
        };

        fetchClosedEvents();

    }, []);


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageUpload = async(file) => {
        try {
            // Upload the image to Cloudinary and get the URL
            const photo = await uploadImageToCloudinary(file);

            // Update formData with the Cloudinary image URL
            setFormData({
                ...formData,
                logo: photo, // Save the URL of the uploaded image
            });
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            // Call the addEvent service and pass the formData
            await addEvent(formData);
            console.log("Event successfully added");
        } catch (error) {
            console.error("Error submitting event:", error);
        }
    };

    const handleRemoveEvent = async() => {
        try {
            await removeEvent(selectedEvent);
            // Update the events state to remove the deleted event
            setClubEvents(clubEvents.filter((event) => event._id !== selectedEvent));
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    const handleCloseRegistration = async() => {
        try {
            await closeRegistration(selectedEvent);
            // Update the events state to remove the deleted event
            setUpcomingEvents(upcomingEvents.filter((event) => event._id !== selectedEvent));
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    const handleCloseEvent= async() => {
        try {
            await closeEvent(selectedEvent);
            // Update the events state to remove the deleted event
            setOngoingEvents(ongoingEvents.filter((event) => event._id !== selectedEvent));
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    const handleCloseFeedback = async() => {
        try {
            await closeFeedback(selectedEvent);
            // Update the events state to remove the deleted event
            setClosedEvents(closedEvents.filter((event) => event._id !== selectedEvent));
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
      <>
    
        {selectedAction === "registerInEvent" && (
            <Card elevation={3} className="details-card">
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Register For Event
                    </Typography>
                    <EventPage/>
                </CardContent>
            </Card>
          )
        }

    {
        selectedAction === "closeRegistration" && (
            <Card elevation={3} className="details-card">
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Close Registration
                    </Typography>

                    <Box display="flex" flexDirection="column" alignItems="flex-start" // Aligns items to the left
                        gap={2} // Adds vertical space between the dropdown and button
                    >
                        <Select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} displayEmpty fullWidth // Makes the select box take the full width of its container
                        >
                            {upcomingEvents.map((event) => (
                                <MenuItem key={event._id} value={event._id}>
                                    {event.name}
                                </MenuItem>
                            ))}
                        </Select>

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleCloseRegistration}
                            disabled={!selectedEvent || upcomingEvents.length === 0}>
                            Close Registration
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        )
    }

    {
        selectedAction === "closeEvent" && (
            <Card elevation={3} className="details-card">
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Close Event
                    </Typography>

                    <Box display="flex" flexDirection="column" alignItems="flex-start" // Aligns items to the left
                        gap={2} // Adds vertical space between the dropdown and button
                    >
                        <Select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} displayEmpty fullWidth // Makes the select box take the full width of its container
                        >
                            {ongoingEvents.map((event) => (
                                <MenuItem key={event._id} value={event._id}>
                                    {event.name}
                                </MenuItem>
                            ))}
                        </Select>

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleCloseEvent}
                            disabled={!selectedEvent || ongoingEvents.length === 0}>
                            Close Event
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        )
    }

    {
        selectedAction === "closeFeedback" && (
            <Card elevation={3} className="details-card">
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Close Feedback
                    </Typography>

                    <Box display="flex" flexDirection="column" alignItems="flex-start" // Aligns items to the left
                        gap={2} // Adds vertical space between the dropdown and button
                    >
                        <Select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} displayEmpty fullWidth // Makes the select box take the full width of its container
                        >
                            {closedEvents.map((event) => (
                                <MenuItem key={event._id} value={event._id}>
                                    {event.name}
                                </MenuItem>
                            ))}
                        </Select>

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleCloseFeedback}
                            disabled={!selectedEvent || closedEvents.length === 0}>
                            Close Feedback
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        )
    }

    {
        selectedAction === "removeEvent" && (
            <Card elevation={3} className="details-card">
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Remove Event
                    </Typography>

                    <Box display="flex" flexDirection="column" alignItems="flex-start" // Aligns items to the left
                        gap={2} // Adds vertical space between the dropdown and button
                    >
                        <Select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} displayEmpty fullWidth // Makes the select box take the full width of its container
                        >
                            {clubEvents.map((event) => (
                                <MenuItem key={event._id} value={event._id}>
                                    {event.name}
                                </MenuItem>
                            ))}
                        </Select>

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleRemoveEvent}
                            disabled={!selectedEvent || clubEvents.length === 0}>
                            Remove Event
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        )
    }

    {
        selectedAction === "addEvent" && (
            <Card elevation={3} className="details-card">
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Add New Event
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Event Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required/>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    required/>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Date"
                                    name="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    fullWidth
                                    InputLabelProps={{
                                    shrink: true
                                }}
                                    required/>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Time"
                                    name="time"
                                    type="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    fullWidth
                                    InputLabelProps={{
                                    shrink: true
                                }}
                                    required/>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Venue"
                                    name="venue"
                                    value={formData.venue}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required/>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Fee"
                                    name="fee"
                                    type="number"
                                    value={formData.fee}
                                    onChange={handleInputChange}
                                    fullWidth/>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Members"
                                    name="members"
                                    placeholder="Enter a number or a range like 1-2"
                                    value={formData.members}
                                    onChange={handleInputChange}
                                    fullWidth
                                    required/>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="body1" gutterBottom>
                                    Upload Poster
                                </Typography>
                                <ImageUpload onImageUpload={handleImageUpload}/>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                sx={{
                                textAlign: "right"
                            }}>
                                <Button variant="contained" color="primary" type="submit">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        )
    } 

    </>
  );
};

export default ActionCards;