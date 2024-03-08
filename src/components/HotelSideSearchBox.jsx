import React from 'react';
import { useSelector } from 'react-redux';
import { updateSearchDetails } from '../redux/slices/searchDetailsSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
export const HotelSideSearchBox = () => {
  const searchDetails = useSelector((state) => state.searchDetails);
const checkin = searchDetails.checkInDate
const checkout = searchDetails.checkOutDate 
  // Log the searchDetails to the console for debugging
  console.log('searchDetails:', searchDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the action to update searchDetails after component mounts
    dispatch(updateSearchDetails({/* your initial searchDetails values */}));
  }, [dispatch]);

  return (
    <>
      {searchDetails && <div className="flex flex-col w-80 p-5 bg-yellow-400 rounded-sm shadow-md">
         <h1 className=' font-bold text-gray-700 text-xl'>Search:</h1>

         <div className="px-4 py-2  "> 
          <label htmlFor="location" className=" flex items-center text-gray-950 text-sm font-bold  ">
            Location: 
          </label>
    <input
    type="text"
    id="location"
    disabled
    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    placeholder="Enter location"
    value={searchDetails.location} // Replace with your state/variable for location
  />
</div>
        <div className="px-4 py-2  ">
          <label htmlFor="check-in-date" className="block text-gray-950 text-sm font-bold  ">
            Check-in date:
          </label>
          <input
            type="date"
            id="check-in-date"
            disabled
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={(checkin || '').split?.('T')[0]} // Use optional chaining
            />
        </div>
        <div className="px-4 py-2  ">
          <label htmlFor="check-out-date" className="block text-gray-950 text-sm font-bold  ">
            Check-out date:
          </label>
          <input
            type="date"
            disabled
            id="check-out-date"
            className="    appearance-none border rounded w-full py-2 px-3 text-gray-950 leading-tight focus:outline-none focus:shadow-outline"
              value={(checkout || '').split?.('T')[0]} // Use optional chaining
          />
        </div>
        <div className="px-4 py-2 flex items-center">
          <label htmlFor="guests" className="block text-gray-600 text-sm font-bold mb-2">
            Guests:
          </label>
          <div className="flex items-center ml-3">
            <span className="text-gray-700 mr-2">Adults: {searchDetails.adults}</span>
            <span className="text-gray-700 mr-2">Children: {searchDetails.children}</span>
            <span className="text-gray-700">Rooms: {searchDetails.rooms}</span>
          </div>
        </div>
      </div>}
    </>
  );
};
