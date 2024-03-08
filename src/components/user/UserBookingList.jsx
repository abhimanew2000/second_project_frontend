import React, { useState, useEffect } from "react";
import axios from "../../Utils/axios";
import { useSelector } from "react-redux";
import { UserNavbar } from "../../UserNavbar";
import { RatingFeedbackForm } from "../Hotels/RatingFeedbackForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { baseUrl } from "../../Utils/urls";
export const UserBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showRatingForm, setShowRatingForm] = useState(false);

  const userToken = localStorage.getItem("usertoken");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const fetchUserBookings = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}hotel/booking/user-booking-list/`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setBookings(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user bookings", error);
      setError("Error fetching user bookings");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, [userToken]);

  const handleCancelBooking = async (booking_id) => {
    try {
      await axios
        .patch(
          `${baseUrl}hotel/booking/cancel/${booking_id}/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log("success");
            fetchUserBookings();
          } else {
            console.log(response.data);
          }
        });
    } catch (error) {
      console.error("Error cancelling booking", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

const handleChatClick = async (e, bookingId) => {
  e.preventDefault();

  navigate(`/chat/${bookingId}`);
};

  return (
    <>
      <UserNavbar />
      <div className="mx-auto w-8/12 ">
        {bookings.map((booking, index) => (
          <div class="m-5 " key={index}>
            <div class="group mx-2 h-[200px] mt-5  grid grid-cols-3 overflow-hidden rounded-lg border text-gray-700 shadow transition hover:shadow-lg  ">
              <a href="#" class=" text-left text-gray-600 hover:text-gray-700">
                <div class="group relative  h-fit w-full overflow-hidden">
                  {booking.hotel_details && booking.hotel_details.image && (
                    <img
                      src={booking.hotel_details.image}
                      alt={`Image of ${booking.hotel_details.name}`}
                      className="h-fit w-64 m-5  border-none rounded-lg object-cover text-gray-700 transition group-hover:scale-125"
                    />
                  )}
                </div>
              </a>
              <div class="col-span-2 flex flex-col space-y-3 pl-8 text-left">
                <a href="#" class="mt-3 overflow-hidden text-2xl font-semibold">
                  {booking.hotel_details ? booking.hotel_details.name : "N/A"}
                </a>
                <a
                  href="#"
                  class="text-sm font-semibold text-gray-500 hover:text-gray-700"
                >
                  {booking.room_type}
                </a>
                <p class="overflow-hidden text-sm">
                  Price Per Night: {booking.total_price}
                </p>
                <div class="flex flex-col text-gray-700 sm:flex-row">
                  <div class="flex h-fit space-x-2 text-sm font-medium" >
                  <Link
  to={`/chat/${booking.id}`}
  className="rounded-full bg-green-100 px-2 py-0.5 text-green-700"
  onClick={(e) => handleChatClick(e, booking.id)}
>
  Chat {booking.id}
</Link>
                    <div class="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">
                      Add Rating
                    </div>
                  </div>
                </div>
                <div className=" flex justify-end ">
                  {booking.is_cancelled ? (
                    <button
                      class="  rounded-md  py-1 px-2 mr-5  text-center transition hover:scale-105 bg-orange-600 text-white sm:ml-auto"
                      disabled
                    >
                      Cancelled
                    </button>
                  ) : (
                    <button
                      className="rounded-md   py-1 px-2 mr-5   text-center transition hover:scale-105  text-white sm:ml-auto bg-blue-500 hover:bg-blue-600"
                      onClick={() => handleCancelBooking(booking.id, index)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
