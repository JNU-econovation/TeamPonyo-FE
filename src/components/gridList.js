import React, { useEffect, useState } from 'react';
import './GridList.css'
import { ReactComponent as Arrow1 } from '../Arrow1.svg'
import { Link } from 'react-router-dom';

//TODO: 추후 백엔드 연결시 아래 더미데이터 지우고, 데이터 받아오기


//TODO: 하단 girdList -> gridList 오타 수정
const GridList = ({ data }) => {

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
        {/* 임의 데이터 */}
        {data.map((item, index) => (
          <div key={index}>
            <Link to={`/info/${item.exhibit_id}`}>
                <div className='imageContainer'>
                <img src={item.poster_url} alt='포스터' className='gridListPoster' />
                {/* <img className='poster' src={item.path} alt='게시물'/> */}
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
            </Link>
        </div>
        ))}
      </div>
    </div>
    
  );
}

export default GridList;
