import React, { useEffect, useState } from 'react';
import './Follow.css'
import axiosInstance from '../api/axiosInstance';

const Follow = ({UserId}) => {
    const accessToken = localStorage.getItem('access_token');
    const [followInfo, setFollowInfo] = useState({follower_number: 0, following_number: 0});
    const handleFollowButtonClick = async () => {
        try {
            if (followInfo.followed) {
                await axiosInstance.delete('/api/v1/follows', {
                    data: { followee_id: UserId },
                    headers: {
                        'Authorization': `Bearer ${accessToken}`  // Authorization 헤더 추가 (토큰 필요)
                    }
                });
            } else {
                await axiosInstance.post('/api/v1/follows', {
                    followee_id: UserId
                }, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`  // Authorization 헤더 추가 (토큰 필요)
                    }
                });
            }
        
            setFollowInfo((prev)=>({
                ...prev,
                follower_number: prev.follower_number + (followInfo.followed ? -1 : 1),
                followed: !followInfo.followed
            }))
        } catch (error) {
            console.error('Failed to update follow status:', error);
        }
    };

    useEffect(() => {
        const fetchFollowInfo = async () => {
          try {
            const response = await axiosInstance.get(`/api/v1/users/${UserId}/follow-info`, 
              {
                headers: {
                    'Authorization': `Bearer ${accessToken}`  // Authorization 헤더 추가 (토큰 필요)
                  }
              }
            );
            setFollowInfo(response.data);
          } catch (error) {
            console.error('Failed to fetch follow info:', error);
          }
        };
    
        fetchFollowInfo();
      }, [UserId]);
    
    return (
        <div className="follow-details">
            <div className="follow-info">
                <div className="FollowerNumber">
                    팔로워 <strong>{followInfo.follower_number}</strong>
                </div>
                <div className="FollowingNumber">
                    팔로잉 <strong>{followInfo.following_number}</strong>
                </div>
        </div>
        {followInfo.followed !== undefined && (
                <button
                    className={`follow-button ${followInfo.followed ? 'active' : 'inactive'}`}
                    onClick={handleFollowButtonClick}
                >
                    {followInfo.followed ? '팔로잉' : '팔로우'}
                </button>
        )}
        </div>
    );
}

export default Follow;

 