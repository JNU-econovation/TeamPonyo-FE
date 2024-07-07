import React from 'react'

const Info = () => {
  return (
    <div className='Info'>
        <div className='infoContainer'>
            <div className='posterContainer'></div>
            <div className='informationContainer'>
                <div className='infoTag'></div>
                <div className='infoTitleContainer'>
                    <div className='infoTitle'></div>
                </div>
                <div className='infoAuthor'></div>
                <div className='infoPlace'>장소 | {}</div>
                <div className='infoPeriod'>기간 | </div>
                <div className='infoTime'>시간 | </div>
                <div className='infoPrice'>입장료 | </div>
                <div className='infoAsk'>전시 문의 | </div>
                <div className='btnContainer'>
                    <button>저장</button>
                    <button>관람 완료</button>
                </div>
            </div>
        </div>
        <div className='infoDescriptionContainer'>
            <div className='descriptionTitle'>소개</div>
            <div className='descriptionBody'></div>
        </div>
        <div className='infoPhotoContainer'>

        </div>
        <div className='infoPlaceContainer'>
            <div className='infoPlaceTitle'>공간 정보</div>
            <div className='infoPlaceBody'></div>
            <div className='infoPlaceMap'></div>
        </div>

    </div>
  )
}

export default Info