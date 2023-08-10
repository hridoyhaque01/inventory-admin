import { apiSlice } from "../api/apiSlice";

const owesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOwes: builder.query({
      query: () => ({
        url: "/owes",
      }),
    }),
  }),
});

export const { useGetAllOwesQuery } = owesApi;
