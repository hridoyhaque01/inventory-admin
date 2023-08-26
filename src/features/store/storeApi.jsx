import { apiSlice } from "../api/apiSlice";
import { updatePaidToOwner } from "../dashboard/dashboardSlice";

const storeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStores: builder.query({
      query: () => ({
        url: "/stores",
      }),
    }),
    updateStorePassword: builder.mutation({
      query: (data) => ({
        url: `/stores/reset/`,
        method: "PATCH",
        body: data,
      }),
    }),
    registerStore: builder.mutation({
      query: (data) => ({
        url: "/stores/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData("getStores", undefined, (draft) => {
                draft?.push(result?.data);
              })
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updatePayment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/stores/payment/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data) {
            const payment = result?.data?.payment;
            console.log(payment);
            console.log(id);
            dispatch(updatePaidToOwner({ payment, storeId: id }));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetStoresQuery,
  useUpdateStorePasswordMutation,
  useRegisterStoreMutation,
  useUpdatePaymentMutation,
} = storeApi;
