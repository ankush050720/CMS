import React, { useState, useEffect } from "react";
import {
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
import "./AdminPage.css"; // Add appropriate styles
import Header from "../../components/AdminHeader/AdminHeader";
import {
  getProposal,
  updateProposalStatus,
  fetchMembers,
  addNewClub,
  removeClub,
  getAllUsers,
  addFaculty,
  getFaculties,
  removeFaculty,
} from "../../services/adminService";
import { getUserInfo } from "../../services/userService";
import { getAllClubs } from "../../services/clubService";
import RateEventPage from "../../pages/RateEventPage/RateEventPage";
import BookedVenues from "../../components/bookedVenues";

const AdminPage = () => {
  const [selectedAction, setSelectedAction] = useState("");
  const [email, setEmail] = useState("");
  // for proposal purposes
  const [proposals, setProposals] = useState([]);
  const [expandedProposalIndex, setExpandedProposalIndex] = useState(null);
  const [comment, setComment] = useState("");
  // for search
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState([]);
  //for adding clubs
  const [clubName, setClubName] = useState("");
  // for removing club
  const [clubs, setClubs] = useState([]);
  const [selectedClubToRemove, setSelectedClubToRemove] = useState(null);
  // for adding faculty 
  const [selectedClubToAddFaculty, setSelectedClubToAddFaculty] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  // for removing faculty
  const [selectedFacultyToRemove, setSelectedFacultyToRemove] = useState("");
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const facultyData = await getFaculties() ;
        setFaculties(facultyData);
      } catch (e) {
        console.error("Error fetching faculty :", e);
      }
    };
    fetchFaculty();
  },[]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const clubData = await getAllClubs();
        setClubs(clubData);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };
    fetchClubs();
  }, []);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const memberData = await fetchMembers();
        setMembers(memberData);
      } catch (error) {
        console.error("Error fetching club members:", error);
      }
    };
    getMembers();
    console.log(members);
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

  const handleProposalAction = async (proposalId, action, comment) => {
    try {
      console.log(comment);
      await updateProposalStatus(proposalId, action, comment);
      console.log(`Proposal ${action} successfully`);
    } catch (error) {
      console.error(`Failed to ${action} proposal:`, error);
    }
  };

  const handleToggleExpand = (index) => {
    setExpandedProposalIndex(expandedProposalIndex === index ? null : index);
  };

  const filteredMembers = members
    .map((clubObj) => {
      const clubName = clubObj.club; // Access the club name
      const membersInClub = clubObj.members; // Access the array of members

      // Apply filtering logic to each club's members
      const filteredMembersInClub = membersInClub.filter(
        (member) =>
          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.role.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Return a new object only if there are filtered members for this club
      return filteredMembersInClub.length > 0
        ? {
            club: clubName, // Ensure you use 'club' to store the club name
            members: filteredMembersInClub, // Filtered members
          }
        : null; // Return null if no members match
    })
    .filter(Boolean); // Filter out any null values

  const handleAddClub = async () => {
    const capitalizedClubName = clubName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    try {
      await addNewClub(capitalizedClubName);
      console.log(`Added New Club successfully`);
    } catch (error) {
      console.error("Failed to add club", error);
    }
  };

  const handleRemoveClub = async () => {
    try {
      await removeClub(selectedClubToRemove);
      console.log(`Removed Selected Club successfully`);

      // Remove the club from the local state
      setClubs((prevClubs) =>
        prevClubs.filter((club) => club._id !== selectedClubToRemove)
      );

      // Optionally reset the selected club
      setSelectedClubToRemove("");
    } catch (error) {
      console.error("Failed to remove club", error);
    }
  };

  const handleAddFacultySubmit = async() => {
    try {
      await addFaculty(selectedUser, selectedClubToAddFaculty);
      console.log(`Assigned Faculty Mentor successfully`);
    } catch (error) {
      console.error("Failed to assign faculty mentor", error);
    }
   };

  const handleRemoveFacultySubmit = async () => {
    try {
      await removeFaculty(selectedFacultyToRemove);

      setFaculties((prevFaculties) =>
        prevFaculties.filter((faculty) => faculty._id !== selectedFacultyToRemove) 
      );

      // Optionally reset the selected club
      setSelectedFacultyToRemove("");

      console.log(`Removed Faculty Mentor successfully`);
    } catch (error) {
      console.error("Failed to remove faculty mentor", error);
    }
  };

  return (
    <div className="admin-container">
      <Header email={email} />
      <Card elevation={3} className="mentor-card">
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Welcome, Admin!
          </Typography>

          <FormControl fullWidth>
            <InputLabel id="action-label">Select an Action</InputLabel>
            <Select
              labelId="action-label"
              value={selectedAction}
              onChange={handleActionChange}
            >
              <MenuItem value="reviewProposals">Review Proposals</MenuItem>
              <MenuItem value="checkBookedVenues">Check Booked Venues</MenuItem>
              <MenuItem value="rateEvent">Rate Event</MenuItem>
              <MenuItem value="viewMember">View Club Members</MenuItem>
              <MenuItem value="addClub">Add Club</MenuItem>
              <MenuItem value="removeClub">Remove Club</MenuItem>
              <MenuItem value="addFaculty">Assign Faculty Mentor</MenuItem>
              <MenuItem value="removeFaculty">Remove Faculty Mentor</MenuItem>
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

                      {proposal.status === "Accepted by the Faculty Member" && (
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
                      {(proposal.status === "Accepted by the Dean" || proposal.status === "Declined by the Dean" ) ? (
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
        <Card elevation={3} className="action-card">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              <u>Club Members</u>
            </Typography>

            <TextField
              fullWidth
              label="Search by Email or Role"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              margin="normal"
            />

            <Box>
              {filteredMembers.map((clubObj, index) => {
                const clubName = clubObj.club;
                const members = clubObj.members;

                return (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{ textTransform: "capitalize" }}
                    >
                      {clubName}
                    </Typography>

                    {members.map((member, idx) => (
                      <Typography
                        key={idx}
                        variant="body1"
                        sx={{
                          fontWeight:
                            member.role === "faculty mentor"
                              ? "bold"
                              : "normal",
                          mt: 1,
                        }}
                      >
                        {member.email} - {member.role}
                      </Typography>
                    ))}
                  </Box>
                );
              })}
            </Box>
          </CardContent>
        </Card>
      )}

      {selectedAction === "addClub" && (
        <Card elevation={3} className="action-card">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Add a new Club
            </Typography>
            <FormControl fullWidth margin="normal">
              <TextField
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                placeholder="Enter club name"
                inputProps={{
                  style: { textTransform: "capitalize" }, // Ensure input text is capitalized
                }}
              />
            </FormControl>
            <button
              variant="contained"
              color="secondary"
              onClick={handleAddClub}
            >
              Add Club
            </button>
          </CardContent>
        </Card>
      )}

      {selectedAction === "removeClub" && (
        <Card elevation={3} className="action-card">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Remove Club
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Club</InputLabel>
              <Select
                value={selectedClubToRemove}
                onChange={(e) => setSelectedClubToRemove(e.target.value)}
              >
                {clubs.map((club) => (
                  <MenuItem key={club._id} value={club._id}>
                    {club.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <button
              variant="contained"
              color="secondary"
              onClick={handleRemoveClub}
            >
              Remove Club
            </button>
          </CardContent>
        </Card>
      )}

      {selectedAction === "addFaculty" && (
        <Card elevation={3} className="action-card">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Add Faculty Mentor
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel>Select User</InputLabel>
              <Select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                {users.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.email} - {user.club ? user.club.name : "No club"} - {user.role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Select Club</InputLabel>
              <Select
                value={selectedClubToAddFaculty}
                onChange={(e) => setSelectedClubToAddFaculty(e.target.value)}
              >
                {clubs.map((club) => (
                  <MenuItem key={club._id} value={club._id}>
                    {club.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddFacultySubmit}
              disabled={!selectedClubToAddFaculty || !selectedUser}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      )}

      
      {selectedAction === "removeFaculty" && (
        <Card elevation={3} className="action-card">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Remove Faculty Mentor
            </Typography>
            <FormControl fullWidth margin="normal">
            <InputLabel>Select Faculty</InputLabel>
            <Select
             value={selectedFacultyToRemove}
             onChange={(e) => setSelectedFacultyToRemove(e.target.value)}
             >
              {faculties.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.email} - {user.club.name}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
            <button 
             variant="contained"
              color="primary"
              onClick={handleRemoveFacultySubmit}
              disabled={!selectedFacultyToRemove}
            >Remove Faculty</button>
          </CardContent>
        </Card>
      )}

      {selectedAction === "rateEvent" && (
            <Card elevation={3} className="action-card">
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Rate Event
                    </Typography>
                    <RateEventPage/>
                </CardContent>
            </Card>
          )
        }
        <BookedVenues selectedAction={selectedAction}/>
    </div>
  );
};

export default AdminPage;
