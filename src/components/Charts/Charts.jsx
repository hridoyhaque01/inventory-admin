import React from "react";
import ChartArea from "./ChartTypes/ChartArea";
import ChartBar from "./ChartTypes/ChartBar";
import ChartBarLoan from "./ChartTypes/ChartBarLoan";
import ChartLine from "./ChartTypes/ChartLine";

const Charts = ({ data }) => {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 items-stretch justify-around gap-6">
      <div className="bg-whiteHigh rounded-xl p-6">
        <ChartArea data={data} title="Total Sales"></ChartArea>
      </div>
      <div className="bg-whiteHigh rounded-xl p-6">
        <ChartBar data={data} title="Total Revenue"></ChartBar>
      </div>
      <div className="bg-whiteHigh rounded-xl p-6">
        <ChartLine data={data} title="Total Paid to Owner"></ChartLine>
      </div>
      <div className="bg-whiteHigh rounded-xl p-6">
        <ChartBarLoan data={data} title="Total Remaining"></ChartBarLoan>
      </div>
    </section>
  );
};

export default Charts;
