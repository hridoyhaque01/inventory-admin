import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "store0",
};

const storeSlice = createSlice({
  name: "storeSlice",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      localStorage.setItem("activeTab", action.payload);
    },
  },
});

export default storeSlice.reducer;
export const { setActiveTab } = storeSlice.actions;
