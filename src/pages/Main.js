import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import GridList from '../components/GridList'
import Pagination from '../components/Pagination'
// import MainSlide from '../components/MainSlide'
import { SearchBox } from '../components/SearchBox'


const Main = () => {

  const [pageCount, setPageCount] = useState(36) // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(0) // 현재 페이지
  const [data, setData] = useState([])  // 해당 페이지의 데이터
  const itemsPerPage = 16 // 페이지당 아이템 수

  useEffect(() => {
    // 서버에서 전체 페이지 수 받아옴
    const fetchPageCount = async () => {
      const response = await fetch('/api/getPageCount')
      const data = await response.json()
      setPageCount(data.pageCount)
    }
    fetchPageCount()
  }, [])

  useEffect(() => {
    // 현재 페이지에 해당하는 데이터를 서버에서 받아옴
    const fetchData = async () => {
      const response = await fetch(`/api/getData?page=${currentPage+1}&limit=${itemsPerPage}`)
      const data = await response.json()
      setData(data.items) // 실제 데이터 확인후 수정하기
    }
    fetchData()
  }, [currentPage])

  const handlePageChange = ({ selected }) => {

    // 페이지 번호에 따라 데이터 다시 가져옴
    setCurrentPage(selected)

    // 스크롤 위치 맨 위로 이동
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }
  console.log(pageCount)

  return (
    <div className='Main'>
      <SearchBox/>
      <Banner />
      <GridList 
        // data = {data}  // 데이터 전달
      />
      {pageCount > 1 && (
        <Pagination
          pageCount={pageCount}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
    </div>
  )
}

export default Main