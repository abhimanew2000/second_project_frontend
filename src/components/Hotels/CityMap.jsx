// CityMap.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customMarkerIcon from '../assets/custom-marker-icon.png';

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
  // const customMarkerIcon = L.icon({
  //   iconUrl: process.env.PUBLIC_URL + '/assets/custom-marker-icon.png',
  //   iconSize: [25, 41],
  //   iconAnchor: [12, 41],
  //   popupAnchor: [1, -34],
  // });

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
      {/* <Marker position={mapCenter} icon={customMarkerIcon}>
        <Popup>{city}</Popup>
      </Marker> */}
      <Marker icon={L.icon({ iconUrl: customMarkerIcon })} position={mapCenter}></Marker>

    </MapContainer>
  );
};

export default CityMap;
