import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const Location = ({ address, position }) => {

  return (
    <Map 
        center={{ lat: position.lat, lng: position.lng }} 
        style={{ width: "100%", height: "400px" }}
        level={3}
    >
        <MapMarker position={{ lat: position.lat, lng: position.lng }}>
            <div style={{ padding: "5px", color: "#000" }}>{address}</div>
        </MapMarker>
    </Map>
  );
};

export default Location;
