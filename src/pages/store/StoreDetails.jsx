import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/loaders/RequestLoader";
import ResetPasswordModal from "../../components/modals/ResetPasswordModal";
import { useUpdateStorePasswordMutation } from "../../features/store/storeApi";

function StoreDetails() {
  const [updateStorePassword, { isLoading }] = useUpdateStorePasswordMutation();
  const navigate = useNavigate();
  const { state } = useLocation() || {};
  const { payload } = state || {};
  const { t } = useTranslation();

  // const {
  //   data: dashboardData,
  //   isLoading: dataFetching,
  //   isError,
  // } = useGetStoreDashboardResultQuery(payload?._id);

  // const { totalSales, totalCosts, totalDues } = dashboardData || {};

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

  const [data, setData] = useState([
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

  // useEffect(() => {
  //   if (!dataFetching && !isError) {
  //     const updatedData = [...data];
  //     updatedData[0].number = totalSales || 0;
  //     updatedData[1].number = totalCosts || 0;
  //     updatedData[2].number = Number(totalSales) - Number(totalDues) || 0;
  //     updatedData[3].number = totalDues || 0;
  //     setData(updatedData);
  //   }
  // }, [totalSales, totalCosts, totalDues, dataFetching, isError]);

  return (
    <div className="w-full overflow-hidden px-4 md:px-6 mt-6">
      <div className="flex flex-col justify-around px-4 py-6 gap-4 w-full bg-whiteHigh shadow-md rounded-2xl">
        {/* 4 top cards */}

        {/* <section className="flex items-stretch gap-8 px-4">
          {data.map((data, index) => (
            <StoreCard data={data} key={index}></StoreCard>
          ))}
        </section> */}

        {/* single store details */}
        <div className=" mt-6 overflow-auto">
          <h4 className="text-base md:text-xl font-bold">
            {t("tableTitle.store")}{" "}
          </h4>
          <div className="mt-6">
            <table className="table w-full  ">
              <thead className=" p-0">
                <tr className="font-bold text-sm sm:text-base ms:text-xl">
                  <th className="bg-primaryMainLightest text-blackHigh normal-case">
                    {t("tables.serial")}
                  </th>
                  <th className="bg-primaryMainLightest text-blackHigh normal-case">
                    {t("tables.created")}
                  </th>
                  <th className="bg-primaryMainLightest text-blackHigh normal-case">
                    {t("tables.name")}
                  </th>

                  <th className="bg-primaryMainLightest text-blackHigh normal-case">
                    {t("forms.email")}
                  </th>

                  <th className="bg-primaryMainLightest text-blackHigh normal-case">
                    {t("forms.password")}
                  </th>

                  <th className="bg-primaryMainLightest text-blackHigh normal-case text-center">
                    {t("tables.action")}
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr className="border-none text-xs sm:text-base">
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
                      className="inline-flex bg-successLight px-4 py-3 rounded-xl text-successColor cursor-pointer whitespace-nowrap"
                    >
                      {t("buttons.reset")}
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
