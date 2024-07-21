import React from 'react';
import './Profile.css'; 

const Profile = ({ userId }) => {
  const mockProfileData = {
    profileImage: process.env.PUBLIC_URL + '/econoLogo.png',
    nickname: "ECONOVATION",
    Id: "econovation",
    introduction: "전남대학교 IT 개발 동아리 에코노베이션입니다."
  };

  const { profileImage, nickname, Id, introduction } = mockProfileData;

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
