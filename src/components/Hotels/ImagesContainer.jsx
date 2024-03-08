import React, { useEffect, useState } from "react";
import axios from "../../Utils/axios";
import { baseUrl } from "../../Utils/urls";

export const ImagesContainer = ({ hotelId }) => {
  const [images, setImages] = useState({
    hotelImage: null,
    roomTypeImages: [],
    roomImages: [],
  });


  useEffect(() => {
    const fetchHotelImages = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}api/get-hotel-images/${hotelId}/`
        );
        const data = response.data;
        console.log(data);

        if (
          data &&
          data.hotel_image &&
          Array.isArray(data.room_type_images) &&
          Array.isArray(data.room_images)
        ) {
          setImages({
            hotelImage: data.hotel_image,
            roomTypeImages: data.room_type_images,
            roomImages: data.room_images,
          });
        }
      } catch (error) {
        console.error("Error fetching hotel images:", error);
      }
    };

    fetchHotelImages();
  }, [hotelId]);

  return (
    <div className="m-3 w-10/12">
      <div className="grid grid-cols-3 gap-2 overflow-hidden mb-2">
        <div className=" grid grid-rows-1 mb-2 h-52">
          <div>
            {images.roomTypeImages.slice(0, 2).map((imageUrl, index) => (
              <img
                className="h-full w-full mb-2"
                key={index}
                src={`${baseUrl}${imageUrl}`}
                alt={`Room Type ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className=" col-span-2  h-[360px] ">
          {images.hotelImage && (
            <img
              className="h-full w-full"
              src={`${baseUrl}${images.hotelImage}`}
              alt="Hotel"
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 ">
        {images.roomImages.slice(0, 5).map((imageUrl, index) => (
          <img
            className="h-full w-full"
            key={index}
            src={`${baseUrl}${imageUrl}`}
            alt={`Room ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
