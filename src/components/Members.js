import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import './Members.css';
import AddMemberModal from './AddMemberModal';

const Members = ({ groupId }) => {
    const [members, setMembers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axiosInstance.get(`/api/v1/groups/${groupId}/members`);
                setMembers(response.data);
            } catch (error) {
                console.error('Failed to fetch members:', error);
            }
        };

        fetchMembers();
    }, [groupId]);

    const handleAddButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="members-header">
                <h2>속해있는 사람들</h2>
                <button className="add-member-button" onClick={handleAddButtonClick}>+</button>
            </div>
            <div className="members-container">
                {members.length > 0 ? (
                    members.map(member => (
                        <div key={member.user_id} className="member-item">
                            <img src={member.profile_image_url} alt={`${member.nickname}'s profile`} className="member-image" />
                        </div>
                    ))
                ) : (
                    <div className="no-members">멤버를 추가해보세요</div>
                )}
            </div>
            {isModalOpen && <AddMemberModal onClose={handleCloseModal} groupId={groupId} />}
        </div>
    );
};

export default Members;