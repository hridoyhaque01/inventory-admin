import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeTopCard from "../../Components/Cards/HomeTopCard";
import Charts from "../../components/Charts/Charts";
import RequestLoader from "../../components/loaders/RequestLoader";
import SearchLoader from "../../components/loaders/SearchLoader";
import PaidToOwnerModal from "../../components/modals/PaidToOwnerModal";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import {
  useGetAllStoreResultQuery,
  useGetChartDataQuery,
} from "../../features/dashboard/dashboardApi";
import { setStoreData } from "../../features/dashboard/dashboardSlice";
import { useUpdatePaymentMutation } from "../../features/store/storeApi";

const Dashboard = () => {
  const [activeStore, setActiveStore] = useState({});
  const { storeData: storeHouse } = useSelector((state) => state.storeData);
  const { data } = useGetChartDataQuery();

  console.log(data);
  const dispatch = useDispatch();
  const errorNotify = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const chartData = [
    { name: "Feb", uv: 400, pv: 1100, amt: 1800 },
    { name: "Mar", uv: 200, pv: 1400, amt: 1300 },
    { name: "Apr", uv: 400, pv: 1500, amt: 1200 },
    { name: "May", uv: 100, pv: 1100, amt: 1900 },
    { name: "Jun", uv: 600, pv: 1200, amt: 1400 },
    { name: "Jul", uv: 300, pv: 1200, amt: 1900 },
    { name: "Aug", uv: 100, pv: 1700, amt: 1700 },
    { name: "Sep", uv: 800, pv: 1400, amt: 1100 },
    { name: "Oct", uv: 300, pv: 1600, amt: 1500 },
    { name: "Nov", uv: 100, pv: 1100, amt: 1700 },
    { name: "Dec", uv: 800, pv: 1400, amt: 1100 },
    { name: "Jan", uv: 200, pv: 1700, amt: 1500 },
  ];

  const infoNotify = (message) =>
    toast.info(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const [updatePayment, { isLoading: paymentLoading }] =
    useUpdatePaymentMutation();

  const { data: storeData, isLoading, isError } = useGetAllStoreResultQuery();
  const { resultData, cardData } = storeHouse || {};

  // console.log(storeData);

  const [dashboardData, setDashboardData] = useState([
    {
      title: "cards.totalCost",
      color: "bg-successColor",
      number: 0,
    },
    {
      title: "cards.totalDue",
      color: "bg-secondaryMainLight",
      number: 0,
    },
    {
      title: "cards.totalRevenue",
      color: "bg-infoColor",
      number: 0,
    },
    {
      title: "cards.totalSales",
      color: "bg-errorMidColor",
      number: 0,
    },
    {
      title: "cards.totalPaidOwner",
      color: "bg-secondaryMain",
      number: 0,
    },
  ]);

  let content = null;

  if (isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (!isLoading && !isError && resultData?.length === 0) {
    content = <NoData></NoData>;
  } else if (!isLoading && !isError && resultData?.length > 0) {
    content = (
      <>
        <Charts data={chartData}></Charts>
        <section className="flex flex-col justify-between gap-8"></section>
      </>
    );
  }
  useEffect(() => {
    if (!isLoading && !isError) {
      const updatedData = [...dashboardData];
      updatedData[0].number = cardData?.totalCosts || 0;
      updatedData[1].number = cardData?.totalDue || 0;
      updatedData[3].number = cardData?.totalSales || 0;
      updatedData[2].number = cardData?.totalRevenue || 0;
      updatedData[4].number = cardData?.totalPaidToOwner;
      setDashboardData(updatedData);
      dispatch(setStoreData(storeData));
    }
  }, [isLoading, isError, cardData, storeData]);

  return (
    <div className="w-full overflow-auto  pb-6 px-4 md:px-6 ">
      <div className="flex flex-col justify-around pt-6 gap-6 w-full">
        {/* 4 top cards */}

        <section className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 xl:gap-6">
          {dashboardData.map((dashboardData, index) => (
            <HomeTopCard data={dashboardData} key={index}></HomeTopCard>
          ))}
        </section>
        {content}
      </div>
      <PaidToOwnerModal
        activeStore={activeStore}
        errorNotify={errorNotify}
        infoNotify={infoNotify}
        handler={updatePayment}
      ></PaidToOwnerModal>

      {paymentLoading && <RequestLoader></RequestLoader>}
      <div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        ></ToastContainer>
      </div>
    </div>
  );
};

export default Dashboard;
