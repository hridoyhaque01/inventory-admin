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
          const payDate = new Date(invoice?.timestamp * 1000); // Convert UNIX timestamp to JavaScript date
          const month = payDate.toLocaleString("default", { month: "short" }); // Get month name (e.g., "Aug")

          if (monthlySalesMap.has(month)) {
            monthlySalesMap.set(
              month,
              monthlySalesMap.get(month) + invoice?.totalAmount
            );
          } else {
            monthlySalesMap.set(month, invoice?.totalAmount);
          }
        });

        invoices.forEach((invoice) => {
          const payDate = new Date(invoice?.timestamp * 1000); // Convert UNIX timestamp to JavaScript date
          const month = payDate.toLocaleString("default", { month: "short" }); // Get month name (e.g., "Aug")

          if (monthlyCostMap.has(month)) {
            monthlyCostMap.set(
              month,
              monthlyCostMap.get(month) +
                Number(invoice?.buyingPrice * invoice?.unitCount)
            );
          } else {
            monthlyCostMap.set(
              month,
              Number(invoice?.buyingPrice * invoice?.unitCount)
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
    getDashboardNewResult: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get a random user
        const { data: storeData } = await fetchWithBQ(`/stores/find/${_arg}`);
        const { invoices, paidToOwner } = storeData || {};
        const groupedPayments = {};
        paidToOwner.forEach((payment) => {
          const date = new Date(payment?.timestamp * 1000).toLocaleDateString(
            "en-US"
          );
          if (!groupedPayments[date]) {
            groupedPayments[date] = 0; // Initialize totalPaid for the date
          }
          groupedPayments[date] += parseInt(payment?.payment);
        });

        // Group invoices by date
        const groupedInvoices = {};
        invoices.forEach((invoice) => {
          const date = new Date(invoice?.timestamp * 1000).toLocaleDateString(
            "en-US"
          );
          if (!groupedInvoices[date]) {
            groupedInvoices[date] = [];
          }
          groupedInvoices[date].push(invoice);
        });

        // Calculate required values for each date
        const storeDetails = [];
        for (const date in groupedInvoices) {
          const invoiceGroup = groupedInvoices[date];
          const totalDue = invoiceGroup.reduce(
            (acc, invoice) => acc + parseInt(invoice?.dueAmount),
            0
          );
          const totalSales = invoiceGroup.reduce(
            (acc, invoice) => acc + invoice?.totalAmount,
            0
          );
          const totalCost = invoiceGroup.reduce(
            (acc, invoice) => acc + invoice?.buyingPrice * invoice?.unitCount,
            0
          );

          const totalPaidToOwner = groupedPayments[date] || 0;
          const invoiceRevenue = invoiceGroup.reduce(
            (acc, invoice) => acc + parseInt(invoice?.paidAmount),
            0
          );
          const paymentRevenue = totalPaidToOwner;
          const revenue = invoiceRevenue + paymentRevenue;
          const remaining = revenue - totalPaidToOwner;

          const storeDetailsEntry = {
            totalDue: totalDue,
            revenue: revenue,
            totalCost: totalCost,
            totalSales: totalSales,
            date: date,
            totalPaidToOwner: totalPaidToOwner,
            remaining: remaining,
            storeName: invoices[0]?.storeName || "",
          };
          storeDetails.push(storeDetailsEntry);
        }

        // Sort storeDetails array by latest date
        storeDetails.sort((a, b) => new Date(b.date) - new Date(a.date));
        return {
          data: storeDetails,
        };
      },
    }),
    getAllStoreResult: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get a random user
        const { data: storeData } = await fetchWithBQ(`/stores`);
        const { data: expenses } = await fetchWithBQ(`/expenses`);
        const { data: supplierinvoices } = await fetchWithBQ(
          `/supplierinvoices`
        );
        const resultData = [];
        const mainData = [];

        const totalSuppliesCosts = supplierinvoices?.reduce(
          (acc, supplies) => acc + parseInt(supplies?.totalAmount),
          0
        );

        const totalExpenses = expenses.reduce(
          (acc, supplies) => acc + parseInt(supplies?.amount),
          0
        );

        const totalCosts = totalSuppliesCosts + totalExpenses;
        let totalRevenueInit = 0;
        let totalDueInit = 0;
        let totalSalesInit = 0;
        let totalPaidToOwnerInit = 0;
        const cardData = {};

        storeData.forEach((store) => {
          const storeName = store?.name;
          const storeId = store?._id;

          // Group paidToOwner by date for the current store
          const groupedPayments = {};
          store.paidToOwner.forEach((payment) => {
            const date = new Date(payment?.timestamp * 1000).toLocaleDateString(
              "en-US"
            );
            if (!groupedPayments[date]) {
              groupedPayments[date] = 0; // Initialize totalPaid for the date
            }
            groupedPayments[date] += parseInt(payment?.payment);
          });

          // Group invoices by date for the current store
          const groupedInvoices = {};
          store.invoices.forEach((invoice) => {
            const date = new Date(invoice?.timestamp * 1000).toLocaleDateString(
              "en-US"
            );
            if (!groupedInvoices[date]) {
              groupedInvoices[date] = [];
            }
            groupedInvoices[date].push(invoice);
          });

          // Calculate required values for each date for the current store
          const storeDetails = [];
          for (const date in groupedInvoices) {
            const invoiceGroup = groupedInvoices[date];
            const totalDue = invoiceGroup.reduce(
              (acc, invoice) => acc + parseInt(invoice?.dueAmount),
              0
            );
            const totalSales = invoiceGroup.reduce(
              (acc, invoice) => acc + invoice?.totalAmount,
              0
            );
            const totalCost = invoiceGroup.reduce(
              (acc, invoice) => acc + invoice?.buyingPrice * invoice?.unitCount,
              0
            );

            const totalPaidToOwner = groupedPayments[date] || 0;
            const invoiceRevenue = invoiceGroup.reduce(
              (acc, invoice) => acc + parseInt(invoice?.paidAmount),
              0
            );
            const paymentRevenue = totalPaidToOwner;
            const revenue = invoiceRevenue;
            const remaining = revenue - totalPaidToOwner;

            const storeDetailsEntry = {
              totalDue: totalDue,
              revenue: revenue,
              totalCost: totalCost,
              totalSales: totalSales,
              date: date,
              totalPaidToOwner: totalPaidToOwner,
              remaining: remaining,
              storeName,
              storeId,
            };
            storeDetails.push(storeDetailsEntry);

            totalRevenueInit += revenue;
            totalDueInit += totalDue;
            totalSalesInit += totalSales;
            totalPaidToOwnerInit += totalPaidToOwner;
          }

          resultData.push(storeDetails);
        });
        cardData.totalRevenue = totalRevenueInit;
        cardData.totalDue = totalDueInit;
        cardData.totalSales = totalSalesInit;
        cardData.totalPaidToOwner = totalPaidToOwnerInit;
        cardData.totalCosts = totalCosts;

        //       const totalrevenue = results.reduce((acc, result) => acc + result.revenue, 0);
        // const totalDue = results.reduce((acc, result) => acc + result.totalDue, 0);
        // const totalCost = results.reduce((acc, result) => acc + result.totalCost, 0);
        // const totalSales = results.reduce(
        //   (acc, result) => acc + result.totalSales,
        //   0
        // );

        return {
          data: { resultData, cardData },
        };
      },
    }),
  }),
});

export const {
  useGetDashboardResultQuery,
  useGetDashboardNewResultQuery,
  useGetStoreDashboardResultQuery,
  useGetAllStoreResultQuery,
} = dashboardApi;
