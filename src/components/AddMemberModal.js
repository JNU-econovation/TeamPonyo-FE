import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import './AddMemberModal.css';

const AddMemberModal = ({ onClose, nickname}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [accounts, setAccounts] = useState([]);
    const accessToken = localStorage.getItem('access_token');

    const handleSearch = async (e) => {
        setSearchTerm(e.target.value);
        if (e.key === 'Enter') {
            try {
                const response = await axiosInstance.get('/api/v1/users/search', {
                    params: {
                        'nickname-or-login-id': searchTerm
                    }
                });
                setAccounts(response.data);
            } catch (error) {
                console.error('Error searching accounts:', error);
            }
        }
    };

    const handleAddMember = async (userId) => {
            try {
                const response = await axiosInstance.post('/api/v1/team/member', {invitee_id: userId}, {headers: {
                    Authorization: `Bearer ${accessToken}`
                }});
            } catch (error) {
                console.error('Error searching accounts:', error);
            }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>{nickname}에 사람 추가하기</h3>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <input
                    type="text"
                    placeholder="닉네임 또는 아이디를 검색하세요."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearch}
                    className="search-input"
                    autoFocus
                />
                <div className="account-list">
                    {accounts.map(account => (
                        <div key={account.user_id} className="account-item">
                            <img src={account.profile_image_url} alt={`Profile of ${account.nickname}`} className="account-image" />
                            <div className="account-info">
                                <span className="nickname">{account.nickname}</span>
                                <span className="login-id">{account.login_id}</span>
                            </div>
                            <button className="add-button" onClick={() => handleAddMember(account.user_id)}>+</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AddMemberModal;
