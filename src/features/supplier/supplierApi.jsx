import { apiSlice } from "../api/apiSlice";

export const supplierApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSuppliers: builder.query({
      query: () => ({
        url: `/suppliers`,
      }),
    }),
    addSupplier: builder.mutation({
      query: (data) => ({
        url: "/suppliers/add",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getSuppliers",
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

    updateSuppliers: builder.mutation({
      query: ({ data, id }) => ({
        url: `/suppliers/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ data, id }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getSuppliers",
                undefined,
                (draft) => {
                  const index = draft.findIndex(
                    (supplier) => supplier._id === id
                  );
                  if (index !== -1) {
                    draft[index] = { ...draft[index], ...result?.data };
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
  useGetSuppliersQuery,
  useUpdateSuppliersMutation,
  useAddSupplierMutation,
} = supplierApi;
