import React, { useEffect, useState } from 'react';
import './Follow.css';
import axiosInstance from '../api/axiosInstance';
import FollowModal from './FollowModal'; // FollowModal 컴포넌트를 import

const Follow = ({ UserId, FollowInfo, onFollowUpdate }) => {
    const accessToken = localStorage.getItem('access_token');
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ followers: [], followings: [] });
    const [initialTab, setInitialTab] = useState('followers');

    const handleFollowButtonClick = async () => {
        try {
            if (FollowInfo.followed) {
                await axiosInstance.delete('/api/v1/follows', {
                    data: { followee_id: UserId },
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
            } else {
                await axiosInstance.post('/api/v1/follows', {
                    followee_id: UserId
                }, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
            }

            onFollowUpdate();
        } catch (error) {
            console.error('Failed to update follow status:', error);
        }
    };

    

    const fetchModalContent = async (type) => {
        try {
            const followersResponse = await axiosInstance.get(`/api/v1/users/${UserId}/followers`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const followingsResponse = await axiosInstance.get(`/api/v1/users/${UserId}/followings`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setModalContent({
                followers: followersResponse.data,
                followings: followingsResponse.data
            });
            setInitialTab(type);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Failed to fetch follow lists:', error);
        }
    };

    return (
        <div className="follow-details">
            <div className="follow-info">
                <div className="FollowerNumber" onClick={() => fetchModalContent('followers')}>
                    팔로워 <strong>{FollowInfo.follower_number}</strong>
                </div>
                <div className="FollowingNumber" onClick={() => fetchModalContent('followings')}>
                    팔로잉 <strong>{FollowInfo.following_number}</strong>
                </div>
            </div>
            {FollowInfo.followed !== undefined && (
                <button
                    className={`follow-button ${FollowInfo.followed ? 'active' : 'inactive'}`}
                    onClick={handleFollowButtonClick}
                >
                    {FollowInfo.followed ? '팔로잉' : '팔로우'}
                </button>
            )}
            {isModalOpen && (
                <FollowModal 
                    initialTab={initialTab}
                    followers={modalContent.followers} 
                    followings={modalContent.followings} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </div>
    );
};

export default Follow;
