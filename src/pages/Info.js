import React, { useEffect, useState } from 'react';
import { infoData } from '../mokupData/infoData';
import './Info.css'
import Location from '../components/exhibition/Location';
import axiosInstance from '../api/axiosInstance';

const Info = () => {

    const [isSave, setIsSave] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [tag, setTag] = useState('')
    // const [data, setData] = useState(null)

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axiosInstance.get('/api/v1/exhibits/{exhibit-id}')
    //             setData(response.data)
    //         } catch(error) {
    //             console.error('Fetch error: ', error)
    //         }
    //     }
    //     fetchData()
    // }, [])

    const data = infoData

    console.log(data.exhibit_status)

    useEffect(() => {
        console.log("setTag useEffect 호출")
        if (data.exhibit_status === "ONGOING") {
            setTag('전시 중')
        } else if (data.exhibit_status === "BEFORE") {
            setTag('진행 예정')
        } else if (data.exhibit_status === "AFTER") {
            setTag('진행 완료')
        }
    }, [data])

    useEffect(() => {
        console.log("태그 상태:", tag); // 상태 변경 후 상태 확인
    }, [tag]);

    if (!data) {
        return <div>Loading...</div>; // 데이터가 로딩 중일 때의 대체 UI
    }

  return (
    <div className='Info'>
        <div className='infoContainer'>
            <div className='topContainer'>
            <div className='posterContainer'>
                {/* <img src={data.poster_url} alt='포스터' /> */}
                <img src={data.poster.base64_image} alt='포스터' />
            </div>
            <div className='informationContainer'>
                <div className='infoTag'>{tag}</div>
                <div className='infoTitleContainer'>
                <div className='infoTitle infoItem'><div className='infoTitleText'>{data.title}</div></div>
                </div>
                <div className='infoAuthor'>작성자</div>
                <div className='infoPlace infoItem'>장소  |  {data.address}</div> 
                <div className='infoPeriod infoItem'>기간  |  {data.period}</div>
                <div className='infoTime infoItem'>시간  |  {data.open_times}</div>
                <div className='infoPrice infoItem'>입장료  |  {data.fee}</div>
                <div className='infoAsk infoItem'>전시 문의  |  {data.contact}</div>
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
            <div className='infoMapContainer'>
            <div className='infoPlaceTitle'>공간 정보</div>
            <div className='infoPlaceBody'>{data.address}</div>
            <div className='infoPlaceMap'>
                {/* 공간정보 카카오맵 */}
                <Location address={data.address} position={data.position} />
            </div>
            </div>
        </div>
    </div>
  );
};

export default Info;
