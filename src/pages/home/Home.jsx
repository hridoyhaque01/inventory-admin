import React, { useEffect, useState } from "react";
import HomeTopCard from "../../Components/Cards/HomeTopCard";
import Charts from "../../components/Charts/Charts";
import SearchLoader from "../../components/loaders/SearchLoader";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import { useGetDashboardResultQuery } from "../../features/dashboard/dashboardApi";

const Dashboard = () => {
  const [userType] = useState("Admin");

  const { data, isLoading, isError } = useGetDashboardResultQuery();
  const [dashboardData, setDashboardData] = useState([]);

  const { salesData, totalSales } = data || {};

  let content = null;

  if (isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (!isLoading && !isError && !totalSales) {
    content = <NoData></NoData>;
  } else if (!isLoading && !isError && totalSales) {
    content = (
      <>
        <section className="flex justify-between gap-8 px-4">
          {dashboardData.map((dashboardData, index) => (
            <HomeTopCard data={dashboardData} key={index}></HomeTopCard>
          ))}
        </section>
        <Charts data={salesData}></Charts>
      </>
    );
  }

  useEffect(() => {
    if (!isLoading && !isError && totalSales) {
      setDashboardData((prev) => [
        ...prev,
        {
          title: "Total Sales",
          number: totalSales,
          color: "bg-successColor",
        },
      ]);
    }
  }, [isLoading, isError, totalSales]);

  return (
    <div className="w-full overflow-auto pt-10 pb-6 pr-10">
      <div className="flex flex-col justify-around pty-10 gap-4 w-full">
        {/* 4 top cards */}
        {content}
      </div>
    </div>
  );
};

export default Dashboard;
