// CityMap.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CityMap = ({ city }) => {
  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState([0, 0]);

  useEffect(() => {
    fetchCoordinates();
  }, [city]);

  const fetchCoordinates = () => {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setMapCenter([lat, lon]);
          if (map) {
            map.flyTo([lat, lon], 13);
          }
        } else {
          console.error('No results found for the city:', city);
        }
      })
      .catch((error) => {
        console.error('Error fetching coordinates:', error);
      });
  };

  const onMapLoad = (map) => {
    setMap(map);
  };

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      style={{
        height:"20vh",
        width:"100%",
        marginTop:"",
        marginLeft:"",
        zIndex:0,
        
      }}      whenCreated={onMapLoad}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={mapCenter}>
        <Popup>{city}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default CityMap;
