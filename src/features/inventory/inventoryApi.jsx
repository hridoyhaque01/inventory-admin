import { apiSlice } from "../api/apiSlice";

const inventoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInventories: builder.query({
      query: () => ({
        url: "/products",
      }),

      // providesTags: ["products"],
    }),

    addProducts: builder.mutation({
      query: (data) => ({
        url: "/products/add",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getInventories",
                undefined,
                (draft) => {
                  draft?.push(result?.data);
                }
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateProducts: builder.mutation({
      query: ({ data, id }) => ({
        url: `/products/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      // invalidatesTags: ["products"],
      async onQueryStarted({ data, id }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getInventories",
                undefined,
                (draft) => {
                  const index = draft.findIndex(
                    (prdouct) => prdouct.productId === id
                  );
                  // console.log(JSON.stringify(draft));
                  if (index !== -1) {
                    draft[index] = result?.data;
                  }
                }
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetInventoriesQuery,
  useAddProductsMutation,
  useUpdateProductsMutation,
} = inventoryApi;
