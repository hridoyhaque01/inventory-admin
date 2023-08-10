import { apiSlice } from "../api/apiSlice";

const expensesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => ({
        url: "/expenses",
      }),
    }),

    addExpense: builder.mutation({
      query: (data) => ({
        url: "/expenses/add",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getExpenses",
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
    updateExpense: builder.mutation({
      query: ({ data, id }) => ({
        url: `/expenses/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      // invalidatesTags: ["products"],
      async onQueryStarted({ data, id }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result?.data);
          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getExpenses",
                undefined,
                (draft) => {
                  const updatedExpense = draft.find(
                    (expense) => expense._id === id
                  );
                  // console.log(JSON.stringify(draft));
                  if (updatedExpense) {
                    updatedExpense.date = result?.data?.date;
                    updatedExpense.description = result?.data?.description;
                    updatedExpense.amount = result?.data?.amount;
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
  useGetExpensesQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
} = expensesApi;
