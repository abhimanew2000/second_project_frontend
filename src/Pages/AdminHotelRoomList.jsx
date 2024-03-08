import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../Utils/axios";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
export const AdminHotelRoomList = () => {
  const adminToken = useSelector((state) => state.admin.token);
  const [count,setCount] = useState(0)
  const [hotels, setHotels] = useState([]);
  const user = useSelector((state) => state.user); // Get the user object from Redux store

  const storedToken = localStorage.getItem("token");

  console.log(user, "USERR STRORE DETAILS");
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("/api/hotels/", {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        });

        console.log(response.data, "datarespone");
        setHotels(response.data || []); // Ensure that response.data is an array
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, [count]);
  
  const handleDeleteRoomType = async (hotelId, roomTypeId) => {
    try {
        const response = await axios.delete(`/customadmin/hotel/${hotelId}/room-types/${roomTypeId}/delete/`,{
            headers: {
                Authorization: `Bearer ${adminToken}`,
            },
        });
        setCount((prevCount)=>prevCount+1)
        console.log(response.data); // Log the response from the server
        // Handle success or update your UI as needed
    } catch (error) {
        console.error("Error deleting RoomType:", error);
        // Handle error or update your UI as needed
    }
};

  return (
    <>
      <div className="flex  ">
        <AdminSidebar />

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full  mx-auto my-8 px-4 sm:px-6 lg:px-8">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-3 py-2">
                  Hotels
                </th>
                <th scope="col" class="px-3 py-2">
                  <div class="flex items-center">Rooms</div>
                </th>
                <th scope="col" class="px-3 py-2">
                  <div class="flex items-center">Room Types</div>
                </th>
                <th scope="col" class="px-3 py-2">
                  <div class="flex items-center">Price</div>
                </th>
               
                
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr
                  key={hotel.id}
                  class="bg-white border-b dark:border-gray-700"
                >
                  <td class="px-3 py-2">{hotel.name}</td>
                  {/* Replace the next three <td> with data from your API response */}
                  <td class="px-6 py-4">
                    {hotel.rooms && hotel.rooms.length > 0 ? (
                      <ul>
                        {hotel.rooms.map((room) => (
                          <li key={room.id}>
                            Room Number: {room.room_number} - Capacity:{" "}
                            {room.capacity}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No rooms found for this hotel"
                    )}
                  </td>
                  <td class="px-6 py-4">
                    {hotel.room_types && hotel.room_types.length > 0 ? (
                      <ul>
                        {hotel.room_types.map((roomType) => (
                          <li key={roomType.id}>Room Type: {roomType.name}
                          <button
                      onClick={() => handleDeleteRoomType(hotel.id, roomType.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      Delete
                    </button></li>
                          
                        ))}
                      </ul>
                    ) : (
                      "No room types found for this hotel"
                    )}
                  </td>
                  <td class="px-3 py-2">{hotel.price}</td>

               
                  <td class="px-3 py-2">
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
