import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeTopCard from "../../Components/Cards/HomeTopCard";
import RequestLoader from "../../components/loaders/RequestLoader";
import SearchLoader from "../../components/loaders/SearchLoader";
import PaidToOwnerModal from "../../components/modals/PaidToOwnerModal";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import DashboardTable from "../../components/tables/DashboardTable/DashboardTable";
import { useGetAllStoreResultQuery } from "../../features/dashboard/dashboardApi";
import { setStoreData } from "../../features/dashboard/dashboardSlice";
import { useUpdatePaymentMutation } from "../../features/store/storeApi";

const Dashboard = () => {
  const [activeStore, setActiveStore] = useState({});
  const { storeData: storeHouse } = useSelector((state) => state.storeData);
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
        {/* <Charts salesData={sales} costsData={costs}></Charts> */}
        <section className="flex flex-col justify-between gap-8">
          {resultData?.map((store, index) => (
            <DashboardTable
              results={store}
              key={index}
              setActiveStore={setActiveStore}
            ></DashboardTable>
          ))}
        </section>
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
  }, [isLoading, isError, cardData]);

  return (
    <div className="w-full overflow-auto pb-6 pr-10">
      <div className="flex flex-col justify-around pt-6 gap-6 w-full">
        {/* 4 top cards */}

        <section className="flex justify-between gap-8">
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
