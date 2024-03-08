// searchDetailsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchDetailsSlice = createSlice({
  name: 'searchDetails',
  initialState: {
    location: '', // City or destination
    checkInDate: null,
    checkOutDate: null,
    adults: 1,
    children: 0,
    rooms: 1,
  },
  reducers: {
    updateSearchDetails: (state, action) => {
      localStorage.setItem('searchDetails', JSON.stringify({ ...state, ...action.payload }));
      return { ...state, ...action.payload };
    },
  },
});

export const { updateSearchDetails } = searchDetailsSlice.actions;

export default searchDetailsSlice.reducer;
