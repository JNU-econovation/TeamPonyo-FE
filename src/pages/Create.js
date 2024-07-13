import React, { useState } from 'react';
import InfoDatePicker from '../components/InfoDatePicker';
import UploadPoster from '../components/exhibition/UploadPoster';
import './Create.css';

const Create = () => {
  // 각 입력 필드를 위한 상태 변수
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [fee, setFee] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedPoster, setUploadedPoster] = useState(null);



  return (
    <div className='Create'>
      <div className='topContainer'>
        <div className='uploadPoster'>
          <UploadPoster uploadedPoster={uploadedPoster} setUploadedPoster={setUploadedPoster} />
        </div>
        <div className='infoContainer'>
          <div className='informationContainer'>
            <div className='infoTitle'>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='전시 제목'
                className='infoTitleText'
              />
            </div>
            <div className='infoAuthor'>
              <input
                type='text'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder='주최'
                className='infoAuthorText'
              />
            </div>
            <div className='infoPlace'>
              장소
              <input
                type='text'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className='infoPeriod'>
              기간
              <input
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              ~
              <input
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className='infoTime'>
              시간
              <input
                type='time'
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              ~
              <input
                type='time'
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div className='infoPrice'>
              입장료
              <button>무료</button>
              <button>유료</button>
              <input
                type='text'
                value={fee}
                onChange={(e) => setFee(e.target.value)}
              />
            </div>
            <div className='infoAsk'>
              전시 문의
              <input
                type='text'
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className='infoCategory'>
              <div>카테고리 설정</div>
              <button>전시회</button>
              <button>공연</button>
              <button>공모전 및 대회</button>
              <button>기타</button>
            </div>
          </div>
        </div>
      </div>
      <div className='infoDescriptionContainer'>
        <div className='descriptionTitle'>소개</div>
        <div className='descriptionBody'>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='textarea' />
        </div>
      </div>
      <div className='infoPhotoContainer'>
        {/* 필요 시 이미지를 추가할 수 있습니다 */}
      </div>
      <div className='infoPlaceContainer'>
        <div className='infoPlaceTitle'>공간 정보</div>
        <div className='infoPlaceBody'></div>
        <div className='infoPlaceMap'>
          {/* 여기 지도 컴포넌트를 추가할 수 있습니다 */}
        </div>
      </div>
      <InfoDatePicker />
    </div>
  );
};

export default Create;
