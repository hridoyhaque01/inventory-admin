import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/loaders/RequestLoader";
import PaidToOwnerModal from "../../components/modals/PaidToOwnerModal";
import { Pagination } from "../../components/shared/pagination/Pagination";
import { useUpdatePaymentMutation } from "../../features/store/storeApi";
function StoreFinancial() {
  const { state } = useLocation() || {};
  const { payload } = state || {};
  const { t } = useTranslation();
  const [updatePayment, { isLoading: paymentLoading }] =
    useUpdatePaymentMutation();
  const { storeData, storeDetails: results } = payload || {};
  const [activeStore, setActiveStore] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = results?.slice(indexOfFirstRow, indexOfLastRow);

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

  const totalrevenue = results?.reduce(
    (acc, result) => acc + result?.revenue,
    0
  );
  const totalDue = results?.reduce((acc, result) => acc + result?.totalDue, 0);
  const totalCost = results?.reduce(
    (acc, result) => acc + result?.totalCost,
    0
  );
  const totalSales = results?.reduce(
    (acc, result) => acc + result?.totalSales,
    0
  );

  return (
    <section className="w-full overflow-hidden px-4 md:px-6 mt-6">
      <div className="flex flex-col h-[640px]">
        <section className="flex items-center bg-primaryMainDarkest px-6 py-3.5 rounded-t-md">
          <p className="text-right text-2xl text-whiteHigh font-bold capitalize">
            {storeData?.name}
          </p>
        </section>
        <div className="h-full w-full overflow-auto flex flex-col items-end flex-wrap justify-between pb-4 gap-4 bg-whiteHigh rounded-b-md">
          <table className="table w-full overflow-auto">
            <thead className=" p-0">
              <tr className="text-center font-bold text-sm sm:text-base ms:text-xl">
                <th className="bg-primaryMainLightest text-blackHigh normal-case">
                  {t("tables.serial")}
                </th>
                {/* <th className="bg-primaryMainLightest text-blackHigh normal-case p-2">
                  Paid to Owner
                </th> */}

                <th className="bg-primaryMainLightest text-blackHigh normal-case">
                  {t("tables.totalDue")}
                </th>

                <th className="bg-primaryMainLightest text-blackHigh normal-case">
                  {t("tables.totalRevenue")}
                </th>
                <th className="bg-primaryMainLightest text-blackHigh normal-case">
                  {t("tables.totalCost")}
                </th>
                <th className="bg-primaryMainLightest text-blackHigh normal-case">
                  {t("tables.totalSales")}
                </th>
                <th className="bg-primaryMainLightest text-blackHigh normal-case">
                  {t("date")}
                </th>
              </tr>
            </thead>
            {results?.length === 0 ? (
              <tbody>
                <tr className="border-none">
                  <td colSpan="8" className="py-6">
                    <h2 className="text-center text-lg text-blackRgb font-medium">
                      {t("noData")}
                    </h2>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="text-center">
                {/* {currentRows?.map((customer, i)=>) */}
                {currentRows?.map((result, i) => (
                  <tr className="text-center text-xs sm:text-base" key={i}>
                    <td className="py-2">
                      {currentPage === 1 && i + 1 < 10
                        ? "0" + (rowsPerPage * (currentPage - 1) + i + 1)
                        : rowsPerPage * (currentPage - 1) + i + 1}
                    </td>
                    {/* <td className="py-2">{result?.totalPaidToOwner}</td> */}
                    <td className="py-2">{result?.totalDue}</td>
                    <td className="py-2">{result?.revenue}</td>
                    <td className="py-2">{result?.totalCost}</td>
                    <td className="py-2">{result?.totalSales}</td>
                    <td className="py-2">{result?.date}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          <div className="pr-6">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              totalRows={results?.length}
            ></Pagination>
          </div>
        </div>
      </div>
      <div className=" w-full overflow-auto flex flex-col items-end flex-wrap justify-between gap-4 bg-whiteHigh rounded-b-md">
        <table className="table w-full overflow-auto">
          <thead className=" p-0">
            <tr className="font-bold text-center  text-sm sm:text-base ms:text-xl">
              <th className="bg-primaryMainLightest text-blackHigh normal-case">
                {/* {t("tables.serial")} */}
              </th>
              <th className="bg-primaryMainLightest text-blackHigh normal-case p-2">
                {t("tables.totalPaidOwner")}
              </th>

              <th className="bg-primaryMainLightest text-blackHigh normal-case">
                {t("tables.totalRemaining")}
              </th>

              <th className="bg-primaryMainLightest text-blackHigh normal-case">
                {t("tables.totalDue")}
              </th>

              <th className="bg-primaryMainLightest text-blackHigh normal-case">
                {t("tables.totalRevenue")}
              </th>
              <th className="bg-primaryMainLightest text-blackHigh normal-case">
                {t("tables.totalCost")}
              </th>
              <th className="bg-primaryMainLightest text-blackHigh normal-case">
                {t("tables.totalSales")}
              </th>
              <th className="bg-primaryMainLightest text-blackHigh normal-case">
                {t("tables.action")}
              </th>
            </tr>
            {results?.length > 0 ? (
              <tr className="text-center text-xs sm:text-base">
                <th className="bg-secondaryMain text-blackHigh normal-case py-6">
                  {t("tables.total")}
                </th>
                <th className="bg-secondaryMain text-blackHigh normal-case  py-6">
                  {results[0]?.finalPaid}
                </th>

                <th className="bg-secondaryMain text-blackHigh normal-case  py-6">
                  {results[0]?.finalRemaining}
                </th>

                <th className="bg-secondaryMain text-blackHigh normal-case  py-6">
                  {totalDue}
                </th>

                <th className="bg-secondaryMain text-blackHigh normal-case  py-6">
                  {totalrevenue}
                </th>
                <th className="bg-secondaryMain text-blackHigh normal-case  py-6">
                  {totalCost}
                </th>
                <th className="bg-secondaryMain text-blackHigh normal-case  py-6">
                  {totalSales}
                </th>
                <th className="bg-secondaryMain text-blackHigh normal-case  py-6">
                  <label
                    type="button"
                    // onClick={() => handleNavigate(result)}
                    htmlFor="paidToOwnerModal"
                    className="cursor-pointer inline-block px-6 py-2 bg-whiteHigh rounded-lg text-sm"
                    onClick={() =>
                      setActiveStore({
                        id: storeData?._id,
                        remaining: results[0]?.finalRemaining,
                      })
                    }
                  >
                    {t("buttons.recieve")}
                  </label>
                </th>
              </tr>
            ) : (
              <tr className="border-none">
                <th colSpan="8" className="py-6">
                  <h2 className="text-center text-lg text-blackRgb font-medium">
                    {t("noData")}
                  </h2>
                </th>
              </tr>
            )}
          </thead>
        </table>
      </div>
      {paymentLoading && <RequestLoader></RequestLoader>}
      <PaidToOwnerModal
        activeStore={activeStore}
        errorNotify={errorNotify}
        infoNotify={infoNotify}
        handler={updatePayment}
      ></PaidToOwnerModal>
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
    </section>
  );
}

export default StoreFinancial;
