// FileUpload.js
import React, { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf'];
      const maxSizeInBytes = 2 * 1024 * 1024;
      if (!validTypes.includes(file.type)) {
        setError('Please upload a valid PDF file.');
        return;
      }
      if (file.size > maxSizeInBytes) {
        setError('File size must be less than 2MB.');
        setFileName('');
        onFileUpload(null);
        return;
      }
      setError('');
      setFileName(file.name);
      onFileUpload(file);
    }
  };

  const handleClearFile = () => {
    setFileName('');
    onFileUpload(null);
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {fileName && (
        <div>
          <p>{fileName}</p>
          <button onClick={handleClearFile}>Clear File</button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
