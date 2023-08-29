import { apiSlice } from "../api/apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStoreResult: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get a random user
        const { data: storeData } = await fetchWithBQ(`/stores`);
        const { data: expenses } = await fetchWithBQ(`/expenses`);
        const { data: supplierinvoices } = await fetchWithBQ(
          `/supplierinvoices`
        );

        const resultData = [];

        const totalSuppliesCosts = supplierinvoices?.reduce(
          (acc, supplies) => acc + parseInt(supplies?.totalAmount),
          0
        );

        const totalExpenses = expenses?.reduce(
          (acc, supplies) => acc + parseInt(supplies?.amount),
          0
        );

        const totalCosts = totalSuppliesCosts + totalExpenses;
        let totalRevenueInit = 0;
        let totalDueInit = 0;
        let totalSalesInit = 0;
        let totalPaidToOwnerInit = 0;
        const cardData = {};
        let tablePaidToOwnerInit = 0;
        let tableRevenueInit = 0;
        let tableTableRemainingInit = 0;

        const monthlySalesMap = new Map();
        const monthlyCostMap = new Map();

        const summarizedCosts = [];
        const summarizedSales = [];

        storeData.forEach((store) => {
          const storeName = store?.name;
          const storeId = store?._id;

          // Group paidToOwner by date for the current store
          const groupedPayments = {};
          store?.paidToOwner?.forEach((payment) => {
            const date = new Date(payment?.timestamp * 1000).toLocaleDateString(
              "en-US"
            );
            if (!groupedPayments[date]) {
              groupedPayments[date] = 0; // Initialize totalPaid for the date
            }
            groupedPayments[date] += parseInt(payment?.payment);
          });

          tablePaidToOwnerInit = store?.paidToOwner?.reduce(
            (acc, invoice) => acc + parseInt(invoice?.payment),
            0
          );

          // console.log({ tablePaidToOwnerInit });
          tableRevenueInit = store?.invoices?.reduce(
            (acc, invoice) => acc + parseInt(invoice?.paidAmount),
            0
          );

          tableTableRemainingInit = tablePaidToOwnerInit
            ? tableRevenueInit - tablePaidToOwnerInit
            : tableRevenueInit;

          // console.log(tableTableRemainingInit);

          // Group invoices by date for the current store
          const groupedInvoices = {};
          store?.invoices?.forEach((invoice) => {
            const date = new Date(invoice?.timestamp * 1000).toLocaleDateString(
              "en-US"
            );
            if (!groupedInvoices[date]) {
              groupedInvoices[date] = [];
            }
            groupedInvoices[date].push(invoice);
          });

          // chart data

          store?.invoices?.forEach((invoice) => {
            const payDate = new Date(invoice?.timestamp * 1000);
            const month = payDate.toLocaleString("default", { month: "short" });

            // Sales Calculation
            if (monthlySalesMap?.has(month)) {
              monthlySalesMap?.set(
                month,
                monthlySalesMap?.get(month) + parseInt(invoice?.totalAmount)
              );
            } else {
              monthlySalesMap?.set(month, parseInt(invoice?.totalAmount));
            }

            const costForInvoice =
              parseInt(invoice?.buyingPrice) * parseInt(invoice?.unitCount);

            if (monthlyCostMap?.has(month)) {
              monthlyCostMap?.set(
                month,
                monthlyCostMap?.get(month) + costForInvoice
              );
            } else {
              monthlyCostMap?.set(month, costForInvoice);
            }

            // console.log(monthlyCostMap);
          });

          // console.log(monthlySalesMap);

          monthlySalesMap?.forEach((sales, month) => {
            summarizedSales?.push({ name: month, sales: sales });
          });

          monthlyCostMap?.forEach((costs, month) => {
            summarizedCosts?.push({ name: month, costs: costs });
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
              totalDue: totalDue || 0,
              revenue: revenue || 0,
              totalCost: totalCost || 0,
              totalSales: totalSales || 0,
              date: date,
              totalPaidToOwner: totalPaidToOwner || 0,
              finalPaid: tablePaidToOwnerInit || 0,
              finalRemaining: tableTableRemainingInit || 0,
              remaining: remaining || 0,
            };
            storeDetails.push(storeDetailsEntry);
            // console.log(storeDetailsEntry);
            totalRevenueInit += revenue;
            totalDueInit += totalDue;
            totalSalesInit += totalSales;
            totalPaidToOwnerInit += totalPaidToOwner;
          }
          storeDetails.sort((a, b) => new Date(b.date) - new Date(a.date));
          resultData.push({ storeDetails, storeName, storeId });
        });
        cardData.totalRevenue = totalRevenueInit;
        cardData.totalDue = totalDueInit;
        cardData.totalSales = totalSalesInit;
        cardData.totalPaidToOwner = tablePaidToOwnerInit;
        cardData.totalCosts = totalCosts;

        // console.log(tablePaidToOwnerInit);
        return {
          data: { resultData, cardData },
        };
      },
      providesTags: ["dashboard"],
    }),
    getChartData: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get a random user
        const { data } = await fetchWithBQ(`/stores`);
        // Function to get the last day of a given month and year
        function getLastDayOfMonth(year, month) {
          return new Date(year, month + 1, 0).getDate();
        }

        // Get current date
        const currentDate = new Date();

        // Prepare the result arrays
        const totalSales = [];
        const totalRevenue = [];

        // Iterate through the days of the current month
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const lastDay = getLastDayOfMonth(currentYear, currentMonth);

        for (let day = 1; day <= lastDay; day++) {
          const dayEntry = { day: day };

          // Calculate totalSales and totalRevenue for the current day
          let previousMonthSales = 0;
          let currentMonthSales = 0;
          let previousMonthRevenue = 0;
          let currentMonthRevenue = 0;

          for (const store of data) {
            for (const invoice of store.invoices) {
              const invoiceDate = new Date(invoice.payDate * 1000);
              if (invoiceDate.getDate() === day) {
                if (invoiceDate.getMonth() === currentMonth) {
                  currentMonthSales += parseFloat(invoice.totalAmount);
                  currentMonthRevenue += parseFloat(invoice.paidAmount);
                } else if (invoiceDate.getMonth() === currentMonth - 1) {
                  previousMonthSales += parseFloat(invoice.totalAmount);
                  previousMonthRevenue += parseFloat(invoice.paidAmount);
                }
              }
            }
          }

          dayEntry[
            `${getMonthName(currentMonth)}/${day.toString().padStart(2, "0")}`
          ] = previousMonthSales;
          dayEntry[
            `${getMonthName(currentMonth + 1)}/${day
              .toString()
              .padStart(2, "0")}`
          ] = currentMonthSales;

          totalSales.push(dayEntry);

          dayEntry[
            `${getMonthName(currentMonth)}/${day.toString().padStart(2, "0")}`
          ] = previousMonthRevenue;
          dayEntry[
            `${getMonthName(currentMonth + 1)}/${day
              .toString()
              .padStart(2, "0")}`
          ] = currentMonthRevenue;

          totalRevenue.push(dayEntry);
        }

        console.log("Total Sales:", totalSales);
        console.log("Total Revenue:", totalRevenue);

        // Helper function to get month name
        function getMonthName(month) {
          const monthNames = [
            "",
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          return monthNames[month];
        }
        // console.log(tablePaidToOwnerInit);
        return {
          data: { totalRevenue, totalSales },
        };
      },
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetAllStoreResultQuery, useGetChartDataQuery } = dashboardApi;
