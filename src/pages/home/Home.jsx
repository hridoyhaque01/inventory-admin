import React, { useEffect, useState } from "react";
import HomeTopCard from "../../Components/Cards/HomeTopCard";
import Charts from "../../components/Charts/Charts";
import SearchLoader from "../../components/loaders/SearchLoader";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import DashboardTable from "../../components/tables/DashboardTable/DashboardTable";
import {
  useGetAllStoreResultQuery,
  useGetDashboardResultQuery,
} from "../../features/dashboard/dashboardApi";

const Dashboard = () => {
  const [userType] = useState("Admin");

  const { data, isLoading, isError } = useGetDashboardResultQuery();

  const {
    data: storeData,
    isLoading: storeLoading,
    isError: storeError,
  } = useGetAllStoreResultQuery();

  console.log(storeData);
  const { salesData, totalSales, costsData, totalCosts, totalDues } =
    data || {};

  const [sales, setSales] = useState([]);
  const [costs, setCosts] = useState([]);

  const [dashboardData, setDashboardData] = useState([
    {
      title: "Total Sales",
      color: "bg-successColor",
      number: 0,
    },
    {
      title: "Total Costs",
      color: "bg-secondaryMainLight",
      number: 0,
    },
    {
      title: "Total Revenue",
      color: "bg-infoColor",
      number: 0,
    },
    {
      title: "Total Dues",
      color: "bg-errorMidColor",
      number: 0,
    },
  ]);

  let content = null;

  if (isLoading || storeLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if ((!isLoading || !storeLoading) && (isError || storeError)) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (!isLoading && !isError && !totalSales) {
    content = <NoData></NoData>;
  } else if (!isLoading && !isError && totalSales) {
    content = (
      <>
        <section className="flex justify-between gap-8">
          {dashboardData.map((dashboardData, index) => (
            <HomeTopCard data={dashboardData} key={index}></HomeTopCard>
          ))}
        </section>
        <section className="flex flex-col justify-between gap-8">
          {storeData?.map((store, index) => (
            <DashboardTable results={store} key={index}></DashboardTable>
          ))}
        </section>
        <Charts salesData={sales} costsData={costs}></Charts>
      </>
    );
  }

  useEffect(() => {
    if (!isLoading && !isError) {
      const updatedData = [...dashboardData];
      updatedData[0].number = totalSales || 0;
      updatedData[1].number = totalCosts || 0;
      updatedData[2].number = Number(totalSales) - Number(totalDues) || 0;
      updatedData[3].number = totalDues || 0;
      setSales(salesData);
      setCosts(costsData);
      setDashboardData(updatedData);
    }
  }, [totalSales, totalCosts, totalDues, isLoading, isError]);

  return (
    <div className="w-full overflow-auto pb-6 pr-10">
      <div className="flex flex-col justify-around pt-6 gap-6 w-full">
        {/* 4 top cards */}
        {content}
      </div>
    </div>
  );
};

export default Dashboard;
