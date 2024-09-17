import React, { useState, useEffect } from "react";
import {
  Container,
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { getUserInfo } from "../../services/userService";
import { getProposal } from "../../services/proposeService";
import {
  updateProposalStatus,
  addChairperson,
  getClubMembers,
} from "../../services/facultyMentorService";
import "./FacultyMentorPage.css"; // Add appropriate styles

const FacultyMentorPage = () => {
  const [selectedAction, setSelectedAction] = useState("");
  const [email, setEmail] = useState("");
  const [proposals, setProposals] = useState([]);
  const [expandedProposalIndex, setExpandedProposalIndex] = useState(null);
  const [clubMembers, setClubMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [comment, setComment] = useState("");

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

  const handleToggleExpand = (index) => {
    setExpandedProposalIndex(expandedProposalIndex === index ? null : index);
  };

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
  };

  const handleProposalAction = async (proposalId, action, comment) => {
    try {
      console.log(comment) ;
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

  return (
    <div className="faculty-mentor-container">
      <Card elevation={3} className="mentor-card">
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Welcome, Faculty Mentor!
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="action-label">Select an Action</InputLabel>
            <Select
              labelId="action-label"
              value={selectedAction}
              onChange={handleActionChange}
            >
              <MenuItem value="reviewProposals">Review Proposals</MenuItem>
              <MenuItem value="addChairperson">
                Add Chairperson/ViceChairperson
              </MenuItem>
              <MenuItem value="removeChairperson">
                Remove Chairperson/ViceChairperson
              </MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {selectedAction === "reviewProposals" && (
        <Card elevation={3} className="action-card">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Review Proposals
            </Typography>
            {proposals.map((proposal, index) => (
              <Card
                elevation={3}
                className="action-card"
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
                          justifyContent="space-around"
                        >
                          <TextField
                            fullWidth
                            label="Comment"
                            margin="normal"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            sx= {{display: 'block'}}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              handleProposalAction(proposal._id, "accept" , comment)
                            }
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              handleProposalAction(proposal._id, "decline", comment)
                            }
                          >
                            Decline
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Collapse>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}

      {selectedAction === "addChairperson" && (
        <Card elevation={3} className="action-card">
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
        <Card elevation={3} className="action-card">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Remove Chairperson/ViceChairperson
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FacultyMentorPage;
