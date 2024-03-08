import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = ({ onMapClick }) => {
  const [position, setPosition] = useState([10.8505, 76.2711]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
    onMapClick({ latitude: lat, longitude: lng });
  };

  return (
    <MapContainer
      center={position}
      zoom={7}
      style={{ height: "300px", width: "100%" }}
      onClick={handleMapClick}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position}>
        <Popup>Selected Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
