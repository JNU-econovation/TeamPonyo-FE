import React from 'react';
import './GridList.css'
import { ReactComponent as Arrow1 } from '../Arrow1.svg'

//TODO: 추후 백엔드 연결시 아래 더미데이터 지우고, 데이터 받아오기
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

//TODO: 하단 girdList -> gridList 오타 수정
const GridList = () => {
  return (
    <div className='gridList'>
      <div className='postGrid'>
        {/* 임의 데이터 */}
        {postList.map((item, index) => (
          <div key={index}>
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
