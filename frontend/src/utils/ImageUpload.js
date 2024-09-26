import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid image (JPEG, PNG, GIF)');
        return;
      }
      setError('');
      setImage(URL.createObjectURL(file));
      onImageUpload(file); // Pass the file to the parent
    }
  };

  const handleClearImage = () => {
    setImage(null); // Reset the image state
    onImageUpload(null); // Notify the parent that the image has been cleared
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {image && (
        <div>
          <img src={image} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
          <button onClick={handleClearImage} style={{ display: 'block', marginTop: '10px' }}>
            Clear Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
