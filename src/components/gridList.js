import React from 'react';
import './GridList.css'

const postList = [
  {
    title: "2021 홍익대 미대 전시회",
    period: "2021.12.06 (목)",
    state: "전시중",
    path: "http://homa.hongik.ac.kr/data/boarddata/ex_main_114309.jpg"
  },
  {
    title: "2021 홍익대 미대 전시회",
    period: "2021.12.06 (목)",
    state: "전시중",
    path: "http://homa.hongik.ac.kr/data/boarddata/ex_main_114309.jpg"
  },
  {
    title: "2021 홍익대 미대 전시회",
    period: "2021.12.06 (목)",
    state: "전시중",
    path: "http://homa.hongik.ac.kr/data/boarddata/ex_main_114309.jpg"
  },
  {
    title: "2021 홍익대 미대 전시회",
    period: "2021.12.06 (목)",
    state: "전시중",
    path: "http://homa.hongik.ac.kr/data/boarddata/ex_main_114309.jpg"
  },
  {
    title: "2021 홍익대 미대 전시회",
    period: "2021.12.06 (목)",
    state: "전시중",
    path: "http://homa.hongik.ac.kr/data/boarddata/ex_main_114309.jpg"
  },
  {
    title: "2021 홍익대 미대 전시회",
    period: "2021.12.06 (목)",
    state: "전시중",
    path: "http://homa.hongik.ac.kr/data/boarddata/ex_main_114309.jpg"
  },
];

const GridList = () => {
  return (
    <div className='girdList'>
      <div className='postGrid'>
      {postList.map((item, index) => (
        <div key={index}>
          <img className='poster' src={item.path} alt='게시물'/>
          <div className='postInfo'>
            <div className='postTitle'>{item.title}</div>
            <div className='postPeriod'>{item.period}</div>
            <div className='postState'>{item.state}</div>
          </div>
          
      </div>
      ))}
    </div>
    </div>
    
  );
}

export default GridList;
