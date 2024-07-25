import React, { useState, useEffect } from 'react';
import './FollowModal.css'; // FollowModal에 대한 스타일링

const FollowModal = ({ initialTab, followers, followings, onClose }) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const content = activeTab === 'followers' ? followers : followings;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button 
                        className={`tab-button ${activeTab === 'followers' ? 'active' : ''}`} 
                        onClick={() => handleTabClick('followers')}
                    >
                        팔로워
                    </button>
                    <button 
                        className={`tab-button ${activeTab === 'followings' ? 'active' : ''}`} 
                        onClick={() => handleTabClick('followings')}
                    >
                        팔로잉
                    </button>
                    <button className="modal-close-button" onClick={onClose}>×</button>
                </div>
                <ul className="modal-content">
                    {content.map((user) => (
                        <li key={user.user_id} className="modal-item">
                            <img src={user.profile_image_url} alt={`${user.nickname}'s profile`} className="modal-profile-image" />
                            <div className="modal-profile-details">
                                <span className="modal-nickname">{user.nickname}</span>
                                <span className="modal-login-id">@{user.login_id}</span>
                                <p className="modal-introduction">{user.introduction}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FollowModal;
