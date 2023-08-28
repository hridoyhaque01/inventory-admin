import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowSidebar: false,
};

const navSlice = createSlice({
  name: "navSlice",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isShowSidebar = !state.isShowSidebar;
    },
  },
});

export default navSlice.reducer;
export const { toggleSidebar } = navSlice.actions;
