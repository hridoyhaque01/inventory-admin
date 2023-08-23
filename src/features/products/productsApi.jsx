import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `/addproducts`,
      }),
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/addproducts/add",
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
                "getProducts",
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

    updateProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/addproducts/update/${id}`,
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
                "getProducts",
                undefined,
                (draft) => {
                  const changeObj = draft.find((product) => product._id === id);
                  if (changeObj) {
                    changeObj.productName = formData.productName;
                    changeObj.productCategory = formData.productCategory;
                    changeObj.productUnit = formData.productUnit;
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
  useGetProductsQuery,
  useUpdateProductMutation,
  useAddProductMutation,
} = productsApi;
