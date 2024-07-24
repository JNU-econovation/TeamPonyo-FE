import React, { useState, useEffect, useRef} from 'react';
import axiosInstance from '../api/axiosInstance'
import { useParams } from 'react-router';

import './Profile.css';

const Profile = ({ ProfileImage, Nickname, LoginId, Introduction, IsMe }) => {
  const [isEditing, setIsEditing] = useState(false);
  const {userId} = useParams();
  const loginUserId = localStorage.getItem('login_user_id')
  const [introduction, setIntroduction] = useState(Introduction);
  const accessToken = localStorage.getItem('access_token');
  const handleInputChange = (e) => {
    setIntroduction(e.target.value);
  };

  useEffect(() => {
    if (userId == loginUserId && !introduction){

    }
    setIntroduction(Introduction);
  }, [Introduction]);

  const handleInputKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      try {
        await axiosInstance.patch('/api/v1/user/introduction', 
          {introduction: introduction},
          {headers: {
              'Authorization': `Bearer ${accessToken}`
          }}
        );
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update introduction:', error);
      }
    }
  };

  const handleIntroductionClick = () => {
      setIsEditing(true);
  };


  return (
    <div className="profile">
      {/* vw:100; wh:100 position:absolute */}
      <img 
        src={ProfileImage} 
        alt="Profile" 
        className="profile-image"
      />
      <div className="profile-details">
        <h2 className="nickname">{Nickname}</h2>
        <p className="id">@{LoginId}</p>
        <div className='introduction-container'>
          {isEditing ? (
            <input
              type="text"
              value={introduction}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
              className="introduction-input"
              placeholder="소개를 입력해주세요."
              autoFocus
            />
          ) : (
            (userId == loginUserId) ?
              ((introduction)? (<p className="introduction" onClick={handleIntroductionClick}> {introduction} </p>): 
              <input
              type="text"
              onClick={handleIntroductionClick}
              className="introduction-input"
              placeholder="소개를 입력해주세요."
            />
            )
               :
              (<div className="static-introduction"> {introduction || ""} </div> )
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;