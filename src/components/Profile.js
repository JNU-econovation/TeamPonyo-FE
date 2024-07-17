import React from 'react';
import './Profile.css'; 

const Profile = ({ profileImage, nickname, Id, introduction }) => {
  const defaultImage = process.env.PUBLIC_URL + '/defaultProfile.png';

  return (
    <div className="profile">
      <img 
        src={profileImage || defaultImage} 
        alt="Profile" 
        className="profile-image"
      />
      <div className="profile-details">
        <h2 className="nickname">{nickname}</h2>
        <p className="id">@{Id}</p>
        <p className="introduction">{introduction}</p>
      </div>
    </div>
  );
}

export default Profile;
