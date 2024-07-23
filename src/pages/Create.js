import React, { useEffect, useRef, useState } from 'react';
import UploadPoster from '../components/exhibition/UploadPoster';
import './Create.css';
import axiosInstance from '../api/axiosInstance';
import UploadFile from '../components/exhibition/UploadFile';
import  '../components/exhibition/exhibitionCommon.css';
import Location from '../components/exhibition/Location';
import { useNavigate } from 'react-router';

const Create = () => {
  const [data, setData] = useState({
    title: '',
    category: '',
    author: '',
    address: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    fee: '',
    contact: '',
    description: '',
    poster: null,
    photos: [],
    position: { lat: 33.450701, lng: 126.570667 }
  });

  const [isFree, setIsFree] = useState(null);
  const [isOnline, setIsOnline] = useState(null)
  const [roadAddress, setRoadAddress] = useState('')
  const [detailAddress, setDetailAddress] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false);

  const refs = {
    title: useRef(null),
    category: useRef(null),
    author: useRef(null),
    address: useRef(null),
    startDate: useRef(null),
    endDate: useRef(null),
    startTime: useRef(null),
    endTime: useRef(null),
    fee: useRef(null),
    contact: useRef(null),
    description: useRef(null),
    poster: useRef(null),
  };


  const navigate = useNavigate()



  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    if (isSubmit) validateFields({ ...data, [name]: value });
  };

  const handlePosterChange = (file) => {
    setData({
      ...data,
      poster: file,
    });
    if (isSubmit) validateFields({ ...data, poster: file });
  };

  const handleFilesSelect = (files) => {
    setData({
      ...data,
      photos: [...data.photos, ...files],
    });
  };

  const handleFeeChange = (feeType) => {
    if (feeType === '무료') {
      setIsFree(true);
      setData({
        ...data,
        fee: '',
      });
    } else {
      setIsFree(false);
      setData({
        ...data,
        fee: '',
      });
    }
    if (isSubmit) validateFields({ ...data, fee: ''})
  };

  const handleOnlineChange = (type) => {
    if (type == '온라인') { 
      setIsOnline(true)
      setRoadAddress('')
      setDetailAddress('')
      setData({
        ...data,
        address: ''
      })
    } else {  // 주소 찾기 (오프라인)
      setIsOnline(false)
      openAddressSearch()
    }
    if (isSubmit) validateFields({ ...data, address: '' });
  }

  const openAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function(selectedData) {
        // 사용자가 도로명 주소를 선택했을 때 실행되는 콜백 함수
        const roadNameAddress = selectedData.roadAddress
        setRoadAddress(roadNameAddress)
        console.log('Selected Address:', roadAddress)
        

        // 주소로 좌표 검색
        const geocoder = new window.daum.maps.services.Geocoder();
        geocoder.addressSearch(roadNameAddress, function(result, status) {
          if (status === window.daum.maps.services.Status.OK) {
            const coords = new window.daum.maps.LatLng(result[0].y, result[0].x);
            console.log('Coordinates:', coords.getLat(), coords.getLng()); // Debugging
            setData(prevData => ({
              ...prevData,
              position: { lat: coords.getLat(), lng: coords.getLng() } // position을 data 객체에서 업데이트
            }));
          } else {
            console.error('Geocoding failed:', status); // Debugging
          }
        });
      }
    }).open();
  };

  useEffect(() => {
    console.log('Position updated:', data.position);
  }, [data.position]); // position이 변경될 때마다 콘솔에 출력


  useEffect(() => {
    setData((prevData) => ({
        ...prevData,
        address: `${roadAddress} ${detailAddress}`.trim()
    }));
}, [roadAddress, detailAddress]);


  const handleCategoryChange = (category) => {
    setData({
      ...data,
      category: category,
    });
    if (isSubmit) validateFields({ ...data, category: category });
  };

  const validateFields = (dataToValidate) => {
    const newErrors = {};

    if (!dataToValidate.title) newErrors.title = '전시 제목을 입력하세요';
    if (!dataToValidate.category) newErrors.category = '카테고리를 선택하세요';
    if (!isOnline && !dataToValidate.address) newErrors.address = '주소를 입력하세요';
    if (!dataToValidate.startDate) newErrors.startDate = '시작 날짜를 선택하세요';
    if (!dataToValidate.endDate) newErrors.endDate = '종료 날짜를 선택하세요';
    if (!dataToValidate.startTime) newErrors.startTime = '시작 시간을 선택하세요';
    if (!dataToValidate.endTime) newErrors.endTime = '종료 시간을 선택하세요';
    if (!isFree && !dataToValidate.fee) newErrors.fee = '입장료를 입력하세요';
    if (!dataToValidate.contact) newErrors.contact = '전시 문의를 입력하세요';
    if (!dataToValidate.description) newErrors.description = '소개를 입력하세요';
    if (!dataToValidate.poster) newErrors.poster = '포스터를 추가하세요';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // useEffect(() => {
  //   validateFields();
  // }, [data]);



  const readBlob = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(blob);
    });
  };

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true)

    if (!validateFields(data)) {
      console.log('Validation failed');
      return;
    }

    const formData = new FormData();

    // 포스터 사진 추가
    formData.append('poster', data.poster); 

    // 여러 개의 사진 파일을 FormData에 추가
    data.photos.forEach((photo, index) => {
      console.log(`photo${index}`, photo)
      formData.append('photos', photo)
    });

    // info를 FormData에 추가
    const info = JSON.stringify({
      exhibit_category: data.category,
      title: data.title,
      address: isOnline ? '온라인' : data.address,
      open_times: `${data.startTime} ~ ${data.endTime}`,
      fee: isFree ? '무료' : `${data.fee}원`,
      contact: data.contact,
      description: data.description,
      start_date: data.startDate,
      end_date: data.endDate,
      position: data.position
    });
    formData.append('info', new Blob([info], { type: 'application/json' }));

    // FormData 값 확인
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    // FormData의 값 확인하기
    for (let [key, value] of formData.entries()) {
      if (key === 'info' && value instanceof Blob) {
        try {
          const blobText = await readBlob(value);
          console.log(`${key}: ${blobText}`);
        } catch (error) {
          console.error(`Blob 읽기 오류 (${key}):`, error);
        }
      } else if (value instanceof File) {
        // File 객체의 경우, 메타정보만 로그에 남기기
        console.log(`${key}: ${value.name} (${value.size} bytes)`);
      }
    }
    

    console.log('isFree: ', isFree)
    console.log('isOnline: ', isOnline)
    console.log('Form Data:', formData);

    try {
      const accessToken = localStorage.getItem('access_token')

      if (!accessToken) {
        throw new Error('No access token found in session storage')
      }

      const response = await axiosInstance.post('/api/v1/exhibits', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Content-Type 설정
          'Authorization': `Bearer ${accessToken}`  // Authorization 헤더 추가 (토큰 필요)
        }
      });
      console.log('전시 작성 FormData submitted:', response.data);
      const exhibitId = response.data
      console.log('exhibit_id', exhibitId)

      alert('전시가 등록되었습니다.')
      navigate('/')
    } catch (error) {
      console.error('전시 작성 FormData submit 오류', error);
    }
  };

  return (
    <div className='Create'>
      <div className='topContainer'>
        <div className='uploadPosterContainer'>
          <div className='uploadPoster'>
            <UploadPoster uploadedPoster={data.poster} setUploadedPoster={handlePosterChange} />
          </div>
          <div className='posterErrorContainer'>
            {errors.poster && 
              <div className='createError'>{errors.poster}</div>
            }
          </div>
        </div>
        <div className='infoContainer'>
          <div className='informationContainer'>
            <div className='infoTitle'>
              <input
                type='text'
                name='title'
                value={data.title}
                onChange={handleChange}
                placeholder='전시 제목'
                className='infoTitleText'
                ref={refs.title}
              />
              {errors.title && 
                <div className='createError'>{errors.title}</div>
              }
            </div>
            <div className='infoAuthor'>
              <input
                type='text'
                name='author'
                value={data.author}
                onChange={handleChange}
                placeholder='주최'
                className='infoAuthorText'
              />
            </div>
            <div className='infoPlace infoItem'>
              <div className='infoPlaceContainer'>
                <div className='inputTag'>장소</div>
                <div className={`roadAddress ${data.address === '' ? 'roadAddressPlaceholder' : ''}`}>{data.address === '' ? '찾기 버튼을 눌러주세요' : roadAddress}</div>
                <input
                  type='text'
                  name='detailAddress'
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                  className='inputSmall'
                  placeholder='상세주소를 입력하세요'
                  disabled={isOnline}
                />
                <div className='infoPlaceBtnContainer'>
                  <div className={`smallBtn ${isOnline===false ? 'active' : ''}`} onClick={() => handleOnlineChange('주소 찾기')}>주소 찾기</div>
                  <div className={`smallBtn ${isOnline===true ? 'active' : ''}`} onClick={() => handleOnlineChange('온라인')}>온라인</div>
                </div>
              </div>
            </div>
            <div className='enterErrorContainer'>
              {errors.address && 
                <div className='createError'>{errors.address}</div>
              }
            </div>
            <div className='infoPeriod infoItem'>
              <div className='inputTag'>기간</div>
              <input
                type='date'
                name='startDate'
                value={data.startDate}
                onChange={handleChange}
                className='inputSmall'
                ref={refs.startDate}
              />
              ~
              <input
                type='date'
                name='endDate'
                value={data.endDate}
                onChange={handleChange}
                className='inputSmall'
                ref={refs.endDate}
              />
            </div>
            <div className='enterErrorContainer'>
              <div className='enterErrorFirstItem'>
                {errors.startDate && 
                  <div className='createError'>{errors.startDate}</div>
                }
              </div>
              <div>
                {errors.endDate && 
                    <div className='createError'>{errors.endDate}</div>
                }
              </div>
            </div>
            <div className='infoTime infoItem'>
              <div className='inputTag'>시간</div>
              <input
                type='time'
                name='startTime'
                value={data.startTime}
                onChange={handleChange}
                className='inputSmall'
                ref={refs.startTime}
              />
              ~
              <input
                type='time'
                name='endTime'
                value={data.endTime}
                onChange={handleChange}
                className='inputSmall'
                ref={refs.endTime}
              />
            </div>
            <div className='enterErrorContainer'>
              <div className='enterErrorFirstItem'>
                {errors.startTime && 
                  <div className='createError'>{errors.startTime}</div>
                }
              </div>
              <div>
                {errors.endTime && 
                  <div className='createError'>{errors.endTime}</div>
                }
              </div>
            </div>
              
            <div className='infoPrice infoItem'>
              <div className='inputTag'>입장료</div>
              <div className={`smallBtn ${isFree===true ? 'active' : ''}`} onClick={() => handleFeeChange('무료')}>무료</div>
              <div className={`smallBtn ${isFree===false ? 'active' : ''}`} onClick={() => handleFeeChange('유료')}>유료</div>
              <div className='inputFeeContainer'>
                <input
                  type='number'
                  name='fee'
                  value={isFree === false ? data.fee : ''}
                  onChange={handleChange}
                  className='inputSmall inputFee'
                  disabled={isFree}
                  step={500}
                />
                <div className='currency'>원</div>
              </div>
              <div className='errorMargin'>
              {errors.fee && 
                <div className='createError'>{errors.fee}</div>
              }
              </div>
            </div>
            <div className='infoContact infoItem'>
              <div className='inputTag'>전시 문의</div>
              <input
                type='text'
                name='contact'
                value={data.contact}
                onChange={handleChange}
                placeholder='ecnv@gmail.com'
                className='inputSmall'
                ref={refs.contact}
              />
              <div className='errorMargin'>
                {errors.contact && 
                  <div className='createError'>{errors.contact}</div>
                }
              </div>
            </div>
            <div className='infoCategory infoItem'>
              <div className='inputTag'>카테고리</div>
              <div
                className={`smallBtn ${data.category === '전시회' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('전시회')}>
                전시회
              </div>
              <div
                className={`smallBtn ${data.category === '공연' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('공연')}>
                공연
              </div>
              <div
                className={`smallBtn ${data.category === '공모전 및 대회' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('공모전 및 대회')}>
                공모전 및 대회
              </div>
              <div
                className={`smallBtn ${data.category === '기타' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('기타')}>
                기타
              </div>
              <div className='errorMargin'>
                {errors.category && 
                  <div className='createError'>{errors.category}</div>
                }
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <div className='infoDescriptionContainer'>
        <div className='descriptionTitle'>소개</div>
        <div className='descriptionBody'>
          <textarea
            name='description'
            value={data.description}
            onChange={handleChange}
            className='textarea'
            ref={refs.description}
          />
          {!data.description && (
            <div className='descriptionPlaceholder'>
              소개를 작성해주세요. 온전은 모두의 온전한 경험을 위해 이용규칙을 제정하여 운영하고 있습니다.{'\n'}
              위반 시 게시물이 삭제되며 계정 이용이 일정 기간 제한될 수 있습니다.{'\n'}
              {'\n'}
              = 저작권 위반 금지{'\n'}
              ∙타인의 전시 및 작품 등을 허락 없이 게시하는 행위{'\n'}
              {'\n'}
              = 불법촬영물 유통 금지{'\n'}
              - 불법촬영물 등을 게재할 경우 전기통신사업법에 따라 삭제 조치 및 서비스 이용이 영구적으로 제한될 수 있으며 관련 법률에 따라 처벌 받을 수 있습니다.{'\n'}
              {'\n'}
              = 그 밖의 규칙 위반{'\n'}
              - 타인의 권리를 침해하거나 불쾌감을 주는 행위{'\n'}
              - 범죄, 불법 행위 등 법령을 위반하는 행위{'\n'}
              - 음란물, 성적 수치심을 유발하는 행위{'\n'}
            </div>
          )}
          {errors.description && 
            <div className='createError'>{errors.description}</div>
          }
        </div>
        <UploadFile selectedFiles={data.photos} onFilesSelect={handleFilesSelect} />
      </div>
      <div className='infoMapContainer'>
        <div className='infoPlaceTitle'>공간 정보</div>
        <div>{data.address}</div>
        <div className='infoPlaceMap'>
          <Location address={data.address} position={data.position} />
        </div>
      </div>
      <div className='submitBtn' onClick={handleSubmit}>작성 완료</div>
    </div>
  );
};

export default Create;
