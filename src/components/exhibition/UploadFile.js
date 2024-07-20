import React from 'react';
import './UploadFile.css';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 파일 크기 5MB 제한

const UploadFile = ({ selectedFiles, onFilesSelect }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter(file => {
        if (file.size > MAX_FILE_SIZE) {
          alert(`${file.name} 파일이 너무 큽니다. 5MB 이하의 파일만 업로드해주세요.`);
          return false;
        }
        // if (!file.type.startsWith('image/')) {
        //   alert(`${file.name} 파일은 이미지 파일이 아닙니다. 이미지 파일만 업로드해주세요.`);
        //   return false;
        // }
        return true;
      });

    onFilesSelect(validFiles);
  };

  return (
    <div className='UploadFile'>
      <input type="file" id="fileUpload" multiple onChange={handleFileChange} className='fileInput' accept='image/*' />
      <label htmlFor="fileUpload" className="middleBtn">파일</label>
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
