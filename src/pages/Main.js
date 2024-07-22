import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import GridList from '../components/GridList.js'
import Pagination from '../components/Pagination'
// import MainSlide from '../components/MainSlide'
import { SearchBox } from '../components/SearchBox'
import FilterBox from '../components/FilterBox'
import axiosInstance from '../api/axiosInstance'
import { gridData } from '../mokupData/infoData'
import './Main.css'

const Main = () => {

  const [pageCount, setPageCount] = useState(36) // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지
  const [data, setData] = useState([])  // 해당 페이지의 데이터
  const [filters, setFilters] = useState({  // 필터링
    teamId: null,
    sort: null,
    exhibitCategory: null,
    exhibitStatus: null,
  });
  const itemsPerPage = 16 // 페이지당 아이템 수


  // useEffect(() => {
  //   setData(gridData)
  // }, [gridData])

  useEffect(() => {
    // 현재 페이지에 해당하는 데이터를 서버에서 받아옴
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/exhibits', {
          params: {
            'team-id': filters.teamId,  // 특정 팀의 전시만 가져올 수 있다
            'number': itemsPerPage, // 가져올 전시 개수
            'page-number': currentPage, // 페이지네이션을 위한 값
            'sort': filters.sort, // 정렬 기준 선택
            'exhibit-category': filters.exhibitCategory, // 카테고리 필터링
            'exhibit-status': filters.exhibitStatus  // 전시 진행 상태 필터링
          }
        });
        setData(response.data.exhibits); // 실제 데이터 확인후 수정하기
        setPageCount(response.data.total_pages)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentPage, filters]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1)  // 페이지 번호에 따라 데이터 다시 가져옴
    window.scrollTo({ top: 0, behavior: 'smooth' });   // 스크롤 위치 맨 위로 이동
  }
  console.log(pageCount)

  const handleFiltersChange = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    setCurrentPage(1); // 필터가 변경될 때 첫 페이지로 리셋
  };

  console.log(filters)

  return (
    <div className='Main'>
      <SearchBox/>
      <Banner />
      <FilterBox onFiltersChange={handleFiltersChange} className='filterBoxContainer' />
      <GridList 
        data = {data}  // 데이터 전달
      />
      {pageCount >= 1 && (
        <Pagination
          pageCount={pageCount}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
      <div className='bottomSpace'></div>
    </div>
  )
}

export default Main