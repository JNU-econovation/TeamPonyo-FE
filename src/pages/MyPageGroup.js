import React, { useState, useEffect} from 'react';
import Members from '../components/Members'; // Members 컴포넌트 임포트
import Profile from '../components/Profile';
import GridList from '../components/GridList.js'
import Pagination from '../components/Pagination'
import '../design/MyPageGrid.css';
import Follow from '../components/Follow';
import HorizonLine from '../components/HorizonLine';
import '../design/MyPage.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useParams } from 'react-router';

const MyPageGroup = () => {
  const { userId } = useParams();
  const [profileInfo, setProfileInfo] = useState({ profile_image_url: '', nickname: "", login_id: "", introduction: "" });
  const [sortOrder, setSortOrder] = useState('LATEST'); // 정렬 기준 상태
  const [pageCount, setPageCount] = useState(36) // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지
  const [exhibitSummaries, setExhibitSummaries] = useState([])

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/exhibits', {
          params: {
            'team-id':  userId,
            'number': 16,
            'page-number': currentPage,
            'sort': sortOrder,
          }
        });
        setExhibitSummaries(response.data.exhibits);
        setPageCount(response.data.total_pages)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  };
  fetchData();
}, [currentPage, sortOrder]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleFiltersChange = (sortOrder) => {
    setSortOrder(sortOrder);
    setCurrentPage(1);
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
            <button onClick={()=>handleFiltersChange('LATEST')} className={sortOrder === 'LATEST' ? 'active' : ''}>
              최신순
            </button>
            <button onClick={() => handleFiltersChange('POPULARITY')} className={sortOrder === 'POPULARITY' ? 'active' : ''}>
              인기순
            </button>
          </div>
          <GridList 
            data = {exhibitSummaries}  // 데이터 전달
          />
          {pageCount >= 1 && (
            <Pagination
              pageCount={pageCount}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          )}

        </div>

        <div className="content-right">
          <Members groupId={userId} /> {/* Members 컴포넌트 추가 */}
        </div>
      </div>
    </div>
  );
}

export default MyPageGroup;
