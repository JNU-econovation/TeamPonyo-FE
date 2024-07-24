// import React, { useEffect, useState } from 'react';
// import './GridList.css'
// import { ReactComponent as Arrow1 } from '../Arrow1.svg'
// import { Link } from 'react-router-dom';

// //TODO: 추후 백엔드 연결시 아래 더미데이터 지우고, 데이터 받아오기


// //TODO: 하단 girdList -> gridList 오타 수정
// const GridList = ({ data }) => {

//     const getTag = (status) => {
//         if (status === "ONGOING") {
//           return '전시 중';
//         } else if (status === "BEFORE") {
//           return '진행 예정';
//         } else if (status === "AFTER") {
//           return '진행 완료';
//         }
//         return '';
//       };

    
//   return (
//     <div className='gridList'> 
//       <div className='postGrid'>
//         {/* 임의 데이터 */}
//         {data.map((item, index) => (
//           <div key={index}>
//             <Link to={`/info/${item.exhibit_id}`}>
//                 <div className='imageContainer'>
//                 <img src={item.poster_url} alt='포스터' className='gridListPoster' />
//                 {/* <img className='poster' src={item.path} alt='게시물'/> */}
//                 <div className='overlay'>
//                     <div>자세히 보기</div>
//                     <Arrow1 className='arrow'/>
//                     <div className='moreEn'>more</div>
//                 </div>
//                 </div>
//                 <div className='postInfo'>
//                 <div className='postTitle'>{item.title}</div>
//                 <div className='postPeriod'>{item.period}</div>
//                 <div className='postState'>{getTag(item.exhibit_status)}</div>
//                 </div>
//             </Link>
//         </div>
//         ))}
//       </div>
//     </div>
    
//   );
// }

// export default GridList;
import React from 'react';
import './GridList.css'
import { ReactComponent as Arrow1 } from '../Arrow1.svg'
import { Link } from 'react-router-dom';

// 기존 데이터 처리 및 오류 방지를 위한 코드 추가
const GridList = ({ data = [] }) => { // 기본값을 빈 배열로 설정

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
                {data.length > 0 ? ( // 데이터가 있을 때만 map 실행
                    data.map((item, index) => (
                        <div key={item.exhibit_id || index}> {/* exhibit_id가 없을 경우 index를 key로 사용 */}
                            <Link to={`/info/${item.exhibit_id}`}>
                                <div className='imageContainer'>
                                    <img src={item.poster_url} alt='포스터' className='gridListPoster' />
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
                    ))
                ) : (
                    <p>전시를 찾을 수 없습니다.</p> // 데이터가 없을 때 표시할 메시지
                )}
            </div>
        </div>
    );
}

export default GridList;
