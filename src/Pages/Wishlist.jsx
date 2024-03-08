import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserNavbar } from "../UserNavbar";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const WishlistPage = () => {
  const [wishlistHotels, setWishlistHotels] = useState([]);
  const userTokenData = localStorage.getItem('usertoken')
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/get-wishlist/",  // Replace with your actual API endpoint
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('usertoken')}`,
            },
          }
        );

        setWishlistHotels(response.data.hotels);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (hotelId) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/remove-from-wishlist/',
        { hotel_id: hotelId },
        {
          headers: {
            Authorization: `Bearer ${userTokenData}`,
          },
        }
      );

      // Handle the success response as needed
      if (response.data.success) {
        toast.success("Hotel removed from wishlist!");
        // Optionally, you can update the local state to reflect the removed hotel
        // For example, filter out the removed hotel from the wishlistHotels state
        setWishlistHotels((prevHotels) =>
          prevHotels.filter((hotel) => hotel.id !== hotelId)
        );
      } else {
        toast.error("Error removing from wishlist. Please try again.");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Error removing from wishlist. Please try again.");
    }
  };


  return (
    <>
      <UserNavbar />
      <div className="flex items-center justify-center mt-5 min-h-screen">
        <div className="container mx-auto">
          <div className="mx-20">
            <h1 className="text-3xl font-bold mb-4">Your Wishlist</h1>
            {wishlistHotels.length === 0 ? (
              <p>Your wishlist is empty.</p>
            ) : (
              wishlistHotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white p-6 rounded-lg shadow-md mb-4"
                >
                  <div className="mt-4 flex items-center">
                    <img
                      src={`http://127.0.0.1:8000${hotel.image}`}
                      alt={hotel.name}
                      className="w-44 h-44 object-cover rounded-md mr-4"
                    />
                    <div className="w-full">
                      <h2 className="text-xl font-bold mb-2">{hotel.name}</h2>
                      <p className="text-gray-600">{hotel.description}</p>
                      <p className="text-sm text-gray-500">{hotel.address}</p>
                      <div className="flex  items-center mt-2">
                        <Link
                          to={`/hotels/${hotel.id}`}
                          className="mx-5 bg-blue-600 px-5 py-2 text-white rounded-md"
                        >
                          Show Details
                        </Link>
                        <button onClick={() => handleRemoveFromWishlist(hotel.id)}> Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistPage;
