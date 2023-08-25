import { apiSlice } from "../api/apiSlice";
import { productsApi } from "../products/productsApi";
import { supplierApi } from "../supplier/supplierApi";

export const buySuppliesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupplies: builder.query({
      query: () => ({
        url: `/supplierinvoices`,
      }),
    }),
    addSupplies: builder.mutation({
      query: ({ data, productId, productData, supplierId, supplierData }) => ({
        url: "/supplierinvoices/add",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(
        { productId, productData, supplierId, supplierData },
        { queryFulfilled, dispatch }
      ) {
        try {
          const result = await queryFulfilled;

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

            dispatch(
              productsApi.endpoints.updateProduct.initiate({
                data: productData,
                id: productId,
              })
            );

            dispatch(
              supplierApi.endpoints.updateSuppliers.initiate({
                data: supplierData,
                id: supplierId,
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
  useGetSuppliesQuery,
  useUpdateSuppliersMutation,
  useAddSuppliesMutation,
} = buySuppliesApi;
