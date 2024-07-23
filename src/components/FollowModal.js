import React from 'react';
//import './FollowModal.css'; // FollowModal에 대한 스타일링

const FollowModal = ({ title, content, onClose }) => {
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
                                <p className="modal-introduction">{user.introduction}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <button className="modal-close-button" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default FollowModal;
