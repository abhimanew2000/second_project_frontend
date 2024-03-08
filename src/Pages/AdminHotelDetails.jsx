// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-datepicker/dist/react-datepicker.css";
// Create AdminHotelDetails component
export const AdminHotelDetails = () => {
  // Use useParams to get the hotel ID from the URL
  const { hotelId } = useParams();
  const adminToken = useSelector((state) => state.admin.token);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedDateRanges, setSelectedDateRanges] = useState([]);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);


  
  const isSameDay = (date1, date2) => {
    return (
      date1.year === date2.year &&
      date1.month === date2.month &&
      date1.day === date2.day
    );
  };
 
  const handleDateChange = (timestamps) => {
    // Convert timestamps to Date objects
    const dates = timestamps.map(timestamp => new Date(timestamp));
    // Update the selectedDates state with the converted dates
    setSelectedDates(dates);

  };
  useEffect(() => {
    console.log(selectedDates, "datessss");
}, [selectedDates]);

  const [hotelDetails, setHotelDetails] = useState({
    name: "",
    description: "",
    room_types: [], 
    rooms: [], 
  });

  const { room_types: roomTypes, rooms } = hotelDetails;
  console.log(hotelDetails, "HOTELDETAILSSSS");
  console.log(hotelDetails.room_types, "ROOMTYPES");

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/customadmin/single-hotel-detail/${hotelId}/`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setHotelDetails(data);
        } else {
          console.error("Failed to fetch hotel details:", response.statusText);
        }
      } catch (error) {
        console.error("Error during fetch:", error.message);
      }
    };

    fetchHotelDetails();
  }, [hotelId, adminToken]);

  if (!hotelDetails) {
    return <div>Loading...</div>;
  }


  const sendSelectedDates = async (roomTypeId) => {
    try {
      console.log(selectedDates, "selected datesss");
      const response = await fetch(
        `http://127.0.0.1:8000/customadmin/update-not-available-dates/${hotelId}/${roomTypeId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ dates: selectedDates }), // Correctly stringify the body object
        }
      );
      if (response.ok) {
        console.log("Selected dates saved successfully.");
        // Optionally, you can handle success or display a message to the user
      } else {
        console.error(
          "Failed to save selected dates:",
          response.statusText
        );
        // Handle error scenario
      }
    } catch (error) {
      console.error("Error while saving selected dates:", error.message);
      // Handle error scenario
    }
  };

  return (
    <>
      <section class="py-12 sm:py-16">
        <div class="container mx-auto px-4">
          <nav class="flex">
            <ol role="list" class="flex items-center">
              <li class="text-left">
                <div class="-m-1">
                  <a
                    href="#"
                    class="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                  >
                    {" "}
                    Admin
                  </a>
                </div>
              </li>

              <li class="text-left">
                <div class="flex items-center">
                  <span class="mx-2 text-gray-400">/</span>
                  <div class="-m-1">
                    <a
                      href="#"
                      class="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                    >
                      {" "}
                      Hotels{" "}
                    </a>
                  </div>
                </div>
              </li>

              <li class="text-left">
                <div class="flex items-center">
                  <span class="mx-2 text-gray-400">/</span>
                  <div class="-m-1">
                    <a
                      href="#"
                      class="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                      aria-current="page"
                    >
                      {" "}
                    </a>
                    Details
                  </div>
                </div>
              </li>
            </ol>
          </nav>

          <div class="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
            <div class="lg:col-span-3 lg:row-end-1">
              <div class="lg:flex lg:items-start">
                <div class="lg:order-2 lg:ml-5">
                  <div class="max-w-xl overflow-hidden rounded-lg">
                    <img
                      class="h-full w-full max-w-full object-cover"
                      src={hotelDetails.image}
                      alt=""
                    />
                  </div>
                </div>

                <div class="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                  <div class="flex flex-row items-start lg:flex-col">
                    {hotelDetails.rooms.map((roomType) => (
                      <button
                        type="button"
                        key={roomType.id} // Assuming each room type has a unique ID
                        class="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center"
                      >
                        <img
                          class="h-full w-full object-cover"
                          src={roomType.image}
                          alt=""
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div class="lg:col-span-2 lg:row-span-2 lg:row-end-2">
              <h1 class="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                {hotelDetails.name}
              </h1>

              <div class="mt-5 flex items-center">
                <div class="flex items-center">
                  <svg
                    class="block h-4 w-4 align-middle text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      class=""
                    ></path>
                  </svg>
                  <svg
                    class="block h-4 w-4 align-middle text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      class=""
                    ></path>
                  </svg>
                  <svg
                    class="block h-4 w-4 align-middle text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      class=""
                    ></path>
                  </svg>
                  <svg
                    class="block h-4 w-4 align-middle text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      class=""
                    ></path>
                  </svg>
                  <svg
                    class="block h-4 w-4 align-middle text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      class=""
                    ></path>
                  </svg>
                </div>
                <p class="ml-2 text-sm font-medium text-gray-500">
                  1,209 Reviews
                </p>
              </div>

              <h2 class="mt-8 text-base text-gray-900">
                {hotelDetails.description}
              </h2>

              

              
            </div>

          </div>
          <div class=" mx-40">
            <div class="border-b border-gray-300">
              <nav class="flex gap-4">
                <a
                  href="#"
                  title=""
                  class="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                >
                  {" "}
                  Description{" "}
                </a>

                <a
                  href="#"
                  title=""
                  class="inline-flex items-center border-b-2 border-transparent py-4 text-sm font-medium text-gray-600"
                >
                  Reviews
                  <span class="ml-2 block rounded-full bg-gray-500 px-2 py-px text-xs font-bold text-gray-100">
                    {" "}
                    1,209{" "}
                  </span>
                </a>
              </nav>
            </div> 
            <div class="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
              <table class="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
                <thead class="hidden border-b lg:table-header-group">
                  <tr class="">
                    <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                      RoomID
                    </td>
                    <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                      ROOM TYPE
                    </td>
                    <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                      FACILITIES
                    </td>

                    <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                      ROOM PRICE
                    </td>
                    <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                      AVAILABLE DATES
                    </td>
                  </tr>
                </thead>

                <tbody className="bg-white lg:border-gray-300">
{hotelDetails.rooms.map((room) => (
  <tr key={room.id}>
    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
      {room.id}
    </td>
    {roomTypes.map((roomType) => (
      <React.Fragment key={roomType.id}>
        {roomType.id === room.room_type && (
          <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
            {roomType.name}
          </td>
        )}
      </React.Fragment>
    ))}
    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
      {room.amenities}
    </td>
    <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
      {room.price_per_night}
    </td>
    <td className="flex">
      <button onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} className="bg-blue-600 h-10 text-white p-1 rounded-lg">
        Mark not available dates
      </button>
      {isDatePickerOpen && (
        <div className=" flex" >
          <DatePicker
            selected={selectedDates}
            onChange={(date) => handleDateChange(date)}
            selectsRange={false}
            multiple
            inline
            style={{ width: '100%', border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}
          />
          <button onClick={() => sendSelectedDates(room.room_type)} className="bg-green-500 text-white p-2 rounded-lg">
            Save 
          </button>
        </div>
      )
      }
    </td>
      
  </tr>
))}
</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
