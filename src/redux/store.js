// // store.js
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './slices/userSlice';
// import roomSelectionReducer from './slices/roomSelectionSlice'
// import searchDetailsReducer from './slices/searchDetailsSlice'
// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     roomSelection: roomSelectionReducer,
//     searchDetails: searchDetailsReducer, // Add the new reducer


//     // other reducers...
//   },
// });

// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { setAuthentication,setUserName } from './slices/userSlice';
import roomSelectionReducer from './slices/roomSelectionSlice'
import searchDetailsReducer from './slices/searchDetailsSlice'
import totalPriceReducer from './slices/totalPriceSlice'; // Import the totalPriceReducer
import adminReducer, { setAdminToken } from './slices/adminSlice'; // Import the adminReducer

const storedToken = localStorage.getItem('usertoken');
const storedAdminToken = localStorage.getItem('adminToken'); // Retrieve admin token
const storedAdminEmail = localStorage.getItem('adminEmail')
const storedUserName = JSON.parse(localStorage.getItem('user_name'));
const storedSearchDetailsString = localStorage.getItem('searchDetails');
let storedSearchDetails;

try {
  storedSearchDetails = storedSearchDetailsString ? JSON.parse(storedSearchDetailsString) : null;
} catch (error) {
  console.error('Error parsing stored search details:', error);
  storedSearchDetails = null;
}

console.log(storedSearchDetails, "details");




const initialState = {
  user: {
    name: storedUserName || null,
    isAuthenticated: !!storedToken,
  },
  admin: {
    token: storedAdminToken || null,
    isAuthenticated: !!storedAdminToken,
    email:storedAdminEmail||null,

  },
  searchDetails: storedSearchDetails
    ? storedSearchDetails
    : {
        location: '',
        checkInDate: null,
        checkOutDate: null,
        adults: 1,
        children: 0,
        rooms: 1,
      },
};
console.log('Stored Token:', storedToken);
console.log('Stored UserName:', storedUserName);

const store = configureStore({
  reducer: {
    user: userReducer,
    roomSelection: roomSelectionReducer,
    searchDetails: searchDetailsReducer,
    totalPrice: totalPriceReducer,
    admin: adminReducer, // Include the admin reducer in the store configuration
 


  },
  preloadedState: initialState,
});


export const selectAdminId = (state) => state.admin.id;


if (storedUserName) {
  store.dispatch(setAuthentication(true));
  store.dispatch(setUserName(storedUserName || null));
}
if (storedAdminToken) {
  store.dispatch(setAdminToken(storedAdminToken));
}
export { store };
