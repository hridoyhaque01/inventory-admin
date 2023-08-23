import { apiSlice } from "../api/apiSlice";

export const buySuppliesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupplies: builder.query({
      query: () => ({
        url: `/supplierinvoices`,
      }),
    }),
    addSupplies: builder.mutation({
      query: (data) => ({
        url: "/supplierinvoices/add",
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
                "getSupplies",
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
      // invalidatesTags: ["products"],
      async onQueryStarted({ data, id }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const formData = JSON.parse(data.get("data"));
          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getSupplies",
                undefined,
                (draft) => {
                  const changeObj = draft.find(
                    (supplier) => supplier._id === id
                  );
                  if (changeObj) {
                    changeObj.supplierName = formData.supplierName;
                    changeObj.supplierPhone = formData.supplierPhone;
                    changeObj.supplierAddress = formData.supplierAddress;
                    if (formData.supplierDue) {
                      changeObj.supplierDue = formData.supplierDue;
                    }
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
  useGetSuppliesQuery,
  useUpdateSuppliersMutation,
  useAddSuppliesMutation,
} = buySuppliesApi;
