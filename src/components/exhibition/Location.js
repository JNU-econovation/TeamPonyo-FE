import React, { useRef, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const Location = ({ address, position }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;

      // 지도 클릭 이벤트 핸들러
      kakao.maps.event.addListener(map, 'click', () => {
        map.setCenter(new kakao.maps.LatLng(position.lat, position.lng));
        map.setLevel(2); // 줌 레벨을 원래대로 설정
      });
    }
  }, [position]);

  if (!address || !position.lat || !position.lng) {
    return (
      <div style={{ width: "100%", height: "400px", backgroundColor: "#f0f0f0", textAlign: "center", lineHeight: "400px" }}>
        주소를 입력하세요
      </div>
    );
  }

  return (
    <Map
      ref={mapRef}
      center={{ lat: position.lat, lng: position.lng }}
      style={{ width: "100%", height: "400px" }}
      level={2}
    >
      <MapMarker position={{ lat: position.lat, lng: position.lng }}>
        <div style={{ padding: "5px", color: "#000" }}>{address}</div>
      </MapMarker>
    </Map>
  );
};

export default Location;
