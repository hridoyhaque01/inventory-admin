import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeData: [],
};

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {
    setStoreData: (state, action) => {
      state.storeData = action.payload;
    },
  },
});

export default dashboardSlice.reducer;
export const { setStoreData } = dashboardSlice.actions;
