import React, { useEffect } from 'react';

const Location = () => {
  useEffect(() => {
    // Kakao Maps API 로드 여부를 주기적으로 확인
    const checkKakaoMapsLoaded = setInterval(() => {
      if (window.kakao && window.kakao.maps) {
        clearInterval(checkKakaoMapsLoaded); // 로드되면 체크 멈춤
        window.kakao.maps.load(() => {
          console.log('Kakao maps 로드됨.');
          const mapContainer = document.getElementById('map');
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
          };
          new window.kakao.maps.Map(mapContainer, options);
          console.log('지도 생성됨.');
        });
      }
    }, 100); // 100ms마다 체크

    // 클린업 함수: 컴포넌트 언마운트 시 인터벌 제거
    return () => {
      clearInterval(checkKakaoMapsLoaded);
    };
  }, []);

  return (
    <div className='Location'>
      <div id='map' style={{ width: '500px', height: '400px' }}></div>
    </div>
  );
};

export default Location;
