import { apiSlice } from "../api/apiSlice";

const storeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStores: builder.query({
      query: () => ({
        url: "/stores",
      }),
    }),

    getStoresResult: builder.query({
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
          const name = store?.name;
          const _id = store?._id;
          const location = store?.location;
          const email = store?.email;
          const timestamp = store?.timestamp;

          const storeData = {
            name,
            _id,
            location,
            email,
            timestamp,
          };

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
          resultData.push({ storeDetails, storeData });
        });
        cardData.totalRevenue = totalRevenueInit;
        cardData.totalDue = totalDueInit;
        cardData.totalSales = totalSalesInit;
        cardData.totalPaidToOwner = tablePaidToOwnerInit;
        cardData.totalCosts = totalCosts;

        // console.log(tablePaidToOwnerInit);
        return {
          data: resultData,
        };
      },
      providesTags: ["store"],
    }),

    updateStorePassword: builder.mutation({
      query: (data) => ({
        url: `/stores/reset/`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateStore: builder.mutation({
      query: ({ data, id }) => ({
        url: `stores/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ data, id }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData("getStores", undefined, (draft) => {
                const index = draft.findIndex((store) => store._id === id);
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
    registerStore: builder.mutation({
      query: (data) => ({
        url: "/stores/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData("getStores", undefined, (draft) => {
                draft?.push(result?.data);
              })
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
    updatePayment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/stores/payment/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result?.data) {
            const payment = result?.data?.payment;
            // console.log(payment);
            // console.log(id);
            // dispatch(updatePaidToOwner({ payment, _id: id }));
          }
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["dashboard"],
    }),
  }),
});

export const {
  useGetStoresQuery,
  useUpdateStorePasswordMutation,
  useRegisterStoreMutation,
  useUpdatePaymentMutation,
  useGetStoresResultQuery,
  useUpdateStoreMutation,
} = storeApi;
