import { apiSlice } from "../api/apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getAllStoreResult: builder.query({
    //   async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
    //     // get a random user
    //     const { data: storeData } = await fetchWithBQ(`/stores`);
    //     const { data: expenses } = await fetchWithBQ(`/expenses`);
    //     const { data: supplierinvoices } = await fetchWithBQ(
    //       `/supplierinvoices`
    //     );

    //     const resultData = [];

    //     const totalSuppliesCosts = supplierinvoices?.reduce(
    //       (acc, supplies) => acc + parseInt(supplies?.totalAmount),
    //       0
    //     );

    //     const totalExpenses = expenses?.reduce(
    //       (acc, supplies) => acc + parseInt(supplies?.amount),
    //       0
    //     );

    //     const totalCosts = totalSuppliesCosts + totalExpenses;
    //     let totalRevenueInit = 0;
    //     let totalDueInit = 0;
    //     let totalSalesInit = 0;
    //     let totalPaidToOwnerInit = 0;
    //     const cardData = {};
    //     let tablePaidToOwnerInit = 0;
    //     let tableRevenueInit = 0;
    //     let tableTableRemainingInit = 0;

    //     const monthlySalesMap = new Map();
    //     const monthlyCostMap = new Map();

    //     const summarizedCosts = [];
    //     const summarizedSales = [];

    //     storeData?.forEach((store) => {
    //       const storeName = store?.name;
    //       const storeId = store?._id;

    //       // Group paidToOwner by date for the current store
    //       const groupedPayments = {};
    //       store?.paidToOwner?.forEach((payment) => {
    //         const date = new Date(payment?.timestamp * 1000).toLocaleDateString(
    //           "en-US"
    //         );
    //         if (!groupedPayments[date]) {
    //           groupedPayments[date] = 0; // Initialize totalPaid for the date
    //         }
    //         groupedPayments[date] += parseInt(payment?.payment);
    //       });

    //       tablePaidToOwnerInit = store?.paidToOwner?.reduce(
    //         (acc, invoice) => acc + parseInt(invoice?.payment),
    //         0
    //       );

    //       // console.log({ tablePaidToOwnerInit });
    //       tableRevenueInit = store?.invoices?.reduce(
    //         (acc, invoice) => acc + parseInt(invoice?.paidAmount),
    //         0
    //       );

    //       tableTableRemainingInit = tablePaidToOwnerInit
    //         ? tableRevenueInit - tablePaidToOwnerInit
    //         : tableRevenueInit;

    //       // console.log(tableTableRemainingInit);

    //       // Group invoices by date for the current store
    //       const groupedInvoices = {};
    //       store?.invoices?.forEach((invoice) => {
    //         const date = new Date(invoice?.timestamp * 1000).toLocaleDateString(
    //           "en-US"
    //         );
    //         if (!groupedInvoices[date]) {
    //           groupedInvoices[date] = [];
    //         }
    //         groupedInvoices[date].push(invoice);
    //       });

    //       // chart data

    //       store?.invoices?.forEach((invoice) => {
    //         const payDate = new Date(invoice?.timestamp * 1000);
    //         const month = payDate.toLocaleString("default", { month: "short" });

    //         // Sales Calculation
    //         if (monthlySalesMap?.has(month)) {
    //           monthlySalesMap?.set(
    //             month,
    //             monthlySalesMap?.get(month) + parseInt(invoice?.totalAmount)
    //           );
    //         } else {
    //           monthlySalesMap?.set(month, parseInt(invoice?.totalAmount));
    //         }

    //         const costForInvoice =
    //           parseInt(invoice?.buyingPrice) * parseInt(invoice?.unitCount);

    //         if (monthlyCostMap?.has(month)) {
    //           monthlyCostMap?.set(
    //             month,
    //             monthlyCostMap?.get(month) + costForInvoice
    //           );
    //         } else {
    //           monthlyCostMap?.set(month, costForInvoice);
    //         }

    //         // console.log(monthlyCostMap);
    //       });

    //       // console.log(monthlySalesMap);

    //       monthlySalesMap?.forEach((sales, month) => {
    //         summarizedSales?.push({ name: month, sales: sales });
    //       });

    //       monthlyCostMap?.forEach((costs, month) => {
    //         summarizedCosts?.push({ name: month, costs: costs });
    //       });

    //       // Calculate required values for each date for the current store
    //       const storeDetails = [];

    //       for (const date in groupedInvoices) {
    //         const invoiceGroup = groupedInvoices[date];
    //         const totalDue = invoiceGroup.reduce(
    //           (acc, invoice) => acc + parseInt(invoice?.dueAmount),
    //           0
    //         );
    //         const totalSales = invoiceGroup.reduce(
    //           (acc, invoice) => acc + invoice?.totalAmount,
    //           0
    //         );
    //         const totalCost = invoiceGroup.reduce(
    //           (acc, invoice) => acc + invoice?.buyingPrice * invoice?.unitCount,
    //           0
    //         );

    //         const totalPaidToOwner = groupedPayments[date] || 0;
    //         const invoiceRevenue = invoiceGroup.reduce(
    //           (acc, invoice) => acc + parseInt(invoice?.paidAmount),
    //           0
    //         );
    //         const paymentRevenue = totalPaidToOwner;
    //         const revenue = invoiceRevenue;
    //         const remaining = revenue - totalPaidToOwner;

    //         const storeDetailsEntry = {
    //           totalDue: totalDue || 0,
    //           revenue: revenue || 0,
    //           totalCost: totalCost || 0,
    //           totalSales: totalSales || 0,
    //           date: date,
    //           totalPaidToOwner: totalPaidToOwner || 0,
    //           finalPaid: tablePaidToOwnerInit || 0,
    //           finalRemaining: tableTableRemainingInit || 0,
    //           remaining: remaining || 0,
    //         };
    //         storeDetails.push(storeDetailsEntry);
    //         // console.log(storeDetailsEntry);
    //         totalRevenueInit += revenue;
    //         totalDueInit += totalDue;
    //         totalSalesInit += totalSales;
    //         totalPaidToOwnerInit += totalPaidToOwner;
    //       }
    //       storeDetails.sort((a, b) => new Date(b.date) - new Date(a.date));
    //       resultData.push({ storeDetails, storeName, storeId });
    //     });
    //     cardData.totalRevenue = totalRevenueInit;
    //     cardData.totalDue = totalDueInit;
    //     cardData.totalSales = totalSalesInit;
    //     cardData.totalPaidToOwner = tablePaidToOwnerInit;
    //     cardData.totalCosts = totalCosts;

    //     // console.log(tablePaidToOwnerInit);
    //     return {
    //       data: { resultData, cardData },
    //     };
    //   },
    //   providesTags: ["dashboard"],
    // }),
    getChartData: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get a random user
        const { data } = await fetchWithBQ(`/stores`);
        const { data: myExpense } = await fetchWithBQ(`/expenses`);
        const { data: supplierinvoices } = await fetchWithBQ(
          `/supplierinvoices`
        );
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        // Function to get the last day of a given month and year
        // Initialize the arrays for each data category

        const revenueData = [];
        const paidToOnwerData = [];
        const salesData = [];
        const dueData = [];
        const profitData = [];
        const expencesData = [];
        const dates = [];
        const results = [];
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        const cardData = {};

        for (let day = 1; day <= 31; day++) {
          const dateString = `${currentYear}-${currentMonth + 1}-${day}`;

          // configue cardData

          // Calculate revenue for lift time

          const lifetimeRevenue = data?.reduce((total, store) => {
            const storeLifetimeRevenue = store?.invoices?.reduce(
              (storeTotal, invoice) => {
                return storeTotal + parseInt(invoice?.paidAmount);
              },
              0
            );
            return total + storeLifetimeRevenue;
          }, 0);

          // Calculate due for lift time

          const lifetimeDue = data?.reduce((total, store) => {
            const storeLifetimeDue = store?.invoices?.reduce(
              (storeTotal, invoice) => {
                return storeTotal + parseInt(invoice?.dueAmount);
              },
              0
            );
            return total + storeLifetimeDue;
          }, 0);

          // Calculate sales for lift time

          const lifetimeSales = data?.reduce((total, store) => {
            const storeLifetimeSales = store?.invoices?.reduce(
              (storeTotal, invoice) => {
                return storeTotal + parseInt(invoice?.totalAmount);
              },
              0
            );
            return total + storeLifetimeSales;
          }, 0);

          // Calculate recieve for lift time

          const lifetimeRecieve = data?.reduce((total, store) => {
            const storeLifetimeRecieve = store?.paidToOwner?.reduce(
              (storeTotal, invoice) => {
                return storeTotal + parseInt(invoice?.payment);
              },
              0
            );
            return total + storeLifetimeRecieve;
          }, 0);

          const totalSuppliesCosts = supplierinvoices?.reduce(
            (acc, supplies) => acc + parseInt(supplies?.totalAmount),
            0
          );

          const totalExpenses = myExpense?.reduce(
            (acc, supplies) => acc + parseInt(supplies?.amount),
            0
          );

          const totalCosts = totalSuppliesCosts + totalExpenses;

          cardData.revenue = lifetimeRevenue;
          cardData.costs = totalCosts;
          cardData.sales = lifetimeSales;
          cardData.recive = lifetimeRecieve;
          cardData.due = lifetimeDue;

          // Calculate revenue for the day
          const revenue = data?.reduce((total, store) => {
            const storeRevenue = store?.invoices?.reduce(
              (storeTotal, invoice) => {
                if (new Date(invoice?.payDate * 1000).getDate() === day) {
                  return storeTotal + parseInt(invoice?.paidAmount);
                }
                return storeTotal;
              },
              0
            );
            return total + storeRevenue;
          }, 0);
          revenueData?.push({ revenue });

          // Calculate paidToOnwer for the day

          const paidToOwner = data?.reduce((total, store) => {
            const storePayments = store?.paidToOwner?.reduce(
              (storeTotal, payment) => {
                if (new Date(payment?.timestamp * 1000).getDate() === day) {
                  return storeTotal + parseInt(payment?.payment);
                }
                return storeTotal;
              },
              0
            );
            return total + storePayments;
          }, 0);
          paidToOnwerData?.push({ paidToOwner });

          // Calculate sales for the day
          const sales = data?.reduce((total, store) => {
            const storeSales = store?.invoices?.reduce(
              (storeTotal, invoice) => {
                if (new Date(invoice?.payDate * 1000).getDate() === day) {
                  return storeTotal + parseInt(invoice?.totalAmount);
                }
                return storeTotal;
              },
              0
            );
            return total + storeSales;
          }, 0);
          salesData?.push({ sales });

          // Calculate profit for the day
          const profit = data?.reduce((total, store) => {
            const storeProfit = store?.invoices?.reduce(
              (storeTotal, invoice) => {
                if (new Date(invoice?.payDate * 1000).getDate() === day) {
                  const unitProfit =
                    parseInt(invoice?.unitPrice) -
                    parseInt(invoice?.buyingPrice);
                  return storeTotal + unitProfit * parseInt(invoice?.unitCount);
                }
                return storeTotal;
              },
              0
            );
            return total + storeProfit;
          }, 0);
          profitData?.push({ profit });

          // Calculate due for the day
          const due = data?.reduce((total, store) => {
            const storeDue = store?.invoices?.reduce((storeTotal, invoice) => {
              if (new Date(invoice?.payDate * 1000).getDate() === day) {
                return (
                  storeTotal +
                  (parseInt(invoice?.totalAmount) -
                    parseInt(invoice?.paidAmount))
                );
              }
              return storeTotal;
            }, 0);
            return total + storeDue;
          }, 0);
          dueData?.push({ due });

          // Assuming expenses are 0 for the example
          const expenses = myExpense?.reduce((total, expense) => {
            if (new Date(expense?.date).getDate() === day) {
              return total + parseInt(expense?.amount);
            }
            return total;
          }, 0);
          expencesData?.push({ expense: expenses });

          // Add the day and date to the dates array
          const formattedDate = `${monthNames[currentMonth]}/${
            day < 10 ? "0" : ""
          }${day}`;
          dates.push({ day, date: formattedDate });
        }

        const result = {
          revenueData,
          paidToOnwerData,
          salesData,
          dueData,
          profitData,
          expencesData,
          dates,
        };

        results.push(result);

        const revenueAndSalesData = [];
        const salesAndDueData = [];
        const salesAndRecieveData = [];
        const salesAndProfiteData = [];
        const finalExpenseData = [];

        for (let day = 1; day <= 31; day++) {
          const formattedDate = `${monthNames[currentMonth]}/${
            day < 10 ? "0" : ""
          }${day}`;

          const dayData = [];

          for (const storeResult of results) {
            dayData.push({
              day: day,
              date: formattedDate,
              revenue: storeResult?.revenueData[day - 1]?.revenue,
              sales: storeResult?.salesData[day - 1]?.sales,
            });
          }
          revenueAndSalesData.push(...dayData);
        }

        // sales and due

        for (let day = 1; day <= 31; day++) {
          const formattedDate = `${monthNames[currentMonth]}/${
            day < 10 ? "0" : ""
          }${day}`;

          const dayData = [];

          for (const storeResult of results) {
            dayData.push({
              day: day,
              date: formattedDate,
              due: storeResult?.dueData[day - 1]?.due,
              sales: storeResult?.salesData[day - 1]?.sales,
            });
          }
          salesAndDueData.push(...dayData);
        }

        // sales and recieve

        for (let day = 1; day <= 31; day++) {
          const formattedDate = `${monthNames[currentMonth]}/${
            day < 10 ? "0" : ""
          }${day}`;

          const dayData = [];

          for (const storeResult of results) {
            dayData.push({
              day: day,
              date: formattedDate,
              recieved: storeResult?.paidToOnwerData[day - 1]?.paidToOwner,
              sales: storeResult?.salesData[day - 1]?.sales,
            });
          }
          salesAndRecieveData.push(...dayData);
        }

        // sales and profit

        for (let day = 1; day <= 31; day++) {
          const formattedDate = `${monthNames[currentMonth]}/${
            day < 10 ? "0" : ""
          }${day}`;

          const dayData = [];

          for (const storeResult of results) {
            dayData.push({
              day: day,
              date: formattedDate,
              profit: storeResult?.profitData[day - 1]?.profit,
              sales: storeResult?.salesData[day - 1]?.sales,
            });
          }
          salesAndProfiteData.push(...dayData);
        }

        // final expenses
        for (let day = 1; day <= 31; day++) {
          const formattedDate = `${monthNames[currentMonth]}/${
            day < 10 ? "0" : ""
          }${day}`;

          const dayData = [];

          for (const storeResult of results) {
            dayData.push({
              day: day,
              date: formattedDate,
              expense: storeResult?.expencesData[day - 1]?.expense,
            });
          }
          finalExpenseData.push(...dayData);
        }

        const storeResult = {
          revenueAndSalesData,
          salesAndDueData,
          salesAndRecieveData,
          salesAndProfiteData,
          finalExpenseData,
        };

        // console.log(result);
        return {
          data: { storeResult, cardData },
        };
      },
      providesTags: ["dashboard"],
    }),
    getSingleStoreChartData: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        // get a random user
        const { data: storeData } = await fetchWithBQ(
          `/stores/find/64eb44a11f16fca4e6c82f4d`
        );

        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        const revenueData = [];
        const paidToOwnerData = [];
        const salesData = [];
        const dueData = [];
        const profitData = [];
        const dates = [];

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        for (let day = 1; day <= 31; day++) {
          const dateString = `${currentYear}-${currentMonth + 1}-${day}`;

          // Calculate revenue for the day
          const dailyRevenue = storeData?.invoices?.reduce(
            (totalRevenue, invoice) => {
              const invoiceDate = new Date(invoice?.payDate * 1000);
              if (
                invoiceDate.getDate() === day &&
                invoiceDate.getMonth() === currentMonth
              ) {
                totalRevenue += parseInt(invoice?.paidAmount);
              }
              return totalRevenue;
            },
            0
          );
          revenueData.push(dailyRevenue);

          // Calculate paidToOwner for the day
          const dailyPaidToOwner = storeData?.paidToOwner?.reduce(
            (totalPaid, payment) => {
              const paymentDate = new Date(payment?.timestamp * 1000);
              if (
                paymentDate.getDate() === day &&
                paymentDate.getMonth() === currentMonth
              ) {
                totalPaid += parseInt(payment?.payment);
              }
              return totalPaid;
            },
            0
          );
          paidToOwnerData.push(dailyPaidToOwner);

          // Calculate sales for the day
          const dailySales = storeData?.invoices?.reduce(
            (totalSales, invoice) => {
              const invoiceDate = new Date(invoice?.payDate * 1000);
              if (
                invoiceDate.getDate() === day &&
                invoiceDate.getMonth() === currentMonth
              ) {
                totalSales += parseInt(invoice?.totalAmount);
              }
              return totalSales;
            },
            0
          );
          salesData.push(dailySales);

          // Calculate profit for the day
          const dailyProfit = storeData?.invoices?.reduce(
            (totalProfit, invoice) => {
              const invoiceDate = new Date(invoice?.payDate * 1000);
              if (
                invoiceDate.getDate() === day &&
                invoiceDate.getMonth() === currentMonth
              ) {
                totalProfit +=
                  (parseInt(invoice?.unitPrice) -
                    parseInt(invoice?.buyingPrice)) *
                  parseInt(invoice?.unitCount);
              }
              return totalProfit;
            },
            0
          );
          profitData.push(dailyProfit);

          // Calculate due for the day
          const dailyDue = storeData?.invoices?.reduce((totalDue, invoice) => {
            const invoiceDate = new Date(invoice?.payDate * 1000);
            if (
              invoiceDate.getDate() === day &&
              invoiceDate.getMonth() === currentMonth
            ) {
              totalDue += parseInt(invoice?.dueAmount);
            }
            return totalDue;
          }, 0);
          dueData.push(dailyDue);

          // Add the day and formatted date to the dates array
          const formattedDate = `${monthNames[currentMonth]}/${
            day < 10 ? "0" : ""
          }${day}`;
          dates.push({ day, date: formattedDate });
        }

        const storeResult = {
          revenueData,
          paidToOwnerData,
          salesData,
          dueData,
          profitData,
          dates,
        };
        return {
          data: true,
        };
      },
      providesTags: ["ssdfff"],
    }),
  }),
});

export const {
  useGetAllStoreResultQuery,
  useGetChartDataQuery,
  useGetSingleStoreChartDataQuery,
} = dashboardApi;
