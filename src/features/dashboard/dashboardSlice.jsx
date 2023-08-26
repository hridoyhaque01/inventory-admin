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
        console.log("phase 1");

        if (item?.storeId === storeId) {
          console.log("phase 2");

          return {
            ...item,
            storeDetails: item?.storeDetails?.map((detail) => {
              console.log("phase 3");

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
