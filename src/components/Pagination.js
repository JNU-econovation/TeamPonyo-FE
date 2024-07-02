import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={'<'}
      nextLabel={'>'}
      pageCount={pageCount}
      marginPagesDisplayed={0}
      pageRangeDisplayed={10}
      onPageChange={onPageChange}
      containerClassName={'pagination'}
      activeClassName={'active'}
      previousClassName={'previous-item'}
      nextClassName={'next-item'}
    />
  );
}

export default Pagination;
