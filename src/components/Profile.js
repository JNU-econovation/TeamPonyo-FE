import React from 'react';
import './Profile.css'; 

const Profile = ({ ProfileImage, Nickname, LoginId, Introduction }) => {
  const profileData = {
    profileImage: ProfileImage,
    nickname: Nickname,
    Id: LoginId,
    introduction: Introduction
  };

  const { profileImage, nickname, Id, introduction } = profileData;

  return (
    <div className="profile">
      <img 
        src={profileImage} 
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