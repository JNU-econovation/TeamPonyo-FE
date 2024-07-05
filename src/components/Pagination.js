import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';

const Pagination = ({ pageCount, onPageChange, currentPage }) => {
  const [pageRange, setPageRange] = useState({ start: 0, end: 9 });

  useEffect(() => {
    const newStart = Math.floor(currentPage / 10) * 10;
    const newEnd = Math.min(newStart + 9, pageCount - 1);
    setPageRange({ start: newStart, end: newEnd });
  }, [currentPage, pageCount]);

  // 화면에 표시될 버튼 번호 배열
  const getPageRange = () => {
    const pages = [];
    for (let i = pageRange.start; i <= pageRange.end; i++) {
      pages.push(i);
    }
    return pages;
  };

  // 사용자가 클릭한 페이지 번호에 따라 페이지 범위 업데이트
  const handlePageClick = (selectedPage) => {
    if (selectedPage < pageRange.start) {
      // 현재 페이지기 배열의 시작일때 이전 버튼을 누르면, 이전 10개 페이지 범위로 업데이트
      setPageRange({ start: pageRange.start - 10, end: pageRange.end - 10 });
    } else if (selectedPage > pageRange.end) {
      // 현재 페이지가 배열의 끝일때 다음 버튼을 누르면, 다음 10개 페이지 범위로 업데이트
      setPageRange({ start: pageRange.start + 10, end: pageRange.end + 10 });
    }
    onPageChange({ selected: selectedPage });
  };

  return (
    <ul className="pagination">
      <li
        className={`items previous-item ${currentPage === 0 ? 'disabled' : ''}`}
        onClick={() => currentPage > 0 && handlePageClick(currentPage - 1)}
      >
        {'<'}
      </li>
      {getPageRange().map(page => (
        <li
          key={page}
          className={`items page-item ${page === currentPage ? 'active' : ''}`}
          onClick={() => handlePageClick(page)}
        >
          {page + 1}
        </li>
      ))}
      <li
        className={`items next-item ${currentPage === pageCount - 1 ? 'disabled' : ''}`}
        onClick={() => currentPage < pageCount - 1 && handlePageClick(currentPage + 1)}
      >
        {'>'}
      </li>
    </ul>
  );
};

export default Pagination;
