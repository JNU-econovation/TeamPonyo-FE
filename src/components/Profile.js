import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; 

const Profile = ({ userId }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/${userId}/profile`);
        setProfileData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const defaultImage = process.env.PUBLIC_URL + '/defaultProfile.png';

  return (
    <div className="profile">
      <img 
        src={profileData.profileImage || defaultImage} 
        alt="Profile" 
        className="profile-image"
      />
      <div className="profile-details">
        <h2 className="nickname">{profileData.nickname}</h2>
        <p className="id">@{profileData.Id}</p>
        <p className="introduction">{profileData.introduction}</p>
      </div>
    </div>
  );
}

export default Profile;
