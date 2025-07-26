import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// example coordinates for centering the map (CA USA)
const centerPosition = [36.7783, -119.4179];

const OceanMap = () => {
  return (
    <MapContainer //leaflet map container
      center={centerPosition}  // initial map center [latitude, longitude]
      zoom={5}                 // zoom level (5 = state level)
      style={{ height: '500px', width: '100%' }} // size of map container
    >
      {/* base map tiles from OpenStreetMap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {/* pinpoint at coordinate */}
      <Marker position={centerPosition}>
        <Popup>Sample Ocean Location</Popup> {/* info box when marker clicked */}
      </Marker>
    </MapContainer>
  );
};

export default OceanMap;
