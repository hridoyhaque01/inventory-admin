import { apiSlice } from "../api/apiSlice";

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardResult: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get a random user
        const { data: invoices } = await fetchWithBQ("/invoices");
        const monthlySalesMap = new Map();
        // const monthlySalesMap = new Map();

        invoices.forEach((invoice) => {
          const payDate = new Date(invoice.timestamp * 1000); // Convert UNIX timestamp to JavaScript date
          const month = payDate.toLocaleString("default", { month: "short" }); // Get month name (e.g., "Aug")

          if (monthlySalesMap.has(month)) {
            monthlySalesMap.set(
              month,
              monthlySalesMap.get(month) + invoice.totalAmount
            );
          } else {
            monthlySalesMap.set(month, invoice.totalAmount);
          }
        });

        const summarizedSales = [];
        monthlySalesMap.forEach((sales, month) => {
          summarizedSales.push({ name: month, sales: sales });
        });

        invoices.forEach((invoice) => {
          const payDate = new Date(invoice.timestamp * 1000); // Convert UNIX timestamp to JavaScript date
          const month = payDate.toLocaleString("default", { month: "short" }); // Get month name (e.g., "Aug")

          if (monthlySalesMap.has(month)) {
            monthlySalesMap.set(
              month,
              monthlySalesMap.get(month) + invoice.totalAmount
            );
          } else {
            monthlySalesMap.set(month, invoice.totalAmount);
          }
        });

        const summarizedCosts = [];
        monthlySalesMap.forEach((sales, month) => {
          summarizedSales.push({ name: month, sales: sales });
        });

        const totalSales = invoices?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue?.totalAmount,
          0
        );

        return { data: { totalSales, salesData: summarizedSales } };
      },
    }),
  }),
});

export const { useGetDashboardResultQuery } = dashboardApi;
