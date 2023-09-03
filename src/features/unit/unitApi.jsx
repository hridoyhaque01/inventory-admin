import { apiSlice } from "../api/apiSlice";

const unitApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUnits: builder.query({
      query: () => ({
        url: "/units",
      }),
      // providesTags: ["products"],
    }),

    addUnit: builder.mutation({
      query: (data) => ({
        url: "/units/add",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData("getUnits", undefined, (draft) => {
                draft?.push(result?.data);
              })
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    updateUnit: builder.mutation({
      query: ({ data, id }) => ({
        url: `/units/update/${id}`,
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
              apiSlice.util.updateQueryData("getUnits", undefined, (draft) => {
                const index = draft.findIndex(
                  (category) => category._id === id
                );
                console.log(index);

                if (index !== -1) {
                  draft[index] = { ...draft[index], ...result?.data };
                }
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

export const { useGetUnitsQuery, useAddUnitMutation, useUpdateUnitMutation } =
  unitApi;
