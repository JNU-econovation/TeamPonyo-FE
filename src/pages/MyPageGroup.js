import React, { useState, useEffect } from 'react';
import Profile from '../components/Profile';
import MyGridList from '../components/MyGridList';
import '../design/MyPageGrid.css';
import Follow from '../components/Follow';
import HorizonLine from '../components/HorizonLine';
import Members from '../components/Members'; // Members 컴포넌트 임포트
import '../design/MyPage.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useParams } from 'react-router';

const MyPageGroup = () => {
  const { userId } = useParams();
  const [profileInfo, setProfileInfo] = useState({ profile_image_url: '', nickname: "", login_id: "", introduction: "" });
  const [sortOrder, setSortOrder] = useState('LATEST'); // 정렬 기준 상태

  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await axiosInstance.get(`/api/v1/users/${userId}/profile`);
        setProfileInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch profile info:', error);
      }
    };

    fetchProfileInfo();
  }, [userId]);

  return (
    <div className="my-page-group">
      <div className="profile-container">
        <Profile
          ProfileImage={profileInfo.profile_image_url}
          Nickname={profileInfo.nickname}
          LoginId={profileInfo.login_id}
          Introduction={profileInfo.introduction}
        />
        <Follow UserId={userId} />
      </div>
      <HorizonLine />
      <div className="main-content">
        <div className="content-left">
          <div className="filter-buttons">
            <button onClick={() => setSortOrder('LATEST')} className={sortOrder === 'LATEST' ? 'active' : ''}>
              최신순
            </button>
            <button onClick={() => setSortOrder('POPULARITY')} className={sortOrder === 'POPULARITY' ? 'active' : ''}>
              인기순
            </button>
            <button onClick={() => setSortOrder('VISITED')} className={sortOrder === 'VISITED' ? 'active' : ''}>
              다녀온 전시
            </button>
            <button onClick={() => setSortOrder('SAVED')} className={sortOrder === 'SAVED' ? 'active' : ''}>
              저장한 전시
            </button>
          </div>
          <div className="MyPageContainer">
            <MyGridList sortOrder={sortOrder} />
          </div>
        </div>
        <div className="content-right">
          <Members groupId={userId} /> {/* Members 컴포넌트 추가 */}
        </div>
      </div>
    </div>
  );
}

export default MyPageGroup;
