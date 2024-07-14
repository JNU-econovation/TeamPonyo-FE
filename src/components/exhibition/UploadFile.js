import React from 'react';
import './UploadFile.css';

const UploadFile = ({ selectedFiles, onFilesSelect }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    onFilesSelect(files);
  };

  return (
    <div className='UploadFile'>
      <input type="file" multiple onChange={handleFileChange} />
      <div className="filePreview">
        {selectedFiles.map((file, index) => (
          <div key={index} className="fileItem">
            <img 
              src={URL.createObjectURL(file)} 
              alt={`preview ${index}`} 
              className="fileImage" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadFile;
