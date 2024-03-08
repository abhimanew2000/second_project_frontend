// src/components/HotelList.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const userTokenData = localStorage.getItem('usertoken')

  const HOTEL_IMAGE_DIR_PATH = "http://127.0.0.1:8000/api/";
  console.log(userTokenData,"USER")

  useEffect(() => {
    // Fetch hotels from the API
    axios
      .get("http://127.0.0.1:8000/api/hotels/", {
        headers: {
          Authorization: `Bearer ${userTokenData}`,
        },
      })
      .then((response) => {
        setHotels(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
      });
  }, []);
  console.log(hotels,'dfsdfd')

  const availableHotels = hotels.filter((hotel) => hotel.availability);
  const mainHotels = availableHotels.slice(0, 8);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4, // You can adjust the number of slides to show
    slidesToScroll: 1,
    
  };



  return (
    <>
    <div className="container z-10  px-32 mt-20">
      <h2 className="text-2xl font-bold mb-4">Popular Hotels</h2>
      <Slider {...settings}>
      {mainHotels.map((hotel) => (
          <div key={hotel.id} className="bg-white p-5  rounded-md shadow-md border">
            <img
              src={`${hotel.image}`}
              alt={hotel.name}
              className="w-full h-52 object-cover mb-2 rounded-md"
            />
            <h3 className="text-lg font-semibold ">{hotel.name}</h3>
            <p className="text-gray-600">{hotel.city}</p>
          </div>

        ))}
      </Slider>
      
    </div>
    </>

  );
};

export default HotelList;
