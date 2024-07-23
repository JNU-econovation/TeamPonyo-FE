import React, { useEffect, useState } from 'react';
import './Follow.css';
import axiosInstance from '../api/axiosInstance';
import FollowModal from './FollowModal'; // FollowModal 컴포넌트를 import

const Follow = ({ UserId }) => {
    const accessToken = localStorage.getItem('access_token');
    const [followInfo, setFollowInfo] = useState({ follower_number: 0, following_number: 0, followed: false });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState([]);
    const [modalTitle, setModalTitle] = useState('');

    const handleFollowButtonClick = async () => {
        try {
            if (followInfo.followed) {
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

            setFollowInfo((prev) => ({
                ...prev,
                follower_number: prev.follower_number + (followInfo.followed ? -1 : 1),
                followed: !followInfo.followed
            }));
        } catch (error) {
            console.error('Failed to update follow status:', error);
        }
    };

    const fetchFollowInfo = async () => {
        try {
            const response = await axiosInstance.get(`/api/v1/users/${UserId}/follow-info`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setFollowInfo(response.data);
        } catch (error) {
            console.error('Failed to fetch follow info:', error);
        }
    };

    const fetchModalContent = async (type) => {
        try {
            const response = await axiosInstance.get(`/api/v1/users/${UserId}/${type}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setModalContent(response.data);
            setModalTitle(type === 'followers' ? '팔로워' : '팔로잉');
            setIsModalOpen(true);
        } catch (error) {
            console.error(`Failed to fetch ${type} list:`, error);
        }
    };

    useEffect(() => {
        fetchFollowInfo();
    }, [UserId]);

    return (
        <div className="follow-details">
            <div className="follow-info">
                <div className="FollowerNumber" onClick={() => fetchModalContent('followers')}>
                    팔로워 <strong>{followInfo.follower_number}</strong>
                </div>
                <div className="FollowingNumber" onClick={() => fetchModalContent('followings')}>
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
            {isModalOpen && (
                <FollowModal title={modalTitle} content={modalContent} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};

export default Follow;
