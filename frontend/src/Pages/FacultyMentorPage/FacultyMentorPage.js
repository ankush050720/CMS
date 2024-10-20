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
} from "@mui/material";
import { 
  Assignment as AssignmentIcon, 
  Event as EventIcon, 
  Star as StarIcon, 
  Group as GroupIcon, 
  Add as AddIcon, 
  Visibility as VisibilityIcon, 
  Delete as DeleteIcon, 
  PersonAdd as PersonAddIcon, 
  PersonRemove as PersonRemoveIcon 
} from '@mui/icons-material'; // Material-UI icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { getUserInfo } from "../../services/userService";
import { getProposal } from "../../services/proposeService";
import {
  updateProposalStatus,
  addChairperson,
  getClubMembers, // used for add chaiperson
  getClubLeaders,
  removeClubLeader,
} from "../../services/facultyMentorService";
import { fetchClubMembers } from "../../services/memberService"; // used for member fetching
import styles from "./FacultyMentorPage.module.css"; // Add appropriate styles
import Header from "../../components/AdminHeader/AdminHeader";
import RateEventPage from "../../pages/RateEventPage/RateEventPage";
import BookedVenues from "../../components/bookedVenues";
import ChatButton from "../../components/ChatButton";
import EventsRegistry from "../../components/eventsRegistry";

const FacultyMentorPage = () => {
  const [selectedAction, setSelectedAction] = useState("");
  const [email, setEmail] = useState("");
  const [proposals, setProposals] = useState([]);
  const [expandedProposalIndex, setExpandedProposalIndex] = useState(null);
  const [clubMembers, setClubMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [comment, setComment] = useState("");
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [clubLeaders, setClubLeaders] = useState({
    chairperson: null,
    viceChairperson: null,
  });

  useEffect(() => {
    const fetchClubLeaders = async () => {
      try {
      const data = await getClubLeaders() ;
      setClubLeaders({
        chairperson: data.chairperson,
        viceChairperson: data.viceChairperson,
      });
      } catch (error) {
        console.error("Error fetching club leaders:", error);
      }
    };
    fetchClubLeaders();
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

  useEffect(() => {
    const fetchClubMembers = async () => {
      try {
        const response = await getClubMembers();
        console.log(response);
        setClubMembers(response.data);
      } catch (err) {
        console.error("Failed to fetch club members:", err);
      }
    };

    fetchClubMembers();
  }, []);

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

  const handleToggleExpand = (index) => {
    setExpandedProposalIndex(expandedProposalIndex === index ? null : index);
  };

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  const handleProposalAction = async (proposalId, action, comment) => {
    try {
      console.log(comment);
      await updateProposalStatus(proposalId, action, comment);
      console.log(`Proposal ${action} successfully`);
    } catch (error) {
      console.error(`Failed to ${action} proposal:`, error);
    }
  };

  const handleAddChairpersonSubmit = async () => {
    try {
      const response = await addChairperson({
        role: selectedRole,
        memberId: selectedMember,
      });

      if (response.data.error) {
        alert(response.data.error);
      } else {
        alert("Role updated successfully!");
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveLeader = async (userId, role) => {
    try {
      // Call the remove function to delete the leader
      await removeClubLeader(userId, role);
  
      // Update the state to remove the leader by setting it to null
      setClubLeaders((prevLeaders) => {
        const updatedLeaders = { ...prevLeaders };
  
        // Check if the role is chairperson or vicechairperson and remove accordingly
        if (role === "chairperson") {
          updatedLeaders.chairperson = null;
        } else if (role === "vicechairperson") {
          updatedLeaders.viceChairperson = null;
        }
  
        return updatedLeaders;
      });
    } catch (error) {
      console.error("Error removing leader:", error);
    }
  };

  return (
    <div className={styles["dashboard-container"]}>
      <div className={styles.sidebar}>
        <Typography variant="h6" gutterBottom>
          Faculty Mentor Dashboard
        </Typography>
        <Divider />
        <MenuList>
          <MenuItem onClick={() => setSelectedAction("reviewProposals")}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Review Proposals" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("checkBookedVenues")}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Check Booked Venues" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("rateEvent")}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Rate Event" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("checkEventsRegistry")}>
            <ListItemIcon>
              <VisibilityIcon />
            </ListItemIcon>
            <ListItemText primary="Events Registry" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("viewMember")}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="View Club Members" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("addChairperson")}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Chair/ViceChair" />
          </MenuItem>
          <MenuItem onClick={() => setSelectedAction("removeChairperson")}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Remove Chair/ViceChair" />
          </MenuItem>
        </MenuList>
      </div>
        <div className={styles["dashboard-body"]} >
        <Header email = {email} className={styles["facultyMentorPage-header"]} />
      <div className={styles["dashboard-content"]} >
      
        <Card elevation={3} className={styles["welcome-card"]} >
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Welcome, Faculty Mentor!
            </Typography>
          </CardContent>
          <ChatButton />
        </Card>

        <Grid container spacing={2} className={styles["action-grid"]}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className={styles["action-card"]}
              onClick={() => setSelectedAction("reviewProposals")}
            >
              <CardContent>
                <Typography variant="h6">Review Proposals</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className={styles["action-card"]}
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
              className={styles["action-card"]}
              onClick={() => setSelectedAction("rateEvent")}
            >
              <CardContent>
                <Typography variant="h6">Rate Event</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className={styles["action-card"]}
              onClick={() => setSelectedAction("checkEventsRegistry")}
            >
              <CardContent>
                <Typography variant="h6">Events Registry</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className={styles["action-card"]}
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
              className={styles["action-card"]}
              onClick={() => setSelectedAction("addChairperson")}
            >
              <CardContent>
                <Typography variant="h6">Add Chairperson/ViceChairperson</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              elevation={3}
              className={styles["action-card"]}
              onClick={() => setSelectedAction("removeChairperson")}
            >
              <CardContent>
                <Typography variant="h6">Remove Chairperson/ViceChairperson</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {selectedAction === "reviewProposals" && (
        <Card elevation={3} className={styles["details-card"]}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Review Proposals
            </Typography>
            {proposals.map((proposal, index) => (
              <Card
                elevation={3}
                className={styles["details-card"]}
                key={proposal._id}
                style={{ margin: "10px 0", width: "100%" }}
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
                      {/* Proposal Details */}
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
                        Expected Participation: {proposal.expectedParticipation}
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

                      {proposal.status === "Pending" && (
                        <Box
                          mt={2}
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          <Box mb={2} width="100%" maxWidth="800px">
                            <TextField
                              fullWidth
                              label="Comment"
                              margin="normal"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              sx={{ width: "100%" }}
                            />
                          </Box>

                          <Box
                            display="flex"
                            justifyContent="space-around"
                            flexWrap="wrap"
                            gap={2}
                            width="100%" // Ensures the buttons stay within the container width
                            maxWidth="800px"
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() =>
                                handleProposalAction(
                                  proposal._id,
                                  "accept",
                                  comment
                                )
                              }
                              sx={{ flex: "1 1 150px" }}
                            >
                              Accept
                            </Button>

                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() =>
                                handleProposalAction(
                                  proposal._id,
                                  "decline",
                                  comment
                                )
                              }
                              sx={{ flex: "1 1 150px" }}
                            >
                              Decline
                            </Button>
                          </Box>
                        </Box>
                      )}
                      {proposal.status !== "Pending"  ? (
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
        <Card elevation={3} className={styles["details-card"]}>
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

      {selectedAction === "addChairperson" && (
        <Card elevation={3} className={styles["details-card"]}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Add ChairPerson/ViceChairperson
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel>Select Role</InputLabel>
              <Select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <MenuItem value="chairperson">Chairperson</MenuItem>
                <MenuItem value="vicechairperson">ViceChairperson</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Select Member</InputLabel>
              <Select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
              >
                {clubMembers.map((member) => (
                  <MenuItem key={member._id} value={member._id}>
                    {member.email} - {member.role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddChairpersonSubmit}
              disabled={!selectedRole || !selectedMember}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      )}

      {selectedAction === "removeChairperson" && (
        <Card elevation={3} className={styles["details-card"]}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Remove Chairperson/Vice Chairperson
            </Typography>

            {clubLeaders.chairperson && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="body1">
                  <b>Chairperson:</b> {clubLeaders.chairperson.email}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    handleRemoveLeader(
                      clubLeaders.chairperson._id,
                      "chairperson"
                    )
                  }
                >
                  Remove Chairperson
                </Button>
              </Box>
            )}

            {clubLeaders.viceChairperson && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body1">
                  <b>Vice Chairperson:</b> {clubLeaders.viceChairperson.email}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    handleRemoveLeader(
                      clubLeaders.viceChairperson._id,
                      "vicechairperson"
                    )
                  }
                >
                  Remove Vice Chairperson
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {selectedAction === "rateEvent" && (
            <Card elevation={3} className={styles["details-card"]}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Rate Event
                    </Typography>
                    <RateEventPage/>
                </CardContent>
            </Card>
          )
        }
        <BookedVenues className={styles["details-card"]} selectedAction={selectedAction}/>
        <EventsRegistry className={styles["details-card"]} selectedAction={selectedAction} role={"faculty mentor"}/>
        </div>
      </div>
      </div>
  );
};

export default FacultyMentorPage;