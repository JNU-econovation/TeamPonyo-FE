import React from 'react';
import './GridList.css';
import { ReactComponent as Arrow1 } from '../Arrow1.svg';

const MyGridList = ({ data }) => {
  const getTag = (status) => {
    if (status === "ONGOING") {
      return '전시 중';
    } else if (status === "BEFORE") {
      return '진행 예정';
    } else if (status === "AFTER") {
      return '진행 완료';
    }
    return '';
  };

  return (
    <div className='gridList'>
      <div className='postGrid'>
        {data.map((item, index) => (
          <div key={index} className='gridItem'>
            <div className='imageContainer'>
              <img 
                src={`data:${item.poster.mime_type};base64,${item.poster.base64_image}`} 
                alt='포스터' 
                className='poster' 
              />
              <div className='overlay'>
                <div>자세히 보기</div>
                <Arrow1 className='arrow'/>
                <div className='moreEn'>more</div>
              </div>
            </div>
            <div className='postInfo'>
              <div className='postTitle'>{item.title}</div>
              <div className='postPeriod'>{item.period}</div>
              <div className='postState'>{getTag(item.exhibit_status)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyGridList;
