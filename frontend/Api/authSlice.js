import { createSlice } from "@reduxjs/toolkit";

// Initialize from localStorage
const initialState = {
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      // Also save to localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;