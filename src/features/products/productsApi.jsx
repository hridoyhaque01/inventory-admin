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
          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getProducts",
                undefined,
                (draft) => {
                  const index = draft.findIndex(
                    (prdouct) => prdouct._id === id
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
    getProductsById: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get a random user
        const { data } = await fetchWithBQ(`/addproducts`);
        const findObj = data?.find((item) => {
          return item?.productId === _arg;
        });

        return {
          data: findObj,
        };
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useUpdateProductMutation,
  useAddProductMutation,
  useGetProductsByIdQuery,
} = productsApi;
