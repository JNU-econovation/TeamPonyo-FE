import React, { useState, useRef } from 'react';
import './UploadPoster.css';

const UploadPoster = () => {
  const [uploadedPoster, setUploadedPoster] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedPoster(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='UploadPoster'>
      <div className='container' onClick={handleClick}>
        {uploadedPoster ? (
          <img
            src={URL.createObjectURL(uploadedPoster)}
            alt="Uploaded"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span>클릭하여 사진을 추가하세요</span>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          id="file-input"
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

export default UploadPoster;
