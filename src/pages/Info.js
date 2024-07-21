import React, { useEffect, useState } from 'react';
import { infoData } from '../mokupData/infoData';
import './Info.css'
import Location from '../components/exhibition/Location';
import axiosInstance from '../api/axiosInstance';
import { useParams } from 'react-router';

const Info = () => {

    const { exhibit_id } = useParams();

    const [data, setData] = useState(null); 
    const [isSave, setIsSave] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [tag, setTag] = useState('');
    
    const accessToken = localStorage.getItem('access_token')


    console.log('accessToken: ', accessToken)
    console.log('exhibit_id: ', exhibit_id)



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/api/v1/exhibits/${exhibit_id}`);
                setData(response.data);
            } catch (error) {
                console.error('Fetch error: ', error);
            }
        };
        fetchData();
    }, [exhibit_id]);

    useEffect(() => {
        if (data) {  // data가 로드된 후에만 실행
            setIsSave(data.saved);  // data.saved가 존재할 때만 업데이트
            setIsCompleted(data.visited);  // data.visited가 존재할 때만 업데이트
            
            if (data.exhibit_status === "ONGOING") {
                setTag('전시 중');
            } else if (data.exhibit_status === "BEFORE") {
                setTag('진행 예정');
            } else if (data.exhibit_status === "AFTER") {
                setTag('진행 완료');
            }
        }
    }, [data]);

    const handleSave = async () => {
        try {
            if (!isSave) {  // 저장되지 않은 전시
                await axiosInstance.post('/api/v1/user/saved-exhibits', {'exhibit-id': exhibit_id}, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`  // Authorization 헤더 추가 (토큰 필요)
                    }
                });
            } else {    // 저장된 전시
                await axiosInstance.delete(`/api/v1/user/saved-exhibits/${exhibit_id}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`  // Authorization 헤더 추가 (토큰 필요)
                    }
                });
            }
            setIsSave(!isSave);  // 상태 토글
        } catch (error) {
            console.error('Save state error: ', error);
        }
    };

    const handleCompleted = async () => {
        try {
            if (!isCompleted) { // 관람하지 않은 전시
                await axiosInstance.post('/api/v1/user/visited-exhibits', {'exhibit-id': exhibit_id}, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`  // Authorization 헤더 추가 (토큰 필요)
                    }
                });
            } else {  // 관람한 전시
                await axiosInstance.delete(`/api/v1/user/visited-exhibits/${exhibit_id}`,{
                    headers: {
                        'Authorization': `Bearer ${accessToken}`  // Authorization 헤더 추가 (토큰 필요)
                    }
                });
            }
            setIsCompleted(!isCompleted);  // 상태 토글
        } catch (error) {
            console.error('Completed state error: ', error);
        }
    };

    if (!data) {
        return <div>Loading...</div>; // 데이터가 로딩 중일 때의 대체 UI
    }

    return (
        <div className='Info'>
            <div className='infoContainer'>
                <div className='topContainer'>
                    <div className='posterContainer'>
                        <img src={data.poster.base64_image} alt='포스터' />
                    </div>
                    <div className='informationContainer'>
                        <div className='infoTag'>{tag}</div>
                        <div className='infoTitleContainer'>
                            <div className='infoTitle infoItem'>
                                <div className='infoTitleText'>{data.title}</div>
                            </div>
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
                                onClick={handleSave}
                            >
                                저장
                            </div>
                            <div
                                className={`middleBtnGray ${isCompleted ? 'active' : ''}`}
                                onClick={handleCompleted}
                            >
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
