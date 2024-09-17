import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  IconButton,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { getUserInfo } from "../../services/userService";
import Header from "../../components/Header/Header";
import { submitProposal, getProposal } from "../../services/proposeService";
import EventPage from "../EventPage/EventPage";
import {
  fetchClubMembers,
  getUsers,
  addMember,
  getRemovableMembers,
  removeMember,
  changeRole
} from "../../services/memberService";

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
  const [selectMember, setSelectMember] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

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

  return (
    <Container maxWidth="md" className="page-container">
      <Header email={email} />

      <Box textAlign="center" py={4}>
        <Typography variant="h4" gutterBottom>
          Welcome, Chairperson!
        </Typography>
      </Box>

      <Box textAlign="center" mb={4}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="action-label">Select an action</InputLabel>
          <Select
            labelId="action-label"
            value={selectedAction}
            onChange={handleActionChange}
            label="Select an action"
            className="selector"
          >
            <MenuItem value="">
              <em>Select an action</em>
            </MenuItem>
            <MenuItem value="proposeEvent">Propose Event</MenuItem>
            <MenuItem value="viewProposals">View All Proposals</MenuItem>
            <MenuItem value="viewMember">View Members</MenuItem>
            <MenuItem value="addMember">Add Member</MenuItem>
            <MenuItem value="removeMember">Remove Member</MenuItem>
            <MenuItem value="changeRoles">Change Roles</MenuItem>
            <MenuItem value="changeClubData">Change Club Data</MenuItem>
            <MenuItem value="addEvent">Add New Event</MenuItem>
            <MenuItem value="registerInEvent">Register For Event</MenuItem>
            <MenuItem value="closeRegistration">Close Registration</MenuItem>
            <MenuItem value="closeEvent">Mark Event as Complete</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box className="card-container">
        {selectedAction === "proposeEvent" && (
          <Card elevation={3} className="action-card" sx={{ width: '100%', maxWidth: 1000, mb: 2 }}>
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
                  <Typography variant="h5" mt={2}>
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
          <Card elevation={3} className="action-card" sx={{ width: '100%', maxWidth: 1000, mb: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                View All Proposals
              </Typography>
              {proposals.map((proposal, index) => (
                <Card
                  elevation={3}
                  className="action-card"
                  key={proposal._id}
                  style={{ margin: "10px 0" , width: '100%', maxWidth: 1000, mb: 2 }}
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
                        {
                          proposal.comment ? 
                          (<Typography variant="body1" mt ={2}>
                          <b>Comment:</b> {proposal.comment}
                        </Typography>) :
                        (""
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
          <Card elevation={3} className="action-card" sx={{ width: '100%', maxWidth: 1000, mb: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                <u>Club Members</u>
              </Typography>

              <Box>
                {members.map((member, index) => (
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
          <Card elevation={3} className="action-card" sx={{ width: '100%', maxWidth: 1000, mb: 2 }}>
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
          <Card elevation={3} className="action-card" sx={{ width: '100%', maxWidth: 1000, mb: 2 }}>
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
          <Card elevation={3} className="action-card" sx={{ width: '100%', maxWidth: 1000, mb: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Change Roles
              </Typography>
              <form onSubmit={handleRoleChangeSubmit}>
                <FormControl fullWidth sx= {{mb:2}}>
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

                <FormControl fullWidth sx = {{mb:3}}>
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
          <Card elevation={3} className="action-card" sx={{ width: '100%', maxWidth: 1000, mb: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Change Club Data
              </Typography>
            </CardContent>
          </Card>
        )}

        {selectedAction === "addEvent" && (
          <Card elevation={3} className="action-card" sx={{ width: '100%', maxWidth: 1000, mb: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Add New Event
              </Typography>
            </CardContent>
          </Card>
        )}

        {selectedAction === "registerInEvent" && (
          <Card elevation={3} className="action-card" sx={{ width: '100%', maxWidth: 1000, mb: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Register For Event
              </Typography>
              <EventPage />
            </CardContent>
          </Card>
        )}

        {selectedAction === "closeRegistration" && (
          <Card elevation={3} className="action-card" sx={{ width: '100%', maxWidth: 1000, mb: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Close Registration
              </Typography>
            </CardContent>
          </Card>
        )}

        {selectedAction === "closeEvent" && (
          <Card elevation={3} className="action-card" sx={{ width: '100%', maxWidth: 1000, mb: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Mark Event as Complete
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default ChairpersonPage;
