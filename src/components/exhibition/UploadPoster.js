import React, { useRef } from 'react';
import './UploadPoster.css';

const UploadPoster = ({ uploadedPoster, setUploadedPoster }) => {
  
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
          
          <div className='posterPlaceholder'>
            <div class="material-symbols-outlined posterPlaceholderIcon">photo_camera</div>
            <div className='posterPlaceholder posterPlaceholderText'>포스터를 추가해주세요</div>
          </div>
          
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
