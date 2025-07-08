// cloudinaryFileUpload.js
import axios from 'axios';

const CLOUDINARY_RAW_URL = 'https://api.cloudinary.com/v1_1/dsailrfh1/raw/upload'; // For raw file uploads
const CLOUDINARY_PRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

export const uploadFileToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_PRESET);

  try {
    const response = await axios.post(CLOUDINARY_RAW_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: false, // Adjust this based on your needs
    });

    return response.data.secure_url; // Return the secure URL of the uploaded file
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('File upload failed');
  }
};
