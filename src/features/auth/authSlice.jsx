import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.accessToken = action.payload.token;
      state.user = action.payload.admin;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      console.log(action.payload);
    },
    logout: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      localStorage.removeItem("auth");
    },
  },
});

export const { setUser, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
