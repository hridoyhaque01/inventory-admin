import { apiSlice } from "../api/apiSlice";

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardResult: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get a random user
        const { data: invoices } = await fetchWithBQ("/invoices");
        const monthlySalesMap = new Map();
        const monthlyCostMap = new Map();
        const summarizedCosts = [];
        const summarizedSales = [];

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

        invoices.forEach((invoice) => {
          const payDate = new Date(invoice.timestamp * 1000); // Convert UNIX timestamp to JavaScript date
          const month = payDate.toLocaleString("default", { month: "short" }); // Get month name (e.g., "Aug")

          if (monthlyCostMap.has(month)) {
            monthlyCostMap.set(
              month,
              monthlyCostMap.get(month) +
                Number(invoice.buyingPrice * invoice?.unitCount)
            );
          } else {
            monthlyCostMap.set(
              month,
              Number(invoice.buyingPrice * invoice?.unitCount)
            );
          }
        });

        monthlySalesMap.forEach((sales, month) => {
          summarizedSales.push({ name: month, sales: sales });
        });

        monthlyCostMap.forEach((costs, month) => {
          summarizedCosts.push({ name: month, costs: costs });
        });

        const totalSales = invoices?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue?.totalAmount,
          0
        );

        const totalCosts = invoices?.reduce(
          (accumulator, currentValue) =>
            accumulator +
            Number(currentValue?.totalAmount) * currentValue?.unitCount,
          0
        );

        const totalDues = invoices?.reduce(
          (accumulator, currentValue) =>
            accumulator + Number(currentValue?.dueAmount),
          0
        );

        return {
          data: {
            totalSales,
            totalCosts,
            totalDues,
            salesData: summarizedSales,
            costsData: summarizedCosts,
          },
        };
      },
    }),
    getStoreDashboardResult: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get a random user
        const { data: invoices } = await fetchWithBQ(`/invoices/store/${_arg}`);

        const totalSales = invoices?.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue?.totalAmount,
          0
        );

        const totalCosts = invoices?.reduce(
          (accumulator, currentValue) =>
            accumulator +
            Number(currentValue?.totalAmount) * currentValue?.unitCount,
          0
        );

        const totalDues = invoices?.reduce(
          (accumulator, currentValue) =>
            accumulator + Number(currentValue?.dueAmount),
          0
        );

        return {
          data: {
            totalSales,
            totalCosts,
            totalDues,
          },
        };
      },
    }),
  }),
});

export const { useGetDashboardResultQuery, useGetStoreDashboardResultQuery } =
  dashboardApi;
