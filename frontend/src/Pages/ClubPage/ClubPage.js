import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllClubs } from '../../services/clubService';
import { Container, Typography, List, ListItem, Divider } from '@mui/material';
import './ClubPage.css'; // Import the CSS file

const ClubPage = () => {
  const { clubName } = useParams();
  const [club, setClub] = useState(null);

  useEffect(() => {
    const fetchClub = async () => {
      const clubs = await getAllClubs();
      const foundClub = clubs.find(club => club.name.replace(/\s+/g, '-').toLowerCase() === clubName);
      setClub(foundClub);
    };
    fetchClub();
  }, [clubName]);

  if (!club) return <Typography variant="h6">Loading...</Typography>;

  return (
    <Container className="club-page-container">
      <Typography variant="h2" gutterBottom>
        {club.name}
      </Typography>
      <Typography variant="body1" paragraph>
        {club.description}
      </Typography>

      <Typography variant="h4" gutterBottom>
        Executive Committee
      </Typography>
      <List>
        <ListItem>Chairperson: {club.executiveCommittee.chairperson}</ListItem>
        <ListItem>Vice Chair: {club.executiveCommittee.viceChair}</ListItem>
        <ListItem>Secretary: {club.executiveCommittee.secretary}</ListItem>
        <ListItem>Treasurer: {club.executiveCommittee.treasurer}</ListItem>
        <ListItem>Marketing & PR Secretary: {club.executiveCommittee.marketingPrSecretary}</ListItem>
      </List>

      {club.operationalCommittee.webMaster && (
        <>
          <Typography variant="h4" gutterBottom>
            Operational Committee
          </Typography>
          <List>
            {club.operationalCommittee.webMaster && <ListItem>Web Master: {club.operationalCommittee.webMaster}</ListItem>}
            {club.operationalCommittee.membershipChair && <ListItem>Membership Chair: {club.operationalCommittee.membershipChair}</ListItem>}
            {club.operationalCommittee.managementHead && <ListItem>Management Head: {club.operationalCommittee.managementHead}</ListItem>}
            {club.operationalCommittee.contentCreativeHead && <ListItem>Content & Creative Head: {club.operationalCommittee.contentCreativeHead}</ListItem>}
            {club.operationalCommittee.digitalSocialMediaHead && <ListItem>Digital & Social Media Head: {club.operationalCommittee.digitalSocialMediaHead}</ListItem>}
          </List>
        </>
      )}
    </Container>
  );
};

export default ClubPage;
