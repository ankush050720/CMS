import React from 'react';
import { useParams } from 'react-router-dom';

const ClubPage = () => {
  const { clubName } = useParams();

  return (
    <div>
      <h1>{clubName.replace(/-/g, ' ')}</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
      </p>
    </div>
  );
};

export default ClubPage;