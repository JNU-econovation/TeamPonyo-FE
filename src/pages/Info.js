import React from 'react';
import { infoData } from '../mokupData/infoData';
import './Info.css'

const Info = () => {
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
                <div className='infoTitle'>{data.title}</div>
              </div>
              <div className='infoAuthor'>{data.author}</div>
              <div className='infoPlace'>장소 | {data.place}</div>
              <div className='infoPeriod'>기간 | {data.period}</div>
              <div className='infoTime'>시간 | {data.time}</div>
              <div className='infoPrice'>입장료 | {data.price}</div>
              <div className='infoAsk'>전시 문의 | {data.ask}</div>
              <div className='btnContainer'>
                <button>저장</button>
                <button>관람 완료</button>
              </div>
            </div>
          </div>
          <div className='infoDescriptionContainer'>
            <div className='descriptionTitle'>소개</div>
            <div className='descriptionBody'>{data.description}</div>
          </div>
          <div className='infoPhotoContainer'>
            {/* Add the image if needed */}
          </div>
          <div className='infoPlaceContainer'>
            <div className='infoPlaceTitle'>공간 정보</div>
            <div className='infoPlaceBody'>{data.place}</div>
            <div className='infoPlaceMap'>
              {/* You can add a map component here */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Info;
