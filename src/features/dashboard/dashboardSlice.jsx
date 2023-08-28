import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeData: {},
};

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState,
  reducers: {
    setStoreData: (state, action) => {
      state.storeData = action.payload;
    },

    updatePaidToOwner: (state, action) => {
      const { storeId, payment } = action.payload;

      state.storeData.resultData = state.storeData?.resultData?.map((item) => {
        if (item?.storeId === storeId) {
          return {
            ...item,
            storeDetails: item?.storeDetails?.map((detail) => {
              return {
                ...detail,
                finalPaid: parseInt(detail.finalPaid) + parseInt(payment),
                finalRemaining:
                  parseInt(detail.finalRemaining) - parseInt(payment),
              };
            }),
          };
        }
        return item;
      });

      // const prevPaid = state.storeData.cardData.totalPaidToOwner;
      // state.storeData.cardData.totalPaidToOwner =
      //   parseInt(prevPaid) + parseInt(payment);
    },
  },
});

export default dashboardSlice.reducer;
export const { setStoreData, updatePaidToOwner } = dashboardSlice.actions;
