import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllClubs } from '../../services/clubService';

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

  if (!club) return <p>Loading...</p>;

  return (
    <div>
      <h1>{club.name}</h1>
      <p>{club.description}</p>

      <h3>Executive Committee</h3>
      <ul>
        <li>Chairperson: {club.executiveCommittee.chairperson}</li>
        <li>Vice Chair: {club.executiveCommittee.viceChair}</li>
        <li>Secretary: {club.executiveCommittee.secretary}</li>
        <li>Treasurer: {club.executiveCommittee.treasurer}</li>
        <li>Marketing & PR Secretary: {club.executiveCommittee.marketingPrSecretary}</li>
      </ul>

      {club.operationalCommittee.webMaster && (
        <>
          <h3>Operational Committee</h3>
          <ul>
            {club.operationalCommittee.webMaster && <li>Web Master: {club.operationalCommittee.webMaster}</li>}
            {club.operationalCommittee.membershipChair && <li>Membership Chair: {club.operationalCommittee.membershipChair}</li>}
            {club.operationalCommittee.managementHead && <li>Management Head: {club.operationalCommittee.managementHead}</li>}
            {club.operationalCommittee.contentCreativeHead && <li>Content & Creative Head: {club.operationalCommittee.contentCreativeHead}</li>}
            {club.operationalCommittee.digitalSocialMediaHead && <li>Digital & Social Media Head: {club.operationalCommittee.digitalSocialMediaHead}</li>}
          </ul>
        </>
      )}
    </div>
  );
};

export default ClubPage;
