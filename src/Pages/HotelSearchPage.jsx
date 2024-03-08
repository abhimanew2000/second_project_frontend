import React, { useEffect, useState } from "react";
import axios from "../Utils/axios";
import { useLocation, useParams } from "react-router-dom";
import { UserNavbar } from "../UserNavbar";
import { SearchBar } from "../SearchBar";
import FilterBox from "../FilterBox";
import { Checkbox } from "../components/Hotels/Checkbox";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from "../Utils/urls";

// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
// import FavoriteIcon from '@material-ui/icons/Favorite';

const HotelSearchPage = () => {
  const location = useLocation();
  const { city: searchValue } = useParams();
  const [hotels, setHotels] = useState([]);
  const [cityName, setCityName] = useState("");
  const [refresher, setRefresher] = useState(false);
  const [priceRange, setPriceRange] = useState([100, 1200]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const userTokenData = localStorage.getItem('usertoken')

  const generateStarRating = (rating) => {
    const maxRating = 3;
    const starArray = [];

    for (let i = 0; i < maxRating; i++) {
      if (i < rating) {
        starArray.push(
          <span key={i} className="text-yellow-500">
            {" "}
            &#9733;
          </span>
        );
      } else {
        starArray.push(
          <span key={i} className="text-gray-300">
            &#9733;
          </span>
        );
      }
    }
    return starArray;
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        // You can use location.search to get the query parameters
        const cityName = new URLSearchParams(location.search).get("city");
        setCityName(cityName);

        setRefresher(true);

        const response = await axios.get(
          `${baseUrl}api/get-hotels/?city=${cityName}&min_price=${priceRange[0]}&max_price=${priceRange[1]}`
        );
        const filteredHotels = response.data.hotels.filter((hotel) =>
          selectedAmenities.every((amenity) => {
            const hotelAmenitiesArray = Array.isArray(hotel.amenities)
              ? hotel.amenities.map((item) => item.trim().toLowerCase())
              : hotel.amenities
                  .replace(/^["'](.*)["']$/, "$1") // Remove surrounding quotes
                  .split(",")
                  .map((item) => item.trim().toLowerCase());

            return hotelAmenitiesArray.includes(amenity.toLowerCase());
          })
        );

        console.log("Response:", response);
        setHotels(filteredHotels);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, [location.search, priceRange, selectedAmenities]);

  const handlePriceRangeChange = (newValues) => {
    setPriceRange(newValues);
    setRefresher((prevRefresher) => !prevRefresher); // Toggle the refresher state to trigger a re-fetch
  };
  const handleAmenityChange = (amenity) => {
    const updatedAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];
    setSelectedAmenities(updatedAmenities);
    setRefresher((prevRefresher) => !prevRefresher);
  };
  const handleAddToWishlist = async (hotelId) => {
    try {
      const response = await axios.post(
        `${baseUrl}api/add-to-wishlist/`,
        { hotel_id: hotelId }, // Corrected data format
        {
          headers: {
            Authorization: `Bearer ${userTokenData}`,
          },
        }
      );

      // You can handle the success response as needed
      toast.success("Hotel added to wishlist!");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Error adding to wishlist. Please try again.");
    }
  };

  return (
    <>
      <UserNavbar />
      <div className="flex items-center justify-center mt-5 ">
        <div className="container mx-auto">
          <div className=" flex mx-20">
            <div className="  w-96 mt-10">
              <FilterBox onChange={handlePriceRangeChange} />
              <div className="w-full my-5  bg-white border border-gray-400 rounded-md shadow-md">
                <Checkbox onAmenityChange={handleAmenityChange} />
              </div>
            </div>
            <div className=" w-full mx-5 mt-10">
              <h1 className="text-3xl  font-bold mb-4">Hotels in {cityName}</h1>
              {hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white p-6 rounded-lg shadow-md mb-4 border border-gray-300"
                >
                  <div className="mt-4 flex items-center">
                    <img
                      src={`${baseUrl}${hotel.image}`}
                      alt={hotel.name}
                      className="w-44 h-44 object-cover rounded-md mr-4"
                    />
                    <div className="w-full">
                      <div className=" flex justify-between pr-20">
                        <h2 className="text-xl font-bold mb-2">{hotel.name}</h2>
                        <i class="fa-solid fa-heart text-2xl text-blue-400 hover:text-blue-900"  onClick={() => handleAddToWishlist(hotel.id)}></i>

                      </div>
                      <div className="mr-2 mt-2  text-yellow-500">
                        {generateStarRating(hotel.ratings)}
                      </div>
                      <p className="text-gray-600">
                        Average Rating: {hotel.average_rating}
                      </p>

                      <p className="text-gray-600">{hotel.description}</p>
                      <p className="text-sm text-gray-500">{hotel.address}</p>
                      <div className="flex  items-center mt-2">
                        <div className=" w-full flex justify-end">
                          
                           
                         
                          <Link
                            to={`/hotels/${hotel.id}`}
                            className="mx-5 bg-blue-600 px-5 py-2 text-white rounded-md"
                          >
                            Show Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelSearchPage;
