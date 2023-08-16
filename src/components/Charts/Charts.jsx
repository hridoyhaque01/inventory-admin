import React from "react";
import ChartArea from "./ChartTypes/ChartArea";
import ChartLine from "./ChartTypes/ChartLine";

const Charts = ({ salesData, costsData }) => {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 p-4 items-stretch justify-around gap-6">
      <div className="bg-whiteHigh rounded-xl p-6">
        <ChartArea data={salesData} title="Total Sales"></ChartArea>
      </div>
      <div className="bg-whiteHigh rounded-xl p-6">
        <ChartLine data={costsData} title="Total Costs"></ChartLine>
      </div>
      {/* 
      <div className="bg-whiteHigh rounded-xl p-6">
        <ChartBar data={salesData} title="Annual Dues"></ChartBar>
      </div>

      <div className="bg-whiteHigh rounded-xl p-6">
        <ChartBarLoan data={costsData} title="Annual Loan"></ChartBarLoan>
      </div> */}
    </section>
  );
};

export default Charts;
