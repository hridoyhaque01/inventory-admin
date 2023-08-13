import React, { useState } from "react";
import HomeTopCard from "../../Components/Cards/HomeTopCard";
import Charts from "../../components/Charts/Charts";

const Dashboard = () => {
  const [userType] = useState("Admin");

  const data = [
    {
      title: "Total Reserve",
      number: 784645,
      color: "bg-successColor",
    },
    {
      title: "Total Cost",
      number: 327,
      color: "bg-secondaryMainLight",
    },
    {
      title: "Total Dues",
      number: 73665,
      color: "bg-infoColor",
    },
    {
      title: "Total Loan",
      number: 3278,
      color: "bg-errorMidColor",
    },
  ];

  return (
    <div className="w-full overflow-auto pt-10 pb-6 pr-10">
      <div className="flex flex-col justify-around pty-10 gap-4 w-full">
        {/* 4 top cards */}
        <section className="flex justify-between gap-8 px-4">
          {data.map((data, index) => (
            <HomeTopCard data={data} key={index}></HomeTopCard>
          ))}
        </section>
        <Charts></Charts>
      </div>
    </div>
  );
};

export default Dashboard;
