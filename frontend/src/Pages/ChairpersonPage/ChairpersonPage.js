import React, { useState, useEffect } from "react";
import {
  Divider,
  MenuList,
  Grid,
  Typography,
  Box,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  IconButton,
  Collapse,
  FormControl,
  InputLabel,
  TextField,
  ListItemIcon, 
  ListItemText, 
  Radio,
  RadioGroup,
  FormControlLabel
} from "@mui/material";
import { 
  Assignment as AssignmentIcon, 
  Event as EventIcon, 
  Star as StarIcon, 
  Group as GroupIcon, 
  Add as AddIcon, 
  Delete as DeleteIcon, 
  PersonAdd as PersonAddIcon, 
  PersonRemove as PersonRemoveIcon,
  Close as CloseIcon, 
  Cancel as CancelIcon,
  Stop as StopIcon,
  CheckCircle as CheckCirlceIcon
} from '@mui/icons-material';
import ImageUpload from "../../utils/ImageUpload";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { getUserInfo } from "../../services/userService";
import Header from "../../components/Header/Header";
import { submitProposal, getProposal } from "../../services/proposeService";
import {
  fetchClubMembers,
  getUsers,
  addMember,
  getRemovableMembers,
  removeMember,
  changeRole,
} from "../../services/memberService";
import {
  postClubData,
  getClubName,
  getClubMembers,
  updateMember,
  deleteMember,
  postClubEvents,
  updateEvent,
  deleteEvent,
  getClubEvents,
} from "../../services/clubService";
import EditIcon from "@mui/icons-material/Edit";
import { uploadImageToCloudinary } from "../../utils/cloudinaryUpload";
import ActionCards from "../../components/eventActionCard"; // Adjust the import path as needed
import BookedVenues from "../../components/bookedVenues";
import "./ChairpersonPage.css";

const ChairpersonPage = () => {
  const [selectedAction, setSelectedAction] = useState("");
  const [organizingBody, setOrganizingBody] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [preferredVenue, setPreferredVenue] = useState("");
  const [proposalInitiator, setProposalInitiator] = useState("");
  const [collaborations, setCollaborations] = useState("");
  const [sponsors, setSponsors] = useState("");
  const [description, setDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [expectedParticipation, setExpectedParticipation] = useState("");
  const [assistanceNeeded, setAssistanceNeeded] = useState("");
  const [equipmentMaterials, setEquipmentMaterials] = useState([
    { description: "", quantity: "", unitPrice: "" },
  ]);
  const [equipmentJustification, setEquipmentJustification] = useState("");
  const [travelExpenses, setTravelExpenses] = useState([
    { description: "", totalCost: "" },
  ]);
  const [travelJustification, setTravelJustification] = useState("");
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [expandedProposalIndex, setExpandedProposalIndex] = useState(null);
  const [guestUsers, setGuestUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [removableMembers, setRemovableMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [selectMember, setSelectMember] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [facultyCoordinator, setFacultyCoordinator] = useState("");
  const [studentChair, setStudentChair] = useState("");
  const [studentCoChair, setStudentCoChair] = useState("");
  const [officialMembers, setOfficialMembers] = useState("");
  const [clubLogo, setClubLogo] = useState("");
  const [clubWebsite, setClubWebsite] = useState("");
  const [clubEmail, setClubEmail] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [linkedinHandle, setLinkedinHandle] = useState("");
  const [facebookHandle, setFacebookHandle] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [officialPics, setOfficialPics] = useState("");
  const [chapterBrief, setChapterBrief] = useState("");
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [addMembers, setAddMembers] = useState([]);
  const [type, setType] = useState(""); // for single choice 'Club' or 'Chapter'
  const [tentativeDate, setTentativeDate] = useState(""); // for date input
  const [clubName, setClubName] = useState("");
  const [memberName, setMemberName] = useState([]);
  const [editedMembers, setEditedMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [newEvents, setNewEvents] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await getClubMembers();
        setMemberName(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const fetchClubName = async () => {
      try {
        const res = await getClubName();
        setClubName(res);
      } catch (error) {
        console.error("Error fetching club name:", error);
      }
    };
    fetchClubName();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await getRemovableMembers();
        setRemovableMembers(res); // Set the members in the state
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserInfo();
        setEmail(user.email);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  // Handling dynamic fields for Equipment and Materials
  const handleEquipmentChange = (index, field, value) => {
    const updatedEquipment = [...equipmentMaterials];
    updatedEquipment[index][field] = value;
    setEquipmentMaterials(updatedEquipment);
  };

  const addEquipmentField = () => {
    setEquipmentMaterials([
      ...equipmentMaterials,
      { description: "", quantity: "", unitPrice: "" },
    ]);
  };

  const handleTravelChange = (index, field, value) => {
    const updatedTravel = [...travelExpenses];
    updatedTravel[index][field] = value;
    setTravelExpenses(updatedTravel);
  };

  const addTravelField = () => {
    setTravelExpenses([...travelExpenses, { description: "", totalCost: "" }]);
  };

  // Calculate total for Equipment and Materials
  const calculateEquipmentTotal = () => {
    return equipmentMaterials.reduce((total, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const unitPrice = parseFloat(item.unitPrice) || 0;
      return total + quantity * unitPrice;
    }, 0);
  };

  // Calculate total for Travel and Miscellaneous
  const calculateTravelTotal = () => {
    return travelExpenses.reduce((total, item) => {
      const cost = parseFloat(item.totalCost) || 0;
      return total + cost;
    }, 0);
  };

  // Calculate grand total
  const calculateGrandTotal = () => {
    return calculateEquipmentTotal() + calculateTravelTotal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const proposalData = {
      organizingBody,
      eventName,
      eventDate,
      eventTime,
      purpose,
      preferredVenue,
      proposalInitiator,
      collaborations,
      sponsors,
      description,
      targetAudience,
      expectedParticipation,
      assistanceNeeded,
      equipmentMaterials,
      equipmentJustification,
      travelExpenses,
      travelJustification,
      equipmentTotal: calculateEquipmentTotal(),
      travelTotal: calculateTravelTotal(),
      grandTotal: calculateGrandTotal(),
    };
    try {
      await submitProposal(proposalData);
      alert("Proposal successfully submitted!");
    } catch (error) {
      console.error("Error submitting proposal:", error);
    }
  };

  useEffect(() => {
    const getClubMembers = async () => {
      try {
        const memberData = await fetchClubMembers();
        setMembers(memberData);
      } catch (error) {
        console.error("Error fetching club members:", error);
      }
    };

    getClubMembers();
  }, []);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const data = await getProposal();
        setProposals(data);
      } catch (err) {
        console.error("Failed to fetch proposals:", err);
      }
    };

    fetchProposals();
  }, []);

  const handleToggleExpand = (index) => {
    setExpandedProposalIndex(expandedProposalIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers(); // Fetch guest users
        setGuestUsers(users);
      } catch (err) {
        console.error("Error fetching guest users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleAddMemberSubmit = async (event) => {
    event.preventDefault();

    try {
      await addMember({ email: selectedUser });
      setGuestUsers(guestUsers.filter((user) => user.email !== selectedUser));
      alert("Member added successfully");
    } catch (err) {
      console.error("Error adding member:", err);
      alert("Error adding member");
    }
  };

  const handleRemoveMember = async (e) => {
    e.preventDefault();
    try {
      await removeMember(selectedMember);

      // Remove the selected member from the members array
      setRemovableMembers((prevRemovableMembers) =>
        prevRemovableMembers.filter((member) => member.email !== selectedMember)
      );

      // Reset the selected member
      setSelectedMember("");
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

  const handleRoleChangeSubmit = async (e) => {
    e.preventDefault();
    try {
      await changeRole(selectMember, selectedRole);
      alert("Role changed successfully");
    } catch (error) {
      console.error("Error changing role:", error);
      alert("Failed to change role");
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = () => {
    setAddMembers([
      ...addMembers,
      { name: "", enrollmentId: "", email: "", position: "", photo: "" }, // changed to enrollmentId
    ]);
  };

  // Handle member field change
  const handleMemberChange = (e, index, field) => {
    const newMembers = [...addMembers];
    newMembers[index][field] = e.target.value;
    setAddMembers(newMembers);
  };

  const handleImageUploadForMember = async (file, index) => {
    try {
      const uploadedUrl = await uploadImageToCloudinary(file);
      const newMembers = [...addMembers];
      newMembers[index].photo = uploadedUrl;
      setAddMembers(newMembers);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    fetchClubEvents();
  }, []);

  const fetchClubEvents = async () => {
    try {
      const fetchedEvents = await getClubEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const handleAddEvent = () => {
    setNewEvents([
      ...newEvents,
      {
        date: "",
        eventName: "",
        internalExternal: "",
        nationalInternational: "",
      },
    ]);
  };

  const handleNewEventChange = (e, index, field) => {
    const updatedNewEvents = newEvents.map((event, i) => {
      if (i === index) {
        return { ...event, [field]: e.target.value }; // Update the specific field
      }
      return event; // Leave other events unchanged
    });
    setNewEvents(updatedNewEvents);
  };

  const handleEventChange = (e, index, field) => {
    const updatedEvents = events.map((event, i) => {
      if (i === index) {
        return { ...event, [field]: e.target.value }; // Update the specific field
      }
      return event; // Leave other events unchanged
    });
    setEvents(updatedEvents);
  };

  const handleRemoveNewEvent = (index) => {
    const updatedNewEvents = newEvents.filter((_, i) => i !== index);
    setNewEvents(updatedNewEvents);
  };

  const handleEditEvent = (index) => {
    const updatedEvents = events.map((event, i) => {
      if (i === index) {
        return { ...event, isEditing: true }; // Update the specific event's isEditing flag
      }
      return event; // Leave other events unchanged
    });
    setEvents(updatedEvents);
  };

  const handleSaveEditEvent = async (index) => {
    const event = events[index];
    const updatedEvent = {
      date: new Date(event.date).toISOString(),
      eventName: event.eventName,
      internalExternal: event.internalExternal,
      nationalInternational: event.nationalInternational,
    };

    console.log(updatedEvent);
    console.log(event._id); // Make sure _id is defined here

    if (!event._id) {
      console.error("No _id found for the event.");
      return; // Stop if _id is undefined
    }

    await updateEvent(event._id, updatedEvent); // Ensure updateEvent is working
    fetchClubEvents(); // Refresh the list of events
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      console.log(eventId);
      await deleteEvent(eventId);
      // Update the events state to remove the deleted event
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleRemoveData = (index) => {
    const updatedMembers = [...addMembers];
    updatedMembers.splice(index, 1);
    setAddMembers(updatedMembers);
  };

  const handleClear = () => {
    // Clear all form fields
    setFacultyCoordinator("");
    setStudentChair("");
    setStudentCoChair("");
    setOfficialMembers("");
    setClubLogo("");
    setClubWebsite("");
    setClubEmail("");
    setInstagramHandle("");
    setLinkedinHandle("");
    setFacebookHandle("");
    setTwitterHandle("");
    setOfficialPics("");
    setChapterBrief("");
    setMission("");
    setVision("");
    setAddMembers([]);
    setEvents([]);
    setType("");
    setTentativeDate("");
    setNewEvents([]);
  };

  const handleEditMember = (member) => {
    const isAlreadyEdited = editedMembers.some((m) => m.email === member.email);
    if (!isAlreadyEdited) {
      setEditedMembers([...editedMembers, { ...member }]); // Add member to edited list
    }
  };

  const handleDeleteMember = (member) => {
    const confirmDelete = window.confirm(
      "You want to delete this member, the action can't be undone"
    );
    if (confirmDelete) {
      // Call deleteMember API
      deleteMember(member);

      // Update the UI by removing the member from the members array
      setMemberName((prevMembers) =>
        prevMembers.filter((m) => m.email !== member.email)
      );

      alert("Member deleted successfully.");
    }
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();

    const clubData = {
      name: clubName.clubName,
      facultyCoordinator,
      studentChair,
      studentCoChair,
      officialMembers,
      clubLogo,
      clubWebsite,
      clubEmail,
      instagramHandle,
      linkedinHandle,
      facebookHandle,
      twitterHandle,
      officialPics,
      chapterBrief,
      mission,
      vision,
      addMembers: addMembers.map((member) => ({
        name: member.name,
        email: member.email,
        enrollmentId: member.enrollmentId,
        position: member.position,
        photo: member.photo,
      })),
      events: [
        ...newEvents,
        ...events.map((event) => ({
          date: new Date(event.date).toISOString(), // Convert to ISO string
          eventName: event.eventName,
          internalExternal: event.internalExternal,
          nationalInternational: event.nationalInternational,
        })),
      ],
      type, // Add the type field
      tentativeDate, // Add the tentative date field
    };

    const result = await postClubData(clubData);
    handleClear();

    for (const editedMember of editedMembers) {
      await updateMember(editedMember.email, editedMember);
    }

    // Clear states after submission
    setEditedMembers([]);
  };

  const handleImageUploadForEditedMember = async (file, email) => {
    try {
      console.log(file);
      const uploadedUrl = await uploadImageToCloudinary(file); // Upload the file
      handleFieldChange(email, "photo", uploadedUrl); // Update the photo field for the specific member
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleFieldChange = (email, field, value) => {
    const memberIndex = editedMembers.findIndex(
      (member) => member.email === email
    );

    if (memberIndex !== -1) {
      const updatedMember = { ...editedMembers[memberIndex], [field]: value };
      const updatedEditedMembers = [...editedMembers];
      updatedEditedMembers[memberIndex] = updatedMember;
      setEditedMembers(updatedEditedMembers);
    } else {
      const originalMember = memberName.find(
        (member) => member.email === email
      );
      const newEditedMember = { ...originalMember, [field]: value };
      setEditedMembers([...editedMembers, newEditedMember]);
    }
  };

  const handleImageUpload = async (file) => {
    try {
      console.log(file);
      const uploadedUrl = await uploadImageToCloudinary(file);
      setClubLogo(uploadedUrl); // Store the URL in state
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <Typography variant="h6" gutterBottom>
          Chairperson Dashboard
        </Typography>
        <Divider />
        <MenuList>
          <MenuItem onClick={() => setSelectedAction("proposeEvent")}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Propose Event" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("viewProposals")}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="View All Proposals" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("checkBookedVenues")}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Check Booked Venues" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("viewMember")}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="View Club Members" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("addMember")}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Member" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("removeMember")}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Remove Member" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("changeRoles")}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Change Roles" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("changeClubData")}>
            <ListItemIcon>
              <PersonRemoveIcon />
            </ListItemIcon>
            <ListItemText primary="Change Club Data" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("registerInEvent")}>
            <ListItemIcon>
              <CheckCirlceIcon />
            </ListItemIcon>
            <ListItemText primary="Register For Event" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("addEvent")}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add New Event" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("removeEvent")}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Remove Event" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("closeRegistration")}>
            <ListItemIcon>
              <StopIcon />
            </ListItemIcon>
            <ListItemText primary="Close Registration" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("closeEvent")}>
            <ListItemIcon>
              <CancelIcon />
            </ListItemIcon>
            <ListItemText primary="Mark Event as Complete" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("closeFeedback")}>
            <ListItemIcon>
              <CloseIcon />
            </ListItemIcon>
            <ListItemText primary="Close Feedback Collection" />
          </MenuItem>
        </MenuList>
      </div>
        <div className="dashboard-body" >
        <Header email = {email} className="chair-header" />
      <div className="dashboard-content">
      
        <Card elevation={3} className="welcome-card">
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Welcome, Chairperson!
            </Typography>
          </CardContent>
        </Card>

        <Grid container spacing={2} className="action-grid">
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className="action-card"
              onClick={() => setSelectedAction("proposeEvent")}
            >
              <CardContent>
                <Typography variant="h6">Propose Event</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className="action-card"
              onClick={() => setSelectedAction("viewProposals")}
            >
              <CardContent>
                <Typography variant="h6">View All Proposals</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className="action-card"
              onClick={() => setSelectedAction("checkBookedVenues")}
            >
              <CardContent>
                <Typography variant="h6">Check Booked Venues</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className="action-card"
              onClick={() => setSelectedAction("viewMember")}
            >
              <CardContent>
                <Typography variant="h6">View Club Members</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className="action-card"
              onClick={() => setSelectedAction("addMember")}
            >
              <CardContent>
                <Typography variant="h6">Add Member</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className="action-card"
              onClick={() => setSelectedAction("removeMember")}
            >
              <CardContent>
                <Typography variant="h6">Remove Member</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className="action-card"
              onClick={() => setSelectedAction("changeRoles")}
            >
              <CardContent>
                <Typography variant="h6">Change Roles</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className="action-card"
              onClick={() => setSelectedAction("changeClubData")}
            >
              <CardContent>
                <Typography variant="h6">Change Club Data</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className="action-card"
              onClick={() => setSelectedAction("registerInEvent")}
            >
              <CardContent>
                <Typography variant="h6">Register For Event</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className="action-card"
              onClick={() => setSelectedAction("addEvent")}
            >
              <CardContent>
                <Typography variant="h6">Add New Event</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className="action-card"
              onClick={() => setSelectedAction("removeEvent")}
            >
              <CardContent>
                <Typography variant="h6">Remove Event</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className="action-card"
              onClick={() => setSelectedAction("closeRegistration")}
            >
              <CardContent>
                <Typography variant="h6">Close Registration</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className="action-card"
              onClick={() => setSelectedAction("closeEvent")}
            >
              <CardContent>
                <Typography variant="h6">Mark Event as Complete</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className="action-card"
              onClick={() => setSelectedAction("closeFeedback")}
            >
              <CardContent>
                <Typography variant="h6">Close Feedback Collection</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {selectedAction === "proposeEvent" && (
          <Card elevation={3} className="details-card">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Propose Event
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name of Organizing Body"
                  margin="normal"
                  value={organizingBody}
                  onChange={(e) => setOrganizingBody(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Event Name"
                  margin="normal"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Event"
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
                <TextField
                  fullWidth
                  type="time"
                  label="Time of Event"
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Purpose of Event"
                  margin="normal"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Preferred Venue"
                  margin="normal"
                  value={preferredVenue}
                  onChange={(e) => setPreferredVenue(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Proposal Initiated by"
                  margin="normal"
                  value={proposalInitiator}
                  onChange={(e) => setProposalInitiator(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Collaborations (if any)"
                  margin="normal"
                  value={collaborations}
                  onChange={(e) => setCollaborations(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Name of Sponsors (if any)"
                  margin="normal"
                  value={sponsors}
                  onChange={(e) => setSponsors(e.target.value)}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Brief description of the overall event"
                  margin="normal"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Target Audience"
                  margin="normal"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Expected Participation"
                  margin="normal"
                  value={expectedParticipation}
                  onChange={(e) => setExpectedParticipation(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Assistance required from any department"
                  margin="normal"
                  value={assistanceNeeded}
                  onChange={(e) => setAssistanceNeeded(e.target.value)}
                />

                {/* Equipment & Materials Section */}
                <Typography variant="h6" gutterBottom>
                  Equipment & Materials
                </Typography>
                {equipmentMaterials.map((item, index) => (
                  <Box key={index} display="flex" gap={2} mb={2}>
                    <TextField
                      label="Item Description"
                      value={item.description}
                      onChange={(e) =>
                        handleEquipmentChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      fullWidth
                    />
                    <TextField
                      label="Quantity"
                      value={item.quantity}
                      onChange={(e) =>
                        handleEquipmentChange(index, "quantity", e.target.value)
                      }
                      fullWidth
                    />
                    <TextField
                      label="Unit Price"
                      value={item.unitPrice}
                      onChange={(e) =>
                        handleEquipmentChange(
                          index,
                          "unitPrice",
                          e.target.value
                        )
                      }
                      fullWidth
                    />
                  </Box>
                ))}
                <Button variant="outlined" onClick={addEquipmentField}>
                  Add More Equipment
                </Button>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Justification"
                  value={equipmentJustification}
                  onChange={(e) => setEquipmentJustification(e.target.value)}
                  margin="normal"
                />

                {/* Travel & Miscellaneous Section */}
                <Typography variant="h6" gutterBottom>
                  Travel & Miscellaneous
                </Typography>
                {travelExpenses.map((item, index) => (
                  <Box key={index} display="flex" gap={2} mb={2}>
                    <TextField
                      label="Expense Description"
                      value={item.description}
                      onChange={(e) =>
                        handleTravelChange(index, "description", e.target.value)
                      }
                      fullWidth
                    />
                    <TextField
                      label="Total Cost"
                      value={item.totalCost}
                      onChange={(e) =>
                        handleTravelChange(index, "totalCost", e.target.value)
                      }
                      fullWidth
                    />
                  </Box>
                ))}
                <Button variant="outlined" onClick={addTravelField}>
                  Add More Travel Expenses
                </Button>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Justification"
                  value={travelJustification}
                  onChange={(e) => setTravelJustification(e.target.value)}
                  margin="normal"
                />

                {/* Summary */}
                <Box mt={4}>
                  <Typography variant="h6">
                    Total for Equipment & Materials: Rs.
                    {calculateEquipmentTotal().toFixed(2)}
                  </Typography>
                  <Typography variant="h6">
                    Total for Travel & Miscellaneous: Rs.
                    {calculateTravelTotal().toFixed(2)}
                  </Typography>
                  <Typography variant="h5" mt={2} mb={2}>
                    Grand Total: Rs.{calculateGrandTotal().toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Submit Proposal
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {selectedAction === "viewProposals" && (
          <Card elevation={3} className="details-card">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                View All Proposals
              </Typography>
              {proposals.map((proposal, index) => (
                <Card
                  elevation={3}
                  className="details-card"
                  key={proposal._id}
                  style={{
                    margin: "10px 0",
                    width: "100%",
                    maxWidth: 1000,
                    mb: 2,
                  }}
                >
                  <CardContent>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6">
                        Proposal {proposals.length - index}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {proposal.status}
                      </Typography>
                      <IconButton onClick={() => handleToggleExpand(index)}>
                        {expandedProposalIndex === index ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </IconButton>
                    </Box>
                    <Collapse
                      in={expandedProposalIndex === index}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box mt={2}>
                        <Typography variant="body1">
                          Organizing Body: {proposal.organizingBody}
                        </Typography>
                        <Typography variant="body1">
                          Event Name: {proposal.eventName}
                        </Typography>
                        <Typography variant="body1">
                          Event Date:{" "}
                          {new Date(proposal.eventDate).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1">
                          Event Time: {proposal.eventTime}
                        </Typography>
                        <Typography variant="body1">
                          Purpose: {proposal.purpose}
                        </Typography>
                        <Typography variant="body1">
                          Preferred Venue: {proposal.preferredVenue}
                        </Typography>
                        <Typography variant="body1">
                          Proposal Initiator: {proposal.proposalInitiator}
                        </Typography>
                        <Typography variant="body1">
                          Collaborations: {proposal.collaborations}
                        </Typography>
                        <Typography variant="body1">
                          Sponsors: {proposal.sponsors}
                        </Typography>
                        <Typography variant="body1">
                          Description: {proposal.description}
                        </Typography>
                        <Typography variant="body1">
                          Target Audience: {proposal.targetAudience}
                        </Typography>
                        <Typography variant="body1">
                          Expected Participation:{" "}
                          {proposal.expectedParticipation}
                        </Typography>
                        <Typography variant="body1">
                          Assistance Needed: {proposal.assistanceNeeded}
                        </Typography>

                        {/* Render Equipment Materials */}
                        <Box mt={2}>
                          <Typography variant="body1">
                            <strong>Equipment Materials:</strong>
                          </Typography>
                          {proposal.equipmentMaterials.length ? (
                            proposal.equipmentMaterials.map((item, idx) => (
                              <Box key={idx} mb={1}>
                                <Typography variant="body2">
                                  Description: {item.description}
                                </Typography>
                                <Typography variant="body2">
                                  Quantity: {item.quantity}
                                </Typography>
                                <Typography variant="body2">
                                  Unit Price: {item.unitPrice}
                                </Typography>
                              </Box>
                            ))
                          ) : (
                            <Typography variant="body2">
                              No equipment materials listed.
                            </Typography>
                          )}
                        </Box>

                        {/* Render Travel Expenses */}
                        <Box mt={2}>
                          <Typography variant="body1">
                            <strong>Travel Expenses:</strong>
                          </Typography>
                          {proposal.travelExpenses.length ? (
                            proposal.travelExpenses.map((expense, idx) => (
                              <Box key={idx} mb={1}>
                                <Typography variant="body2">
                                  Description: {expense.description}
                                </Typography>
                                <Typography variant="body2">
                                  Total Cost: {expense.totalCost}
                                </Typography>
                              </Box>
                            ))
                          ) : (
                            <Typography variant="body2">
                              No travel expenses listed.
                            </Typography>
                          )}
                        </Box>

                        <Typography variant="body1">
                          Equipment Total: {proposal.equipmentTotal}
                        </Typography>
                        <Typography variant="body1">
                          Travel Total: {proposal.travelTotal}
                        </Typography>
                        <Typography variant="body1">
                          Grand Total: {proposal.grandTotal}
                        </Typography>
                        {proposal.comment ? (
                          <Typography variant="body1" mt={2}>
                            <b>Comment:</b> {proposal.comment}
                          </Typography>
                        ) : (
                          ""
                        )}
                      </Box>
                    </Collapse>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {selectedAction === "viewMember" && (
          <Card elevation={3} className="details-card">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <u>Club Members</u>
              </Typography>

              {/* Search Bar */}
              <TextField
                fullWidth
                label="Search by Email or Role"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                margin="normal"
              />

              <Box>
                {filteredMembers.map((member, index) => (
                  <Box key={index} marginBottom="1rem">
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight:
                          member.role === "faculty mentor" ? "bold" : "normal",
                      }}
                    >
                      {member.email} ({member.role})
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        )}

        {selectedAction === "addMember" && (
          <Card elevation={3} className="details-card">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Add Member
              </Typography>
              <form onSubmit={handleAddMemberSubmit}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Select Member</InputLabel>
                  <Select value={selectedUser} onChange={handleSelectChange}>
                    {guestUsers.length > 0 ? (
                      guestUsers.map((user) => (
                        <MenuItem key={user._id} value={user.email}>
                          {user.email} {/* Show email or user name */}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No guests available</MenuItem>
                    )}
                  </Select>
                </FormControl>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Add Member
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {selectedAction === "removeMember" && (
          <Card elevation={3} className="details-card">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Remove Member
              </Typography>
              <form onSubmit={handleRemoveMember}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Select Member</InputLabel>
                  <Select
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                  >
                    {removableMembers.length > 0 ? (
                      removableMembers.map((member) => (
                        <MenuItem key={member._id} value={member.email}>
                          {member.email} - {member.role}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No members available</MenuItem>
                    )}
                  </Select>
                </FormControl>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={removableMembers.length === 0} // Disable button if no members
                >
                  Remove
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {selectedAction === "changeRoles" && (
          <Card elevation={3} className="details-card">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Change Roles
              </Typography>
              <form onSubmit={handleRoleChangeSubmit}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Select Member</InputLabel>
                  <Select
                    value={selectMember}
                    onChange={(e) => setSelectMember(e.target.value)}
                  >
                    {removableMembers.length > 0 ? (
                      removableMembers.map((member) => (
                        <MenuItem key={member._id} value={member.email}>
                          {member.email} - {member.role}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No members available</MenuItem>
                    )}
                  </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Select New Role</InputLabel>
                  <Select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <MenuItem value="secretary">Secretary</MenuItem>
                    <MenuItem value="treasurer">Treasurer</MenuItem>
                    <MenuItem value="marketing & pr secretary">
                      Marketing & PR Secretary
                    </MenuItem>
                    <MenuItem value="web master">Web Master</MenuItem>
                    <MenuItem value="membership chair">
                      Membership Chair
                    </MenuItem>
                    <MenuItem value="management head">Management Head</MenuItem>
                    <MenuItem value="content & creative head">
                      Content & Creative Head
                    </MenuItem>
                    <MenuItem value="digital & social media head">
                      Digital & Social Media Head
                    </MenuItem>
                    <MenuItem value="member">Member</MenuItem>
                  </Select>
                </FormControl>

                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {selectedAction === "changeClubData" && (
          <Card elevation={3} className="details-card">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Change Club Data
              </Typography>

              <form>
                {/* Student Club/Chapter Name () */}
                <TextField
                  fullWidth
                  label="Student Club/Chapter Name"
                  margin="normal"
                  value={clubName.clubName}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <Box mt={4}>
                  <Typography variant="h6" gutterBottom>
                    Type
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <FormControlLabel
                        value="club"
                        control={<Radio />}
                        label="Club"
                      />
                      <FormControlLabel
                        value="chapter"
                        control={<Radio />}
                        label="Chapter"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <TextField
                  fullWidth
                  label="Faculty Coordinator Name"
                  margin="normal"
                  value={facultyCoordinator}
                  onChange={(e) => setFacultyCoordinator(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Student Chair"
                  margin="normal"
                  value={studentChair}
                  onChange={(e) => setStudentChair(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Student Co-Chair"
                  margin="normal"
                  value={studentCoChair}
                  onChange={(e) => setStudentCoChair(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="No. of Official Members"
                  margin="normal"
                  type="number"
                  value={officialMembers}
                  onChange={(e) => setOfficialMembers(e.target.value)}
                />

                <Typography>Club Logo</Typography>
                <ImageUpload onImageUpload={handleImageUpload} />

                <TextField
                  fullWidth
                  label="Club Website"
                  margin="normal"
                  value={clubWebsite}
                  onChange={(e) => setClubWebsite(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Club Email ID"
                  margin="normal"
                  value={clubEmail}
                  onChange={(e) => setClubEmail(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Instagram Handle"
                  margin="normal"
                  value={instagramHandle}
                  onChange={(e) => setInstagramHandle(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="LinkedIn Handle"
                  margin="normal"
                  value={linkedinHandle}
                  onChange={(e) => setLinkedinHandle(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Facebook Handle"
                  margin="normal"
                  value={facebookHandle}
                  onChange={(e) => setFacebookHandle(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Twitter Handle"
                  margin="normal"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Club Official's Pics, name, designation one PPTs/Pic/Poster"
                  margin="normal"
                  helperText="Provide a drive link"
                  value={officialPics}
                  onChange={(e) => setOfficialPics(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Club/Chapter Brief"
                  margin="normal"
                  multiline
                  rows={3}
                  value={chapterBrief}
                  onChange={(e) => setChapterBrief(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Mission"
                  margin="normal"
                  multiline
                  rows={3}
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                />

                <TextField
                  fullWidth
                  label="Vision"
                  margin="normal"
                  multiline
                  rows={3}
                  value={vision}
                  onChange={(e) => setVision(e.target.value)}
                />

                <Box mt={4}>
                  <Typography variant="h6" gutterBottom>
                    Edit Members
                  </Typography>
                  {/* Existing Members from DB */}
                  <Typography variant="h6" gutterBottom>
                    Existing Members
                  </Typography>
                  {memberName.map((member, index) => {
                    const isEditing = editedMembers.some(
                      (m) => m.email === member.email
                    );

                    return (
                      <Box key={index} sx={{ mb: 2, position: "relative" }}>
                        <Typography variant="subtitle1">
                          {member.name} - {member.position}
                        </Typography>

                        <TextField
                          fullWidth
                          label="Name"
                          margin="normal"
                          value={
                            isEditing
                              ? editedMembers.find(
                                  (m) => m.email === member.email
                                )?.name || member.name
                              : member.name
                          }
                          onChange={(e) =>
                            handleFieldChange(
                              member.email,
                              "name",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                        />

                        <TextField
                          fullWidth
                          label="Enrolment Number"
                          margin="normal"
                          value={
                            isEditing
                              ? editedMembers.find(
                                  (m) => m.email === member.email
                                )?.enrollmentId || member.enrollmentId // use enrollmentId here
                              : member.enrollmentId
                          }
                          onChange={(e) =>
                            handleFieldChange(
                              member.email,
                              "enrollmentId", // change to "enrollmentId"
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                        />

                        <TextField
                          fullWidth
                          label="Email ID"
                          margin="normal"
                          value={member.email}
                          disabled
                        />

                        <TextField
                          fullWidth
                          label="Position"
                          margin="normal"
                          value={
                            isEditing
                              ? editedMembers.find(
                                  (m) => m.email === member.email
                                )?.position || member.position
                              : member.position
                          }
                          onChange={(e) =>
                            handleFieldChange(
                              member.email,
                              "position",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                        />

                        {isEditing ? (
                          <ImageUpload
                            onImageUpload={(file) =>
                              handleImageUploadForEditedMember(
                                file,
                                member.email
                              )
                            }
                          />
                        ) : (
                          <>
                            <Typography
                              style={{ // Apply blur effect here
                                
                                color: "#b0b0b0", // Optional, to give a more subtle effect
                              }}
                            >
                              Uploaded Photo
                            </Typography>
                            {member.photo && (
                              <div>
                                <img
                                  src={member.photo}
                                  alt="Member"
                                  style={{
                                    maxWidth: "200px",
                                    marginTop: "10px",
                                  }}
                                />
                              </div>
                            )}
                          </>
                        )}

                        <IconButton onClick={() => handleEditMember(member)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteMember(member)}>
                          <DeleteIcon color="secondary" />
                        </IconButton>
                      </Box>
                    );
                  })}

                  {addMembers.map((member, index) => (
                    <Box key={index} sx={{ mb: 2, position: "relative" }}>
                      <Typography variant="subtitle1">
                        Member {index + 1}
                      </Typography>
                      <TextField
                        fullWidth
                        label="Name"
                        margin="normal"
                        value={member.name}
                        onChange={(e) => handleMemberChange(e, index, "name")}
                      />
                      <TextField
                        fullWidth
                        label="Enrolment Number"
                        margin="normal"
                        value={member.enrollmentId} // changed to enrollmentId
                        onChange={
                          (e) => handleMemberChange(e, index, "enrollmentId") // changed to enrollmentId
                        }
                      />
                      <TextField
                        fullWidth
                        label="Email ID"
                        margin="normal"
                        value={member.email}
                        onChange={(e) => handleMemberChange(e, index, "email")}
                      />
                      <TextField
                        fullWidth
                        label="Position"
                        margin="normal"
                        value={member.position}
                        onChange={(e) =>
                          handleMemberChange(e, index, "position")
                        }
                      />
                      <Typography>Member's Pic</Typography>
                      <ImageUpload
                        onImageUpload={(file) =>
                          handleImageUploadForMember(file, index)
                        }
                      />
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleRemoveData(index)}
                        sx={{ position: "absolute", top: 0, right: 0 }}
                      >
                        Remove Member
                      </Button>
                    </Box>
                  ))}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleAddMember}
                    startIcon={<AddIcon />}
                  >
                    Add Member
                  </Button>
                </Box>

                <Box mt={4}>
                  <Typography variant="h6" gutterBottom>
                    Existing Events
                  </Typography>
                  {events.map((event, index) => (
                    <Box key={event._id} sx={{ mb: 2, position: "relative" }}>
                      <Typography variant="subtitle1">
                        {event.eventName}
                      </Typography>

                      <TextField
                        fullWidth
                        label="Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        margin="normal"
                        value={event.date && event.date.split("T")[0]} // Ensure this is properly formatted
                        onChange={(e) => handleEventChange(e, index, "date")}
                        disabled={!event.isEditing} // Disable if not editing
                      />

                      <TextField
                        fullWidth
                        label="Name of Event"
                        margin="normal"
                        value={event.eventName}
                        onChange={(e) =>
                          handleEventChange(e, index, "eventName")
                        }
                        disabled={!event.isEditing} // Disable if not editing
                      />

                      <TextField
                        fullWidth
                        label="Internal/External"
                        margin="normal"
                        value={event.internalExternal}
                        onChange={(e) =>
                          handleEventChange(e, index, "internalExternal")
                        }
                        disabled={!event.isEditing} // Disable if not editing
                      />

                      <TextField
                        fullWidth
                        label="National/International"
                        margin="normal"
                        value={event.nationalInternational}
                        onChange={(e) =>
                          handleEventChange(e, index, "nationalInternational")
                        }
                        disabled={!event.isEditing} // Disable if not editing
                      />

                      <IconButton onClick={() => handleEditEvent(index)}>
                        <EditIcon />
                      </IconButton>

                      <IconButton onClick={() => handleDeleteEvent(event._id)}>
                        <DeleteIcon color="secondary" />
                      </IconButton>

                      {event.isEditing && (
                        <Button onClick={() => handleSaveEditEvent(index)}>
                          Save
                        </Button>
                      )}
                    </Box>
                  ))}

                  <Typography variant="h6" gutterBottom>
                    Add Events
                  </Typography>
                  {newEvents.map((event, index) => (
                    <Box key={index} sx={{ mb: 2, position: "relative" }}>
                      <TextField
                        fullWidth
                        label="Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        margin="normal"
                        value={event.date}
                        onChange={(e) => handleNewEventChange(e, index, "date")}
                      />
                      <TextField
                        fullWidth
                        label="Name of Event"
                        margin="normal"
                        value={event.eventName}
                        onChange={(e) =>
                          handleNewEventChange(e, index, "eventName")
                        }
                      />
                      <TextField
                        fullWidth
                        label="Internal/External"
                        margin="normal"
                        value={event.internalExternal}
                        onChange={(e) =>
                          handleNewEventChange(e, index, "internalExternal")
                        }
                      />
                      <TextField
                        fullWidth
                        label="National/International"
                        margin="normal"
                        value={event.nationalInternational}
                        onChange={(e) =>
                          handleNewEventChange(
                            e,
                            index,
                            "nationalInternational"
                          )
                        }
                      />
                      <Button onClick={() => handleRemoveNewEvent(index)}>
                        Remove Event
                      </Button>
                    </Box>
                  ))}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleAddEvent}
                    startIcon={<AddIcon />}
                  >
                    Add Event
                  </Button>
                </Box>

                <Box mt={4}>
                  <Typography variant="h6" gutterBottom>
                    Proposed event tentatively scheduled on
                  </Typography>
                  <TextField
                    fullWidth
                    label="Proposed Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    value={tentativeDate}
                    onChange={(e) => setTentativeDate(e.target.value)}
                  />
                </Box>

                <Box
                  mt={4}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitData}
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        )}
        <ActionCards selectedAction={selectedAction} />
        <BookedVenues selectedAction={selectedAction} />

        </div>
        </div>
        </div>
  );
};

export default ChairpersonPage;
