import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../Utils/axios";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { AddBookingForm } from "../components/admin/AddbookingForm";
export const HotelBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const adminToken = useSelector((state) => state.admin.token);

  console.log(bookings,"BOOKINGS");

  const fetchBookings = async () => {
    try {
      // Make a request to your backend API to fetch hotel bookings
      const response = await axios.get(
        "/customadmin/hotel-bookinglist/",
        {

        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      const bookingsArray = Array.isArray(response.data.bookings)
        ? response.data.bookings
        : [];

      setBookings(bookingsArray);
    } catch (error) {
      console.error("Error fetching hotel bookings", error);
    }
  };

  useEffect(() => {
   

    fetchBookings();
  }, []); // Fetch bookings when the component mounts
  console.log("Admin Token:", adminToken);

  const handleCancelBooking = async (booking_id) => {
    console.log(booking_id, "BOOKINGID");
    try {
      await axios.patch(
        `/customadmin/cancel-booking/${booking_id}/`,
        {

        },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json',  // Specify the content type
          },
        }
      ).then((response) => {
        if (response.status === 200) {
          console.log("success");
          fetchBookings();

        } else {
          console.log(response.data);
        }
      });
    } catch (error) {
      console.error("Error cancelling booking", error);
    }
  };
// ---------------------------------add booking/----------------------------------
  const [showAddBookingForm, setShowAddBookingForm] = useState(false);

  const handleToggleForm = () => {
    setShowAddBookingForm(!showAddBookingForm);
  };



  return (
    <>
      <div className="flex">
      <AdminSidebar />

      
      <div class=" w-full bg-gray-50">
        <div class="mx-auto max-w-screen-xl px-2 py-10">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4" onClick={handleToggleForm}>Add Booking</button>
        {showAddBookingForm && <AddBookingForm  />}

          <div class="mt-4 w-full">
            <div class="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
              <form class="relative flex w-full max-w-2xl items-center">
                <svg class="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8" class=""></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65" class=""></line>
                </svg>
                <input type="name" name="search" class="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2" placeholder="Search by Order ID, Date, Customer" />
              </form>

              
            </div>
          </div>

          <div class="mt-6 overflow-hidden rounded-xl bg-white px-6 shadow lg:px-4">
            <table class="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
              <thead class="hidden border-b lg:table-header-group">
                <tr class="">
                  <td class="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
                    Booking Id
                    <svg xmlns="http://www.w3.org/2000/svg" class="float-right mt-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </td>

                  <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Room Type </td>
                  <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">CheckIn</td>

                  <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Check Out </td>
                  <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Guest Name</td>

                  <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Guest Email</td>
                  <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">
                    Price
                    <svg xmlns="http://www.w3.org/2000/svg" class="float-right mt-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </td>

                  <td class="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Status</td>
                </tr>
              </thead>

              <tbody className="bg-white lg:border-gray-300">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:text-left">
                    {booking.id}
                  </td>
                  <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
  {booking.room_type}
</td>
<td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                    {booking.check_in_date}
                  </td>
                  <td className="whitespace-no-wrap py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
                    {booking.check_out_date}
                  </td>
                  <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                    {`${booking.guest_first_name} ${booking.guest_last_name}`}
                  </td>
                  <td className="whitespace-no-wrap py-4 text-left text-sm text-gray-600 sm:px-3 lg:table-cell lg:text-left">
                    {booking.guest_email}
                  </td>            
                  
                 
                  
                  <td className="whitespace-no-wrap py-4 text-right text-sm text-gray-600 sm:px-3 lg:text-left">
                    {booking.total_price}
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-3 lg:table-cell">
  {booking.is_cancelled ? (
    <button className="border-2 border-red-600 text-red-600 rounded-md px-2 py-1 font-bold" disabled>
      Cancelled
    </button>
  ) : (
    <button
      className="bg-blue-500 mx-2 rounded-md my-2 text-white px-2 py-1"
      onClick={() => handleCancelBooking(booking.id)}
    >
      Cancel
    </button>
  )}
</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
      </div>


      </div>
    </>
  );
};
