import React, { useState, useEffect } from 'react';
import Members from '../components/Members';
import Profile from '../components/Profile';
import GridList from '../components/GridList.js';
import Pagination from '../components/Pagination';
import '../design/MyPageGrid.css';
import Follow from '../components/Follow';
import HorizonLine from '../components/HorizonLine';
import '../design/MyPage.css';
import axiosInstance from '../api/axiosInstance';
import { useParams } from 'react-router';

const MyPageGroup = () => {
  const { userId } = useParams();
  const [profileInfo, setProfileInfo] = useState({
    profile_image_url: '',
    nickname: '',
    login_id: '',
    introduction: '',
  });
  const [sortOrder, setSortOrder] = useState('LATEST'); // 정렬 기준 상태
  const [filterType, setFilterType] = useState('NONE'); // 필터 타입 상태
  const [pageCount, setPageCount] = useState(36); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [exhibitSummaries, setExhibitSummaries] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = '/api/v1/exhibits';
        if (filterType === 'SAVED') {
          endpoint = `/api/v1/users/${userId}/saved-exhibits`;
        } else if (filterType === 'VISITED') {
          endpoint = `/api/v1/users/${userId}/visited-exhibits`;
        }

        const response = await axiosInstance.get(endpoint, {
          params: {
            'team-id': userId,
            'number': 16,
            'page-number': currentPage,
            'sort': sortOrder,
          }
        });
        setExhibitSummaries(response.data.exhibits || []);
        setPageCount(response.data.total_pages || 1);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, sortOrder, filterType, userId]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (order) => {
    if (sortOrder !== order) {
      setSortOrder(order);
      setFilterType('NONE'); // 필터가 활성화되면 정렬 초기화
      setCurrentPage(1);
    }
  };

  const handleFilterChange = (type) => {
    if (filterType !== type) {
      setFilterType(type);
      setSortOrder('LATEST'); // 필터가 활성화되면 정렬 초기화
      setCurrentPage(1);
    }
  };

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
          <div className='filter-buttons'>
            <button
              onClick={() => handleSortChange('LATEST')}
              className={`filter-button ${sortOrder === 'LATEST' && filterType === 'NONE' ? 'active' : ''}`}
            >
              최신순
            </button>
            <button
              onClick={() => handleSortChange('POPULARITY')}
              className={`filter-button ${sortOrder === 'POPULARITY' && filterType === 'NONE' ? 'active' : ''}`}
            >
              인기순
            </button>
            <button
              onClick={() => handleFilterChange('SAVED')}
              className={`filter-button ${filterType === 'SAVED' ? 'active' : ''}`}
            >
              저장한 전시
            </button>
            <button
              onClick={() => handleFilterChange('VISITED')}
              className={`filter-button ${filterType === 'VISITED' ? 'active' : ''}`}
            >
              방문한 전시
            </button>
          </div>
          <GridList data={exhibitSummaries} />
          {pageCount >= 1 && (
            <Pagination
              pageCount={pageCount}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          )}
        </div>
        <div className="content-right">

          <Members 
            teamId={userId}
            nickname={profileInfo.nickname} 
          /> {/* Members 컴포넌트 추가 */}
        </div>
      </div>
    </div>
  );
}

export default MyPageGroup;
