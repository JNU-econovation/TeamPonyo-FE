import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import './AddMemberModal.css';

const AddMemberModal = ({ onClose, groupId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axiosInstance.get('/api/v1/accounts');
                setAccounts(response.data);
            } catch (error) {
                console.error('Failed to fetch accounts:', error);
            }
        };

        fetchAccounts();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredAccounts = accounts.filter(account =>
        account.nickname.includes(searchTerm) || account.login_id.includes(searchTerm)
    );

    const handleAddMember = async (userId) => {
        try {
            await axiosInstance.post(`/api/v1/groups/${groupId}/members`, { user_id: userId });
            onClose();
        } catch (error) {
            console.error('Failed to add member:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>사람 추가하기</h3>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>
                <input
                    type="text"
                    placeholder="닉네임 또는 아이디를 검색하세요."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
                <div className="account-list">
                    {filteredAccounts.map(account => (
                        <div key={account.user_id} className="account-item">
                            <img src={account.profile_image_url} alt={`${account.nickname}'s profile`} className="account-image" />
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
