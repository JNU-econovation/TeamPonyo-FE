import React, { useEffect, useState } from 'react';
import './Follow.css'
import axiosInstance from '../api/axiosInstance';

const Follow = ({ UserId }) => {
    const accessToken = localStorage.getItem('access_token');
    const [followInfo, setFollowInfo] = useState({ follower_number: 0, following_number: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState([]);
    const [modalTitle, setModalTitle] = useState('');

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

    const fetchModalContent = async (type) => {
        try {
            const response = await axiosInstance.get(`/api/v1/users/${UserId}/${type}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );
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
                <div className="FollowingNumber" onClick={() => fetchModalContent('following')}>
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
                <Modal title={modalTitle} content={modalContent} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};

const Modal = ({ title, content, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>{title}</h2>
                <ul>
                    {content.map((user) => (
                        <li key={user.user_id}>
                            <img src={user.profile_image_url} alt={`${user.nickname}'s profile`} className="modal-profile-image" />
                            <div className="modal-profile-details">
                                <span className="modal-nickname">{user.nickname}</span>
                                <span className="modal-login-id">@{user.login_id}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <button className="modal-close-button" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default Follow;
