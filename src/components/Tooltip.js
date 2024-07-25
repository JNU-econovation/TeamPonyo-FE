import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import './Tooltip.css';

const Tooltip = ({ member, onFollowUpdate }) => {
    const [isFollowing, setIsFollowing] = useState(member.followed);
    const accessToken = localStorage.getItem('access_token');

    const handleFollow = async () => {
        try {
            if (!isFollowing){
                await axiosInstance.post(`/api/v1/follows`, 
                    { followee_id: member.user_id },
                    {headers: {"Authorization": `Bearer ${accessToken}`}}
                );
                setIsFollowing(true);
            }else{
                await axiosInstance.delete(`/api/v1/follows`, 
                    {data: { followee_id: member.user_id },
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }}
                );
                setIsFollowing(false);
            }
            onFollowUpdate()
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    return (
        <div className="tooltip-content">
            <img src={member.profile_image_url} alt={`${member.nickname}'s profile`} className="tooltip-image" />
            <div className="tooltip-info">
                <h4>{member.nickname}</h4>
                <p>@{member.login_id}</p>
                <p>{member.introduction}</p>
            </div>
            {isFollowing ? (
                <button className="follow-button" onClick={handleFollow}>팔로잉</button>
            ) : (
                <button className="follow-button" onClick={handleFollow}>팔로우</button>
            )}
        </div>
    );
};

export default Tooltip;
