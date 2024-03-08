// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
    isAuthenticated: false,
    email: null, // Add email to the initial state

  },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setUserEmail: (state, action) => { // New action to set user email
      state.email = action.payload;
    },
    setAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUserName, setUserEmail, setAuthentication } = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email; // New selector for user email
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;
