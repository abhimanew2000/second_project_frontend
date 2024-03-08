// adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    token: null,
    isAuthenticated: false,
    // other admin-related state...
  },
  reducers: {
    setAdminToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    // other admin-related actions...
  },
});

export const { setAdminToken } = adminSlice.actions;

export const selectAdminToken = (state) => state.admin.token;
export const selectIsAdminAuthenticated = (state) => state.admin.isAuthenticated;

export default adminSlice.reducer;
