import React from 'react'
import InfoDatePicker from '../components/InfoDatePicker'
import UploadPoster from '../components/exhibition/UploadPoster'
import './Create.css'

const Create = () => {
  return (
    <div className='Create'>
        <div>
          <UploadPoster />
          <div className='infoContainer'>
            <div className='informationContainer'>
              <div className='infoTitle'>전시 제목</div>
              <div className='infoAuthor'>주최</div>
              <div className='infoPlace'>장소 | </div>
              <div className='infoPeriod'>기간 | </div>
              <div className='infoTime'>시간 | </div>
              <div className='infoPrice'>입장료 | </div>
              <div className='infoAsk'>전시 문의 | </div>
              <div className='btnContainer'>
                <button>저장</button>
                <button>관람 완료</button>
              </div>
            </div>
            <div className='infoDescriptionContainer'>
              <div className='descriptionTitle'>소개</div>
              <div className='descriptionBody'></div>
            </div>
            <div className='infoPhotoContainer'>
              {/* Add the image if needed */}
            </div>
            <div className='infoPlaceContainer'>
              <div className='infoPlaceTitle'>공간 정보</div>
              <div className='infoPlaceBody'></div>
              <div className='infoPlaceMap'>
                {/* You can add a map component here */}
              </div>
            </div>
          </div>
        </div>
        

        <InfoDatePicker />
    </div>
  )
}

export default Create