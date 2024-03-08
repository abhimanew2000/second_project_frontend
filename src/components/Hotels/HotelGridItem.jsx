// components/HotelGridItem.js
import React from "react";
const HotelGridItem = ({ name, city, image }) => (
  <div className="grid-item">
    <img className="hotel-image" src={image} alt={name} />
    <div className="hotel-details p-4">
      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-gray-600">{city}</p>
    </div>
  </div>
);

export default HotelGridItem;
