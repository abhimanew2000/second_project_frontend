import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux"; // Import the useSelector hook
import { UserNavbar } from "../UserNavbar";
import { useNavigate } from "react-router-dom";
export const HotelCheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hotelId, roomType, pricePerNight, totalPrice } = location.state || {};
  const [selectedHotel, setSelectedHotel] = useState(null); // Updated state variable
  const [hotelDetails, setHotelDetails] = useState(null);
  const searchDetails = useSelector((state) => state.searchDetails); // Get searchDetails from Redux store
  const user = useSelector((state) => state.user); // Get searchDetails from Redux store
  console.log(user,"USER ")
  // const userToken = useSelector((state)=>state.admin.adminToken)
  const userTokenData = localStorage.getItem('usertoken')
  const userToken = useSelector((state) => state.user.usertoken);

  console.log(roomType,pricePerNight,"TTTTTTTTTTTTTTTTTTT")
// -------------------------------------------------------------------------
  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/hotels/about/${hotelId}`
        );
        if (response.data.hotel) {
          setHotelDetails(response.data.hotel);
          setSelectedHotel(response.data.hotel); // Set selectedHotel

          // Check if hotelDetails has amenities property
          if (typeof response.data.hotel.amenities === "string") {
            const cleanedAmenities = response.data.hotel.amenities.replace(
              /^\"|\"$/g,
              ""
            );
            console.log(cleanedAmenities, "ggggg");
          }
        }
      } catch (error) {
        console.error("Error fetching hotel details", error);
      }
    };
    if (hotelId) {
      fetchHotelDetails();
    }
  }, [hotelId]);

  const [isMainGuest, setIsMainGuest] = useState(true);
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };
    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };
  console.log(hotelDetails, "hoteldetails");

  const backgroundImageStyle = {
    backgroundImage: `url(${hotelDetails?.image || ""})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  useEffect(() => {
    // Dynamically add Razorpay SDK script when component mounts
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const data = {
      totalPrice: totalPrice,
      roomType: roomType,
      hotelId: hotelId,
    }

    console.log(totalPrice,roomType,hotelId)
    console.log(userTokenData,"USERRRRRRRR")
      const response = await axios.post(
        "http://127.0.0.1:8000/hotel/booking/initiate_razorpay_payment/",
       
          data,
        {
          withCredentials : true,
          headers: {
            Authorization: `Bearer ${userTokenData}`,
            'Content-Type': 'application/json',
          }
          
        }
      )
      const {
        order_id,
        order_amount,
        order_currency,
        order_receipt,
        razorpay_key,
      } = response.data;
      if (!razorpay_key) {
        console.error("Razorpay key not found in the response");
        return;
    }
      setHotelDetails((prevHotelDetails) => ({
        ...prevHotelDetails,
        name: prevHotelDetails?.name || "", // Use optional chaining to safely access the property
      }));

      const options = {
        key: razorpay_key,
        amount: totalPrice * 100, 
        currency: order_currency,
        name: selectedHotel?.name || "", // Use optional chaining to safely access the property
        description: "Hotel Booking",
        order_id: order_id,
        
        handler: function (response) {
          console.log(response);
          confirmBooking(response.razorpay_signature, response.razorpay_payment_id,selectedHotel.id);

        },
        
        prefill: {
          name: "Guest Name",
          email: "guest@example.com",
          contact: "8129131726",
        },
        notes: {
          address: "Guest Address",
          totalPrice: totalPrice,
        },
        theme: {
          color: "#4285F4",
        },
        
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
 
    
  };
  const confirmBooking = async (razorpaySignature, razorpayPaymentId,hotel) => {
    const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken=')).split('=')[1];

    try {
      console.log("Inside confirmBooking function");
      console.log(formData,'formdata')
      console.log(roomType,'roomtype')
      console.log(searchDetails.checkInDate)
      console.log(searchDetails.checkOutDate)
      console.log(selectedHotel.name)
      console.log(hotelDetails.name)
    
      console.log(totalPrice)
      console.log(user.name)
        const response = await axios.post(
          "http://127.0.0.1:8000/hotel/booking/confirm_booking/",
          
          {
              razorpaySignature: razorpaySignature,
              razorpayPaymentId: razorpayPaymentId,
              formData: formData,
              roomType: roomType,
              checkInDate: searchDetails.checkInDate,
              checkOutDate: searchDetails.checkOutDate,
              totalPrice: totalPrice,
              firstName:formData.firstName,
              isMainGuest: isMainGuest,
              lastName:formData.lastName,
              email:formData.email,
              phone:formData.phone,
              user:user.email,
              hotel:hotel,
              
              
              
          },
          {

          },
          
          {
              // withCredentials: true,
              headers: {
                Authorization:`Bearer${userTokenData}`,
                'Content-Type': 'application/json',  

              },
          }
          
      );
      console.log(response,'response')
      console.log('hiii')
        navigate('/hotel-booking-success');
        // Handle the response from the backend after confirming the booking
        if (response.status === 200) {
          console.log("Booking confirmed successfully");
          console.log(response.data);  // Log the response data if needed
          navigate('/hotel-booking-success');
      } else {
          console.error("Booking confirmation failed - HTTP status code:", response.status);
          console.error(response.data);  // Log the response data if needed
      }
        console.log(response);
    } catch (error) {
        console.error("Error confirming booking", error);
    }
};
// --------------------------------------------------------------------------
const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  isMainGuest: true, // Default value
  // isBookingForSomeoneElse:false,

});

const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;

  // If checkbox is clicked, handle checkbox logic
  if (type === "checkbox") {
    if (name === "isMainGuest" && checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        isMainGuest: true,
        isBookingForSomeoneElse: false,
      }));
    } else if (name === "isMainGuest" && !checked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        isMainGuest: false,
        isBookingForSomeoneElse: true,
      }));
    }

    // Disable the other checkbox when one is selected
    const otherCheckbox = name === "isMainGuest" ? "isBookingForSomeoneElse" : "isMainGuest";
    setFormData((prevFormData) => ({
      ...prevFormData,
      [otherCheckbox]: !checked,
    }));
  } else {
    // For other fields, update form data
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
};


  return (
    <>
      <UserNavbar></UserNavbar>
      {/* <StepperBooking/> */}
      <div class="flex items-center justify-center space-x-4">
        {/* ... Step indicators ... */}
      </div>
      <div>
        <h2 className="text-2xl font-bold mt-10 ml-44">Hotel Reservation Details</h2>

        <div className=" flex justify-center">
          <div className="grid grid-cols-3 mt-6 gap-3">
            <div>
              {hotelDetails && (
                <div className="bg-white p-6 rounded-lg   w-96 border border-gray-300">
                  <h3 className="text-xl font-bold mb-2">
                    {hotelDetails.name}
                  </h3>
                  <p className="text-sm  text-green-600">
                    {" "}
                    {hotelDetails.address}
                  </p>
                  <p>
                    <span className="text-gray-500 font-bold">Amenities: </span>{" "}
                    <br />
                    {/* {hotelDetails.amenities &&
                      JSON.parse(hotelDetails.amenities).map(
                        (amenity, index) => (
                          <span key={index} className="mr-2  ">
                            {amenity}{" "}
                            <span className="text-green-500">&#10004;</span>
                          </span>
                        )
                      )} */}
                      {hotelDetails.amenities &&
  hotelDetails.amenities.map((amenity, index) => (
    <span key={index} className="mr-2">
      {amenity} <span className="text-green-500">&#10004;</span>
    </span>
  ))}
                  </p>
                  <p>
                    {" "}
                    <span className="text-gray-500 font-bold">Type:</span>{" "}
                    {roomType}
                  </p>
                  <p>
                    <span className="text-gray-500 font-bold">
                      Price Per Night:
                    </span>{" "}
                    ${totalPrice}
                  </p>
                </div>
              )}

              {hotelDetails && (
                <div className="bg-white p-6 rounded-lg   w-96 border border-gray-300 mt-5">
                  <p>Check-in Date: {formatDate(searchDetails.checkInDate)}</p>
                  <p>
                    Check-out Date: {formatDate(searchDetails.checkOutDate)}
                  </p>
                  <p>Adults: {searchDetails.adults}</p>
                  <p>Children: {searchDetails.children}</p>
                  <p>Rooms: {searchDetails.rooms}</p>
                </div>
              )}
            </div>

            <div className="col-span-2 border border-gray-300  rounded-lg w-full
            " style={backgroundImageStyle}>
              <h1 className="text-xl font-bold pt-5 pl-3 ">Enter your Details</h1>
              <div className="flex justify-center">
                <div className=" w-full mx-10 bg-slate-100 py-4 px-4 mt-10 rounded-lg border border-gray-800 text-gray-600">
                  <h1  >Almost done! Just fill in the * required info</h1>
                </div>
              </div>
              <form class="w-full ml-10  " onSubmit={handleFormSubmit}>
                <div class="grid grid-cols-2">
                  <div class="relative  w-fit my-5 group">
                    <input
                      type="text"
                      name="firstName"
                      id="floating_first_name"
                      class=" block py-2.5 px-0 w-80 text-sm text-black bg-transparent border rounded-lg pl-3 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    <label
                      for="floating_first_name"
                      class="peer-focus:font-medium pl-4 absolute text-sm text-gray-900 font-bold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      First name
                    </label>
                  </div>
                  <div class="relative w-full my-5 group">
                    <input
                      type="text"
                      name="lastName"
                      id="floating_last_name"
                      class=" block py-2.5 px-0 w-80 text-sm text-black bg-transparent border rounded-lg pl-3 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                    <label
                      for="floating_last_name"
                      class="peer-focus:font-medium pl-4 absolute text-sm text-gray-900 font-bold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Last name
                    </label>
                  </div>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <input
                    type="email"
                    name="email"
                    id="floating_email"
                    class=" block py-2.5 px-0 w-80 text-sm text-black bg-transparent border rounded-lg pl-3 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <label
                    for="floating_email"
                    class="peer-focus:font-medium pl-4 absolute text-sm text-gray-900 font-bold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                    Email address
                  </label>
                </div>

                <div class="grid md:grid-cols-2 md:gap-6">
                  <div class="relative z-0 w-full mb-5 group">
                    <input
                      type="tel"
                      pattern="[0-9]{10}"
                      name="phone"
                      id="floating_phone"
                      class=" block py-2.5 px-0 w-80 text-sm text-black bg-transparent border rounded-lg pl-3 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=""
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    <label
                      for="floating_phone"
                      class="peer-focus:font-medium pl-4 absolute text-sm text-gray-900 font-bold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Phone number
                    </label>
                  </div>
                </div>
                <div className="flex items-center mb-5">
                  <input
                    type="checkbox"
                    id="mainGuestCheckbox"
                    className="mr-2"
                    name="isMainGuest"
                    checked={formData.isMainGuest}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="mainGuestCheckbox"
                    className="text-sm text-gray-500"
                  >
                    I am the main guest
                  </label>
                </div>
                <div className="flex items-center mb-5">
                  <input
                    type="checkbox"
                    id="someoneElseCheckbox"
                    className="mr-2"
                    name="isMainGuest"
                    checked={formData.isBookingForSomeoneElse}
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="someoneElseCheckbox"
                    className="text-sm text-gray-500"
                  >
                    Booking is for someone else
                  </label>
                </div>
                <button
                  type="submit"
                  class="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
