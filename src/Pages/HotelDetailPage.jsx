import React from 'react'
import { useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from '../Utils/axios';
import { SearchBar } from '../SearchBar';
import { UserNavbar } from '../UserNavbar';
import { HotelSideSearchBox } from '../components/HotelSideSearchBox';
import { HotelTopoptions } from '../components/Hotels/HotelTopoptions';
import { ImagesContainer } from '../components/Hotels/ImagesContainer';
import {HotelRoomTypeTable} from '../components/Hotels/HotelRoomTypeTable';  // Correct import
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { baseUrl } from '../Utils/urls';

export const HotelDetailPage = () => {
    const { hotelId } = useParams();
    const [hotelDetails, setHotelDetails] = useState({});
    console.log("ki",hotelDetails)
  
    useEffect(() => {
      const fetchHotelDetails = async () => {
        try {
          const response = await axios.get(`${baseUrl}api/hotels/about/${hotelId}`);
          setHotelDetails(response.data.hotel);
        } catch (error) {
          console.error("Error fetching hotel details:", error);
        }
      };
  
      fetchHotelDetails();
    }, [hotelId]);
    const { latitude, longitude } = hotelDetails; // Assuming latitude and longitude are part of the hotel details

  return (
<div>
  <UserNavbar/>
  {/* <SearchBar/> */}
  <div className='flex justify-center mt-10 '>
    <div className=''>
      <HotelSideSearchBox/>
      <div className='h-52  overflow-hidden'>

      {latitude && longitude && (
            <MapContainer
            className=''
              center={[latitude, longitude]}
              zoom={15}
              style={{ height: '300px', width: '100%' }}
            >
              <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
              <Marker position={[latitude, longitude]}>
                <Popup>{hotelDetails.name}</Popup>
              </Marker>
            </MapContainer>
          )}
      </div>
    </div>
    <div className='w-7/12' >
      <HotelTopoptions/>
      <ImagesContainer hotelId={hotelId} />
     

    </div>
    
  </div>
  <div >
  

<HotelRoomTypeTable hotelId={hotelId} />
</div>
{/* <SearchBar/> */}
  </div>
  )
}
