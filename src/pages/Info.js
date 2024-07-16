import React, { useState } from 'react';
import { infoData } from '../mokupData/infoData';
import './Info.css'

const Info = () => {

    const [isSave, setIsSave] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)

  return (
    <div className='Info'>
      {infoData.map((data, index) => (
        <div className='infoContainer' key={index}>
          <div className='topContainer'>
            <div className='posterContainer'>
              <img src={data.poster} alt='포스터' />
            </div>
            <div className='informationContainer'>
              <div className='infoTag'>{data.status}</div>
              <div className='infoTitleContainer'>
                <div className='infoTitle infoItem'><div className='infoTitleText'>{data.title}</div></div>
              </div>
              <div className='infoAuthor'>{data.author}</div>
              <div className='infoPlace infoItem'>장소  |  {data.place}</div> 
              <div className='infoPeriod infoItem'>기간  |  {data.period}</div>
              <div className='infoTime infoItem'>시간  |  {data.time}</div>
              <div className='infoPrice infoItem'>입장료  |  {data.price}</div>
              <div className='infoAsk infoItem'>전시 문의  |  {data.ask}</div>
              <div className='infoBtnContainer'>
                <div
                    className={`middleBtnGray ${isSave ? 'active' : ''}`}
                    onClick={() => setIsSave(!isSave)}>
                    저장
                </div>
                <div
                    className={`middleBtnGray ${isCompleted ? 'active' : ''}`}
                    onClick={() => setIsCompleted(!isCompleted)}>
                    관람완료
                </div>
              </div>
            </div>
          </div>
          <div className='infoDescriptionContainer'>
            <div className='descriptionTitle'>소개</div>
            <div className='descriptionBody'>{data.description}</div>
          </div>
          <div className='infoPhotoContainer'>
            {/* 첨부된 사진들 불러올 곳 */}
          </div>
          <div className='infoPlaceContainer'>
            <div className='infoPlaceTitle'>공간 정보</div>
            <div className='infoPlaceBody'>{data.place}</div>
            <div className='infoPlaceMap'>
              {/* 공간정보 카카오맵 */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Info;
