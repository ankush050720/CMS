import { uploadImageToCloudinary } from './cloudinaryImageUpload'; // Image Upload
import { uploadFileToCloudinary } from './cloudinaryFileUpload'; // File Upload

// Handling file upload
const handleFileChange = async (e) => {
  const file = e.target.files[0];
  let fileUrl = '';
  
  if (file.type.startsWith('image/')) {
    fileUrl = await uploadImageToCloudinary(file); // For images
  } else {
    fileUrl = await uploadFileToCloudinary(file); // For other files (PDFs, documents)
  }

  console.log('File uploaded: ', fileUrl);
};
