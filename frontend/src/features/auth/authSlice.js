import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role")
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", state.role);
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.setItem("isLoggedIn", "false");
      localStorage.removeItem("cartId");
      
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
