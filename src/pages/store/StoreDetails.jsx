import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreCard from "../../components/Cards/StoreCard";
import RequestLoader from "../../components/loaders/RequestLoader";
import ResetPasswordModal from "../../components/modals/ResetPasswordModal";
import { useGetStoreDashboardResultQuery } from "../../features/dashboard/dashboardApi";
import { useUpdateStorePasswordMutation } from "../../features/store/storeApi";

function StoreDetails() {
  const [updateStorePassword, { isLoading }] = useUpdateStorePasswordMutation();
  const navigate = useNavigate();
  const { state } = useLocation() || {};
  const { payload } = state || {};
  const [storeData, setStoreData] = useState([]);

  const {
    data: dashboardData,
    isLoading: dataFetching,
    isError,
  } = useGetStoreDashboardResultQuery(payload?._id);

  const { totalSales, totalCosts, totalDues } = dashboardData || {};

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

  useEffect(() => {
    if (!dataFetching && !isError && totalSales) {
      setStoreData((prev) => [
        ...prev,
        {
          title: "Total Sales",
          number: totalSales,
          color: "bg-successColor",
        },
        {
          title: "Total Costs",
          number: totalCosts,
          color: "bg-secondaryMainLight",
        },
        {
          title: "Total Revenue",
          number: totalSales - totalDues,
          color: "bg-infoColor",
        },
        {
          title: "Total Dues",
          number: totalDues,
          color: "bg-errorMidColor",
        },
      ]);
    }
  }, [isLoading, isError, totalSales]);

  return (
    <div className="w-full overflow-auto pt-10 pb-6 pr-10">
      <div className="flex flex-col justify-around pty-10 gap-4 w-full">
        {/* 4 top cards */}
        {dataFetching ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Something went wrong</div>
        ) : storeData?.length === 0 ? (
          <div>No store data found</div>
        ) : (
          <section className="flex items-stretch gap-8 px-4">
            {storeData.map((data, index) => (
              <StoreCard data={data} key={index}></StoreCard>
            ))}
          </section>
        )}

        {/* single store details */}
        <div className="p-6 rounded-2xl bg-whiteHigh shadow-md mt-6">
          <h4 className="text-xl font-bold">Staff </h4>
          <div className="mt-6">
            <table className="table w-full">
              <thead className=" p-0">
                <tr className="font-bold text-3xl">
                  <th className="bg-primaryMainLightest text-bold normal-case p-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent border-fadeHigh text-base  checkbox-sm rounded "
                      name="checkbox"
                    />
                  </th>

                  <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                    Serial
                  </th>
                  <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                    Created
                  </th>
                  <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                    Name
                  </th>

                  <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                    Email
                  </th>

                  <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                    Password
                  </th>

                  <th className="bg-primaryMainLightest text-blackHigh text-base normal-case text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="border-none">
                  <th className="p-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent border-fadeHigh  checkbox-sm rounded "
                      name="checkbox"
                    />
                  </th>
                  <td className="py-3">01</td>
                  <td className="py-3">
                    {new Date(payload?.timestamp).toLocaleDateString("en-US")}
                  </td>

                  <td className="py-3">{payload?.name}</td>
                  <td className="py-3">{payload?.email}</td>
                  <td className="py-3">*************</td>
                  <td className="py-3 text-center">
                    <label
                      htmlFor="resetPasswordModal"
                      className="inline-flex bg-successLight px-4 py-3 rounded-xl text-successColor cursor-pointer"
                    >
                      Reset Password
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <ResetPasswordModal
          email={payload?.email}
          errorNotify={errorNotify}
          infoNotify={infoNotify}
          handler={updateStorePassword}
        ></ResetPasswordModal>
      </div>
      {isLoading && <RequestLoader></RequestLoader>}
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
        />
      </div>
    </div>
  );
}

export default StoreDetails;
