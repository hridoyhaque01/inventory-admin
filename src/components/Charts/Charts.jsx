import React from "react";
import ChartArea from "./ChartTypes/ChartArea";
import ChartBar from "./ChartTypes/ChartBar";
import ChartExpenses from "./ChartTypes/ChartExpenses";
import ChartLine from "./ChartTypes/ChartLine";
import ChartRecieve from "./ChartTypes/ChartRecieve";

const Charts = ({ data }) => {
  console.log(data);

  const {
    finalExpenseData,
    revenueAndSalesData,
    salesAndDueData,
    salesAndProfiteData,
    salesAndRecieveData,
  } = data || {};

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 items-stretch justify-around gap-6">
      <div className="bg-whiteHigh rounded-xl p-4 md:p-6">
        <ChartArea
          data={revenueAndSalesData}
          title="cards.totalRevenue"
        ></ChartArea>
      </div>
      <div className="bg-whiteHigh rounded-xl p-4 md:p-6">
        <ChartBar
          data={salesAndProfiteData}
          title="cards.totalProfit"
        ></ChartBar>
      </div>
      <div className="bg-whiteHigh rounded-xl p-4 md:p-6">
        <ChartLine data={salesAndDueData} title="cards.totalDue"></ChartLine>
      </div>
      <div className="bg-whiteHigh rounded-xl p-4 md:p-6">
        <ChartRecieve
          data={salesAndRecieveData}
          title="cards.totalRecieved"
        ></ChartRecieve>
      </div>
      <div className="bg-whiteHigh rounded-xl p-4 md:p-6 md:col-span-2">
        <ChartExpenses
          data={finalExpenseData}
          title="cards.totalExpenses"
        ></ChartExpenses>
      </div>
    </section>
  );
};

export default Charts;
