import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import './Members.css';
import AddMemberModal from './AddMemberModal';
import Tooltip from './Tooltip';
import { Link } from 'react-router-dom'

const Members = ({ teamId, nickname, onFollowUpdate }) => {
    const accessToken = localStorage.getItem('access_token');

    const [members, setMembers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const loginUserId = localStorage.getItem('login_user_id');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axiosInstance.get(`/api/v1/teams/${teamId}/members`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setMembers(response.data);
            } catch (error) {
                console.error('Failed to fetch members:', error);
            }
        };

        fetchMembers();
    }, [teamId]);

    const handleAddButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleMemberAdded = (newMember) => {
        setMembers(prevMembers => [...prevMembers, newMember]);
    };

    return (
        <div>
            <div className="members-header">
                <h3>속해있는 사람들</h3>
                {loginUserId == teamId ? <button className="add-member-button" onClick={handleAddButtonClick}>+</button> :
                <></>
                }
            </div>
            <div className="members-container">
                {members.length > 0 ? (
                    members.map(member => (
                        <div key={member.user_id} className="member-item">
                            <Link to={`/mypagegroup/${member.user_id}`}> <img src={member.profile_image_url} alt={`${member.nickname}'s profile`} className="member-image" /> </Link>
                            
                            <Tooltip member={member} onFollowUpdate={onFollowUpdate} />
                        </div>
                    ))
                ) : (
                    <div className="no-members">멤버를 추가해보세요</div>
                )}
            </div>
            {isModalOpen && <AddMemberModal onClose={handleCloseModal} teamId={teamId} nickname={nickname} onMemberAdded={handleMemberAdded}/>}
        </div>
    );
};

export default Members;
