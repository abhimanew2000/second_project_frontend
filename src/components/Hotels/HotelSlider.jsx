// HotelSlider.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HotelGridItem from "./HotelGridItem";




const HotelSlider = ({ hotels }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="mx-auto max-w-7xl">
      {hotels.map((hotel, index) => (
        <div key={hotel.id}>
          <div className={`grid-container grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${index % 4 === 0 ? 'grid-flow-row' : ''}`}>
            <HotelGridItem name={hotel.name} city={hotel.city} image={hotel.image} />
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default HotelSlider;
