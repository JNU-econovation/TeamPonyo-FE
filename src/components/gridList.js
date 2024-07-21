import React, { useEffect, useState } from 'react';
import './GridList.css'
import { ReactComponent as Arrow1 } from '../Arrow1.svg'

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
            <div className='imageContainer'>
              <img src={item.poster.base64_image} alt='포스터' />
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
        </div>
        ))}
        {/* 아래 내용 넣을 때 GridList에 변수 data 추가하기, 아래 코드 변수명 변경 ({ data }) */}
        {/* 데이터 받아오기
        { data.map(item => (
          <div key={item.id} className='gridItem'>
            <div className='imageContainer'>
              <img className='poster' src={item.path} alt='게시물'/>
              <div className='overlay'>
                <div>자세히 보기</div>
                <Arrow1 className='arrow'/>
                <div className='moreEn'>more</div>
              </div>
            </div>
            <div className='postInfo'>
              <div className='postTitle'>{item.title}</div>
              <div className='postPeriod'>{item.period}</div>
              <div className='postState'>{item.state}</div>
            </div>
          </div>
        )) } */}
      </div>
    </div>
    
  );
}

export default GridList;



// import React from 'react';

// const GridList = ({ data }) => {
//   return (
//     <div className='GridList'>
//       {data.map((exhibit) => (
//         <div key={exhibit.exhibit_id} className='exhibit'>
//           <img src={`data:${exhibit.poster.mime_type};base64,${exhibit.poster.base64_image}`} alt={exhibit.title} />
//           <h3>{exhibit.title}</h3>
//           <p>{exhibit.period}</p>
//           <p>상태: {exhibit.exhibit_status}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GridList;

