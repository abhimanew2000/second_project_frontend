import React, { useState, useEffect } from "react";
import axios from "../Utils/axios";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AdminHotelDetails } from "./AdminHotelDetails";
import { Link } from "react-router-dom";
import CityMap from "../components/Hotels/CityMap";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import { baseUrl } from "../Utils/urls";
export const AdminHotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const adminToken = useSelector((state) => state.admin.token);
  // --------------------------------Rooms--------------------------------------------------
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [roomError, setRoomError] = useState(null); //error message
  const [roomTypes, setRoomTypes] = useState([]); //fetching rooom type from backend
  const [count, setCount] = useState([]);
  const [newRoom, setNewRoom] = useState({
    room_number: "",
    capacity: 0,
    price_per_night: 0,
    amenities: "",

    room_type: "",
    image: null,
  });

  const handleAddRoom = (hotelid) => {
    setRoomError(null);
    setIsRoomModalOpen(true);
    setSelectedHotelId(hotelid);
  };

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const response = await axios.get(
          "/customadmin/room-types/",
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
              "Content-Type": "application/json", // Specify the content type
            },
          }
        );
        console.log(response, "response");
        setRoomTypes(response.data || []);
      } catch (error) {
        console.error("Error fetching room types:", error.message);
      }
    };

    fetchRoomTypes();
  }, []);
  const handleAddRooms = () => {
    if (
      !newRoom.room_type ||
      !newRoom.room_number ||
      !newRoom.capacity ||
      !newRoom.price_per_night ||
      !newRoom.amenities ||
      !newRoom.image
    ) {
      toast.error("Please fill in all the required fields.");
      setRoomError("Please fill in all the required fields.");
      return;
    }
    setRoomError(null);
    const formData = new FormData();
    console.log(newRoom, "newRoom");

    formData.append("hotelId", newRoom.id); // Add other form data here
    formData.append("room_number", newRoom.room_number);
    formData.append("capacity", newRoom.capacity);
    formData.append("price_per_night", newRoom.price_per_night);
    formData.append("amenities", newRoom.amenities);
    formData.append("room_type", newRoom.room_type);
    formData.append("hotel", selectedHotelId); // Use selectedHotelId instead of hotelId
    formData.append("image", newRoom.image);
    axios
      .post("/customadmin/rooms/", formData, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Room added Successfully");
        console.log("Room added successfully:", response.data);
        setRefetch((prevRefetch) => !prevRefetch);
        setSuccessMessage("Room added successfully!");
        setNewRoom({
          room_number: "",
          capacity: 0,
          price_per_night: 0,
          amenities: "",
          room_type: "",
          image: null,

        });
        setIsRoomModalOpen(false);
      })
      .catch((error) => {
        toast.error("Error adding room");
        setRoomError("Error adding room. Please try again.");
      });
  };
  // ------------------------roomtype--------------------------------------
  const [newRoomType, setNewRoomType] = useState({
    name: "",
    description: "",
    image: null,
    count: 0,
    price_per_night:0,
  });
  const [roomTypeError, setRoomTypeError] = useState(null);
  const [hotelid, setHotelid] = useState("");
  const [selectedDates, setSelectedDates] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isRoomTypeModalOpen, setIsRoomTypeModalOpen] = useState(false);

  const handleAddRoomType = () => {
    console.log(hotelid,"HOTELIDDDDD")
    if (!newRoomType.name || !newRoomType.description || !newRoomType.image || !newRoomType.price_per_night) {
      toast.error("Please fill in all the required fields.");
      return;
    }
    console.log("Name:", newRoomType.name);
    console.log("Description:", newRoomType.description);
    console.log("Image:", newRoomType.image);

    const formData = new FormData();
    formData.append("name", newRoomType.name);
    formData.append("description", newRoomType.description);
    formData.append("image", newRoomType.image);
    formData.append("count", newRoomType.count);
    formData.append("price_per_night",newRoomType.price_per_night)

    formData.append("hotel", selectedHotelId); // Use selectedHotelId instead of hotelId
    console.log(newRoomType.price_per_night,"datatatatatt")
    const headers = {
      Authorization: `Bearer ${adminToken}`,
    };
    console.log("Request Headers:", headers);

    const apiUrl = "/customadmin/room-types/";
    axios
      .post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Room Type added successfully:", response.data);
        toast.success("Room Type Added Successfully");

        setNewRoomType({
          name: "",
          description: "",
          image: null,
          count: 0,
          price_per_night:0,
        });
        setIsRoomTypeModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding Room Type:", error);
      });
    console.log(formData);
  };

  const handleAddRoomTypes = (hotelId) => {
    setIsRoomTypeModalOpen(true);
    setSelectedHotelId(hotelId); // Set the hotelId in the state
  };

  // --------------------------------Add hotel-----------------------------------------------------

  const [newHotel, setNewHotel] = useState({
    name: "",
    description: "",
    city: "",
    address: "",
    image: null,
    availability: false,
    amenities: [],
    ratings: 0.0,
    latitude: 0.0,
    longitude: 0.0,
    price: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState({
    latitude: 0.0,
    longitude: 0.0,
  });
  console.log(newHotel?.amenities, "AMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM");
  useEffect(() => {
    axios
      .get("/customadmin/hotel-details/", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
      });
  }, [count]);

  const handleAddHotel = () => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("name", newHotel.name);
    formData.append("city", newHotel.city);
    formData.append("availability", newHotel.availability);
    formData.append("price", newHotel.price);
    formData.append("amenities", newHotel.amenities);
    formData.append("image", newHotel.image);
    formData.append("description", newHotel.description);
    formData.append("address", newHotel.address);
    formData.append("latitude", newHotel.latitude);
    formData.append("longitude", newHotel.longitude);

    console.log(formData, "FORMDATA");
    axios
      .post("/customadmin/hotel-details/", formData, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "multipart/form-data",
        },
      })

      .then((response) => {
        console.log("Room Type added successfully:", response.data);
        toast.success("Hotel Added Successfully");
        setRefetch(!refetch);
        setNewHotel({
          name: "",
          description: "",
          city: "",
          address: "",
          image: null,
          availability: false,
          amenities: [],
          // ratings: 0.0,
          latitude: 0.0,
          longitude: 0.0,

          price: 0,
        });
        setIsModalOpen(false);
        setCount((prevCount) => prevCount + 1);
      })
      .catch((error) => {
        console.error("Error adding hotel:", error);
        toast.error("Error adding hotel");
      });
    console.log("mapCenter:", mapCenter);
  };
  // -------------------------------------------------------------------------------------------

  const handleToggleHotelAvailability = (id) => {
    const url = `${baseUrl}customadmin/hotel-details/${id}/`;
    console.log("Toggling availability for hotel with ID:", id);
    console.log("Request URL:", url);
    console.log(url.data, "hotelldetails");

    axios
      .patch(
        url,
        {},
        {
          withcredentials: true,
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
        }
      )

      .then((response) => {
        console.log("Hotel availability toggled successfully:", response.data);
        toast.success("Hotel availability toggled successfully Successfully");
        setCount((prevCount) => prevCount + 1);
        setRefetch((prevRefetch) => !prevRefetch);
      })

      .catch((error) => {
        console.error("Error toggling hotel availability:", error);
      });
  };

  // --------------------------------------------------------------------------
  const handleEditHotel = (hotel) => {
    setSelectedHotel(hotel);
    setIsEditModalOpen(true);
  };

  const handleUpdateHotel = (id) => {
    const url = `${baseUrl}customadmin/hotel-details/${id}/update/`;

    const formData = new FormData();
    formData.append("name", selectedHotel.name || "");
    formData.append("city", selectedHotel.city || "");
    formData.append("availability", selectedHotel.availability || "");
    formData.append("price", selectedHotel.price || "");
    formData.append("amenities", selectedHotel.amenities || "");
    formData.append("description", selectedHotel.description || "");
    formData.append("address", selectedHotel.address || "");

    formData.append("image", selectedHotel.image);

    console.log(formData, "hoteluiiiiiiiil");

    axios
      .put(url, formData, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Hotel updated successfully:", response.data);
        setRefetch((prevRefetch) => !prevRefetch);
        setIsEditModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating hotel:", error);
      });
  };

  // =---------------------latt,long----------------------

  const fetchLatLong = (city) => {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      city
    )}`;

    console.log("Geocoding URL:", nominatimUrl);

    try {
      fetch(nominatimUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            console.log("Latitude:", lat);
            console.log("Longitude:", lon);
            setNewHotel({ ...newHotel, latitude: lat, longitude: lon });
          } else {
            console.warn("No results found for the city:", city);
          }
        })
        .catch((error) => {
          console.error("Error during geocoding:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  // ---------------------------------------------------------------------------
  return (
    <>
      <div className="flex">
        <AdminSidebar />
        <div className="container mx-auto my-8 p-4 sm:p-6 lg:p-8">
          <h2 className="text-2xl font-semibold mb-4">Hotel Details Page</h2>

          <div className="mb-4 flex items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white p-2"
            >
              Add Hotel
            </button>
          </div>

          {/* Modal for adding hotels */}
          {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-gray-800 bg-opacity-75">
              <div class="lg:m-1">
                <form class="relative border border-gray-100 space-y-2 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-7">
                  <div class="grid gap-3 md:grid-cols-2">
                    <div>
                      <label class=""> HotelName </label>
                      <input
                        type="text"
                        value={newHotel.name}
                        onChange={(e) =>
                          setNewHotel({ ...newHotel, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label> City </label>
                      <input
                        type="text"
                        value={newHotel.city}
                        onChange={(e) => {
                          setNewHotel({ ...newHotel, city: e.target.value });
                        }}
                      />
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <CityMap city={newHotel.city} />
                    </div>
                    <div></div>
                    <button
                      className="bg-blue-700 text-white py-2 px-5 rounded-lg"
                      onClick={() => fetchLatLong(newHotel.city)}
                    >
                      Search
                    </button>
                  </div>
                  <div>
                    <label class=""> Description </label>
                    <input
                      value={newHotel.description}
                      onChange={(e) =>
                        setNewHotel({
                          ...newHotel,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label class=""> Address </label>
                    <input
                      value={newHotel.address}
                      onChange={(e) =>
                        setNewHotel({ ...newHotel, address: e.target.value })
                      }
                    />
                  </div>
                  <div className=" grid grid-cols-2">
                    <div className="flex items-center">
                      <label>Availability </label>
                      <input
                        className="mt-2 mx-2 text-left h-10  w-5 rounded-md bg-gray-100 px-4"
                        type="checkbox"
                        checked={newHotel.availability}
                        onChange={(e) =>
                          setNewHotel({
                            ...newHotel,
                            availability: e.target.checked,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label class=""> Facility </label>
                      <input
                        type="text"
                        value={newHotel.amenities}
                        onChange={(e) =>
                          setNewHotel({
                            ...newHotel,
                            amenities: e.target.value, // Remove surrounding quotes
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label class=""> Price</label>
                    <input
                      class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                      type="number"
                      value={newHotel.price}
                      onChange={(e) =>
                        setNewHotel({
                          ...newHotel,
                          price: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label class=""> Image</label>
                    <input
                      class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                      type="file"
                      accept=".jpeg,.png,.jpg"
                      onChange={(e) =>
                        setNewHotel({
                          ...newHotel,
                          image: e.target.files[0],
                        })
                      }
                    />
                    {newHotel.image && (
                      <img
                        src={URL.createObjectURL(newHotel.image)}
                        alt="Hotel Image"
                        className="mt-2 w-full h-32 object-cover"
                      />
                    )}
                  </div>

                  <div className=" flex ">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="mt-5 mx-5 w-full rounded-md bg-gray-400 p-2 text-center font-semibold text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => {
                        handleAddHotel(e);
                      }}
                      className="mt-5 w-full rounded-md bg-green-600 p-2 text-center font-semibold text-white"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500  ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-3 py-2">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-2">
                    City
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Availability
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Ratings
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Block/Unblock
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Edit
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Add Room
                  </th>
                  <th scope="col" className="px-3 py-2">
                    Add RoomType
                  </th>
                </tr>
              </thead>
              <tbody>
                {hotels.map((hotel) => (
                  <tr
                    key={hotel.id}
                    className={`odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 hover:bg-gray-100`}
                  >
                    <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
                      <Link
                        key={hotel.id}
                        to={`/admin-hotel-details/${hotel.id}`}
                      >
                        <p>{hotel.name}</p>
                      </Link>
                    </td>
                    <td className="px-3 py-2">{hotel.city}</td>
                    <td className="px-3 py-2">{String(hotel.availability)}</td>
                    <td className="px-3 py-2">{hotel.ratings}</td>

                    <td className="px-3 py-2">
                      <button
                        onClick={() => handleToggleHotelAvailability(hotel.id)}
                        className="text-blue-500"
                      >
                        {hotel.availability ? "Block" : "Unblock"}
                      </button>
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={() => handleEditHotel(hotel)}
                        className="text-blue-500"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={(e) => handleAddRoom(hotel.id)}
                        className="text-green-500"
                      >
                        Add Room
                      </button>
                    </td>
                    <td className="px-3 py-2">
                      <button
                        onClick={(e) => handleAddRoomTypes(hotel.id)}
                        className="text-green-500"
                      >
                        Add Room Type
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isEditModalOpen && (
            <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-gray-800 bg-opacity-75">
              <div class="lg:m-1">
                <form class="relative border border-gray-100 space-y-2 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-7">
                  <div class="grid gap-3 md:grid-cols-2">
                    <div>
                      <label class=""> HotelName </label>
                      <input
                        type="text"
                        placeholder="Your Name"
                        class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                        value={selectedHotel.name}
                        onChange={(e) =>
                          setSelectedHotel({
                            ...selectedHotel,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label class=""> City </label>
                      <input
                        type="text"
                        placeholder="Last  Name"
                        class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                        value={selectedHotel.city}
                        onChange={(e) =>
                          setSelectedHotel({
                            ...selectedHotel,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label class=""> Description </label>
                    <input
                      type="text"
                      placeholder="Username"
                      class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                      value={selectedHotel.description}
                      onChange={(e) =>
                        setSelectedHotel({
                          ...selectedHotel,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label class=""> Address </label>
                    <input
                      type="text"
                      class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                      value={selectedHotel.address}
                      onChange={(e) =>
                        setSelectedHotel({
                          ...selectedHotel,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className=" grid grid-cols-2">
                    <div className="flex items-center">
                      <label>Availability </label>
                      <input
                        className="mt-2 mx-2 text-left h-10  w-5 rounded-md bg-gray-100 px-4"
                        type="checkbox"
                        checked={selectedHotel.availability}
                        onChange={(e) =>
                          setSelectedHotel({
                            ...selectedHotel,
                            availability: e.target.checked,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label class=""> Facility </label>
                      <input
                        type="email"
                        class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                        value={selectedHotel.amenities}
                        onChange={(e) =>
                          setSelectedHotel({
                            ...selectedHotel,
                            amenities: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div>
                      <label class=""> Price</label>
                      <input
                        class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                        type="number"
                        value={selectedHotel.price}
                        onChange={(e) =>
                          setSelectedHotel({
                            ...selectedHotel,
                            price: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label class=""> Image</label>
                    {selectedHotel.image && (
                      <img
                        src={selectedHotel.image}
                        alt="Hotel Image"
                        className="mt-2 w-32 h-20 object-cover"
                      />
                    )}
                    <input
                      class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                      type="file"
                      accept=".jpeg,.png,.jpg"
                      onChange={(e) =>
                        setSelectedHotel({
                          ...selectedHotel,
                          image: e.target.files[0],
                        })
                      }
                    />
                  </div>

                  <div className=" flex ">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      class="mt-5 mx-5 w-full rounded-md bg-gray-400 p-2 text-center font-semibold text-white"
                    >
                      {" "}
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdateHotel(selectedHotel.id)}
                      class="mt-5 w-full rounded-md bg-green-600 p-2 text-center font-semibold text-white"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* -------------------------------------------roomm------------------ */}
          {successMessage && (
            <div className="text-green-500">{successMessage}</div>
          )}

          {isRoomModalOpen && (
            <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-gray-800 bg-opacity-75">
              <div className="lg:m-1">
                <form className="relative border border-gray-100 space-y-2 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-7">
                  <div>
                    {console.log(roomTypes, "type.....")}

                    <label htmlFor="roomType">Room Type</label>
                    <select
                      id="roomType"
                      value={newRoom.room_type}
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, room_type: e.target.value })
                      }
                    >
                      <option value="" disabled>
                        Select a Room Type
                      </option>
                      {roomTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="image">Image</label>
                    <input
                      type="file"
                      id="image"
                      accept=".jpeg,.png,.jpg"
                      onChange={(e) =>
                        setNewRoom({
                          ...newRoom,
                          image: e.target.files[0], // Use e.target.files[0] for file input
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="roomNumber">Room Number</label>
                    <input
                      type="text"
                      id="roomNumber"
                      value={newRoom.room_number}
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, room_number: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="capacity">Capacity</label>
                    <input
                      type="text"
                      id="capacity"
                      value={newRoom.capacity}
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, capacity: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="pricePerNight">Price Per Night</label>
                    <input
                      type="text"
                      id="pricePerNight"
                      value={newRoom.price_per_night}
                      onChange={(e) =>
                        setNewRoom({
                          ...newRoom,
                          price_per_night: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="amenities">amenities</label>
                    <input
                      type="text"
                      id="pricePerNight"
                      value={newRoom.amenities}
                      onChange={(e) =>
                        setNewRoom({
                          ...newRoom,
                          amenities: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="flex ">
                    <button
                      onClick={() => setIsRoomModalOpen(false)}
                      className="mt-5 mx-5 w-full rounded-md bg-gray-400 p-2 text-center font-semibold text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddRooms}
                      className="mt-5 w-full rounded-md bg-green-600 p-2 text-center font-semibold text-white"
                    >
                      Add Now
                    </button>
                  </div>
                  {roomError && <div className="text-red-500">{roomError}</div>}
                </form>
              </div>
            </div>
          )}
          {/* -------------------------------------roomtype-------------------------- */}

          {isRoomTypeModalOpen && (
            <form className="relative border border-gray-100 space-y-2 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-7">
              <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="lg:m-1">
                  <form className="relative border border-gray-100 space-y-2 max-w-screen-md mx-auto rounded-md bg-white p-6 shadow-xl lg:p-7">
                    <h2 className="text-2xl font-semibold mb-4">
                      Add Room Type
                    </h2>

                    <div>
                      <label htmlFor="roomTypeName">Name</label>
                      <input
                        type="text"
                        id="roomTypeName"
                        value={newRoomType.name}
                        onChange={(e) =>
                          setNewRoomType({
                            ...newRoomType,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label htmlFor="roomTypeDescription">Description</label>
                      <input
                        type="text"
                        id="roomTypeDescription"
                        value={newRoomType.description}
                        onChange={(e) =>
                          setNewRoomType({
                            ...newRoomType,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <label htmlFor="roomTypeImage">Image</label>
                      <input
                        type="file"
                        id="roomTypeImage"
                        accept=".jpeg,.png,.jpg"
                        onChange={(e) =>
                          setNewRoomType({
                            ...newRoomType,
                            image: e.target.files[0],
                          })
                        }
                      />
                      {newRoomType.image && (
                        <img
                          src={URL.createObjectURL(newRoomType.image)}
                          alt="Room Type Image"
                          className="mt-2 w-full h-32 object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <label htmlFor="roomTypeCount">Available Rooms</label>
                      <input
                        type="text"
                        id="roomTypecount"
                        value={newRoomType.count}
                        onChange={(e) =>
                          setNewRoomType({
                            ...newRoomType,
                            count: e.target.value,
                          })
                        }
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="roomTypePrice">Price</label>
                      <input
                        type="text"
                        id="roomTypePrice"
                        value={newRoomType.price_per_night}
                        onChange={(e) =>
                          setNewRoomType({
                            ...newRoomType,
                            price_per_night: e.target.value,
                          })
                        }
                      />
                    </div>
                    

                    <div className="flex">
                      <button
                        onClick={() => setIsRoomTypeModalOpen(false)}
                        className="mt-5 mx-5 w-full rounded-md bg-gray-400 p-2 text-center font-semibold text-white"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddRoomType}
                        className="mt-5 w-full rounded-md bg-green-600 p-2 text-center font-semibold text-white"
                      >
                        Add Room Types
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
