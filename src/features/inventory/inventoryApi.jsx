import { apiSlice } from "../api/apiSlice";
import { productsApi } from "../products/productsApi";

const inventoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInventories: builder.query({
      query: () => ({
        url: "/products",
      }),

      // providesTags: ["products"],
    }),

    addProducts: builder.mutation({
      query: ({ data, productData, productId }) => ({
        url: "/products/add",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(
        { data, productData, productId },
        { queryFulfilled, dispatch }
      ) {
        try {
          const result = await queryFulfilled;
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

            dispatch(
              productsApi.endpoints.updateProduct.initiate({
                data: productData,
                id: productId,
              })
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updateProducts: builder.mutation({
      query: ({ data, storeId, productData, productId }) => ({
        url: `/products/update/${storeId}`,
        method: "PATCH",
        body: data,
      }),
      // invalidatesTags: ["products"],
      async onQueryStarted(
        { data, storeId, productData, productId },
        { queryFulfilled, dispatch }
      ) {
        try {
          const result = await queryFulfilled;
          const formData = JSON.parse(data.get("data"));
          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getInventories",
                undefined,
                (draft) => {
                  const changeObj = draft.find(
                    (prdouct) =>
                      prdouct.productId === formData?.productId &&
                      prdouct.storeId === storeId
                  );
                  if (changeObj) {
                    changeObj.productName = formData.productName;
                    changeObj.productQuantity = formData.productQuantity;
                    changeObj.unitLeft = formData.unitLeft;
                  }
                }
              )
            );
            dispatch(
              productsApi.endpoints.updateProduct.initiate({
                data: productData,
                id: productId,
              })
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
