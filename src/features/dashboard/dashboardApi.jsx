import { apiSlice } from "../api/apiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
            const storePayments =
              store?.paidToOwner?.length > 0
                ? store?.paidToOwner?.reduce((storeTotal, payment) => {
                    if (new Date(payment?.timestamp * 1000).getDate() === day) {
                      return storeTotal + parseInt(payment?.payment);
                    }
                    return storeTotal;
                  }, 0)
                : 0;
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
          expencesData?.push({ Expense: expenses });

          // Add the day and date to the dates array
          const formattedDate = `${monthNames[currentMonth]}/${
            day < 10 ? "0" : ""
          }${day}`;
          dates.push({ day, Date: formattedDate });
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
              Day: day,
              Date: formattedDate,
              Revenue: storeResult?.revenueData[day - 1]?.revenue,
              Sales: storeResult?.salesData[day - 1]?.sales,
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
              Day: day,
              Date: formattedDate,
              Due: storeResult?.dueData[day - 1]?.due,
              Sales: storeResult?.salesData[day - 1]?.sales,
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
              Day: day,
              Date: formattedDate,
              Recieved: storeResult?.paidToOnwerData[day - 1]?.paidToOwner,
              Sales: storeResult?.salesData[day - 1]?.sales,
            });
          }
          salesAndRecieveData.push(...dayData);
        }
        console.log(paidToOnwerData);

        // sales and profit

        for (let day = 1; day <= 31; day++) {
          const formattedDate = `${monthNames[currentMonth]}/${
            day < 10 ? "0" : ""
          }${day}`;

          const dayData = [];

          for (const storeResult of results) {
            dayData.push({
              Day: day,
              Date: formattedDate,
              Profit: storeResult?.profitData[day - 1]?.profit,
              Sales: storeResult?.salesData[day - 1]?.sales,
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
              Day: day,
              Date: formattedDate,
              Expense: storeResult?.expencesData[day - 1]?.Expense,
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
          dates.push({ day, Date: formattedDate });
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
