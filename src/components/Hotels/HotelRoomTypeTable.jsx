import axios from "../../Utils/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { baseUrl } from "../../Utils/urls";
export const HotelRoomTypeTable = ({ hotelId }) => {
  const searchDetails = useSelector((state) => state.searchDetails);
  const userToken = localStorage.getItem("usertoken");

  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const selectedCheckInDate = new Date(searchDetails.checkInDate);
  const selectedCheckOutDate = new Date(searchDetails.checkOutDate);
  const formattedCheckInDate = selectedCheckInDate.toISOString().split("T")[0];
  const formattedCheckOutDate = selectedCheckOutDate
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    const fetchHotelRooms = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}customadmin/about/${hotelId}`
        );
        setRooms(response.data.rooms);
      } catch (error) {
        console.error("Error fetching hotel rooms", error);
      }
    };

    fetchHotelRooms();
  }, [hotelId]);

  console.log(rooms, "rooms");

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}api/${hotelId}/roomtypes`
        );
        console.log(response.data, "response");
        setRoomTypes(response.data);
      } catch (error) {
        setError("Error fetching room types");
      }
    };

    fetchRoomTypes();
  }, [hotelId]);

  const handleReserve = (room) => {
    if (!userToken) {
      // If not authenticated, navigate to the login page
      navigate("/login");
      return;
    }
    // Calculate the total price based on the number of rooms
    const totalPrice = parseFloat(room.price_per_night) * searchDetails.rooms;

    // Navigate to HotelCheckoutPage with data
    navigate("/hotel-checkout", {
      state: {
        hotelId: hotelId,
        roomType: room.name,
        pricePerNight: parseFloat(room.price_per_night).toFixed(2),
        totalPrice: totalPrice.toFixed(2), // Pass the total price
        // Other data you want to pass
      },
    });
  };

  // const isRoomTypeUnavailable = (roomTypeDates) => {
  //   if (!roomTypeDates || roomTypeDates.length === 0) {
  //     return true; // Room type has no dates specified, so it's unavailable
  //   }

  //   const selectedCheckInDateUTC = selectedCheckInDate
  //     .toISOString()
  //     .split("T")[0];
  //   const selectedCheckOutDateUTC = selectedCheckOutDate
  //     .toISOString()
  //     .split("T")[0];

  //   const isIncluded = roomTypeDates.some((date) => {
  //     return (
  //       date === selectedCheckInDateUTC || date === selectedCheckOutDateUTC
  //     );
  //   });

  //   return !isIncluded;
  // };

  const isRoomTypeUnavailable = (roomTypeDates) => {
    if (!roomTypeDates || roomTypeDates.length === 0) {
      return true; // Room type has no dates specified, so it's unavailable
    }

    const selectedCheckInDateUTC = formattedCheckInDate;
    const selectedCheckOutDateUTC = formattedCheckOutDate;

    const isIncluded = roomTypeDates.some((date) => {
      return (
        date === selectedCheckInDateUTC || date === selectedCheckOutDateUTC
      );
    });

    return isIncluded;
  };
  return (
    <div>
      <div className=" flex justify-center my-10">
        {rooms && rooms.length > 0 ? (
          <table className="w-8/12 border border-gray-300">
            <thead className="bg-[#3353abba] text-white ">
              <tr>
                <th className="py-2 px-4 text-left border-b">Room Type</th>
                <th className="py-2 px-4 text-left border-b">Price</th>
                <th className="py-2 px-4  text-center border-b">Reserve</th>
              </tr>
            </thead>

            <tbody>
              {roomTypes.filter((room) => room.count > 0).map((room, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{room.name}</td>
                  <td className="py-2 px-4 border-b">
                    $
                    {parseFloat(
                      room.price_per_night * searchDetails.rooms
                    ).toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {isRoomTypeUnavailable(room.dates) ? (
                      // <p className="text-red-500">
                      //   Not available for selected dates
                      // </p>
                      <button
                        onClick={() => handleReserve(room)}
                        className="bg-blue-500 py-2 px-1 text-white rounded-md"
                      >
                        Reserve
                      </button>
                    ) : (
                      // <button
                      //   onClick={() => handleReserve(room)}
                      //   className="bg-blue-500 py-2 px-1 text-white rounded-md"
                      // >
                      //   Reserve
                      // </button>
                      <p className="text-red-500">
                        Not available for selected dates
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No rooms found for this hotel</p>
        )}
      </div>
    </div>
  );
};
