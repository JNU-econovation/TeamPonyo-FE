import React from 'react'
import './FilterBox.css'

const FilterBox = ({ onFiltersChange }) => {
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        onFiltersChange({ [name]: value });
      };

  return (
    <div className='FilterBox'>
        <select name='exhibitStatus' onChange={handleFilterChange} className='filtercontainer'>
            <option value=''>기간</option>
            <option value='BEFORE'>전시 예정</option>
            <option value='ONGOING'>진행 중</option>
            <option value='AFTER'>진행 완료</option>
        </select>
    </div>
  )
}

export default FilterBox