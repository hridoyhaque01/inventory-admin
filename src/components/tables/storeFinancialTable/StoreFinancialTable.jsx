import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Pagination } from "../../shared/pagination/Pagination";

const StoreFinancialTable = ({
  setActiveStore,
  setShowStoreId,
  stores,
  showStore,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = showStore?.storeDetails?.slice(
    indexOfFirstRow,
    indexOfLastRow
  );
  const { t } = useTranslation();

  const totalrevenue = showStore?.storeDetails?.reduce(
    (acc, result) => acc + result?.revenue,
    0
  );
  const totalDue = showStore?.storeDetails?.reduce(
    (acc, result) => acc + result?.totalDue,
    0
  );
  const totalCost = showStore?.storeDetails?.reduce(
    (acc, result) => acc + result?.totalCost,
    0
  );
  const totalSales = showStore?.storeDetails?.reduce(
    (acc, result) => acc + result?.totalSales,
    0
  );

  return (
    <section>
      <div className="flex flex-col h-[640px]">
        <section className="flex items-center bg-primaryMainDarkest px-6 py-3.5 rounded-t-2xl gap-4">
          <p className="text-right text-2xl text-whiteHigh font-bold capitalize">
            {showStore?.storeData?.name}
          </p>
          <div className="dropdown dropdown-end dropdown-bottom z-50">
            <label
              tabIndex={0}
              className="text-whiteHigh flex items-center gap-1 cursor-pointer  text-sm md:text-base whitespace-nowrap"
            >
              <span>{showStore?.storeData?.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11.6468 13.229L12 13.5814L12.3532 13.229L16.5896 9.00173L17.2929 9.70501L12 14.9979L6.70711 9.70501L7.41039 9.00173L11.6468 13.229Z"
                  fill="white"
                  stroke="white"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-1 shadow bg-whiteHigh rounded w-36 sm:w-44 mt-2 text-sm md:text-base whitespace-nowrap overflow-visible"
            >
              {stores?.map((store, i) => (
                <li
                  onClick={() => setShowStoreId(store?.storeData?._id)}
                  key={i}
                >
                  <p>{store?.storeData?.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <div className="w-full h-full flex flex-col justify-between">
          <div className="overflow-auto w-full pb-4 gap-4 ">
            <table className="table w-full overflow-auto ">
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
              {showStore?.storeDetails?.length === 0 ? (
                <tbody>
                  <tr className="border-none">
                    <td colSpan="8" className="md:py-6">
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
          </div>
          <div className="pl-6">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              totalRows={showStore?.storeDetails?.length}
            ></Pagination>
          </div>
        </div>
      </div>
      <div className=" w-full overflow-auto flex flex-col items-end flex-wrap justify-between gap-4 bg-whiteHigh rounded-b-2xl">
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
            {showStore?.storeDetails?.length > 0 ? (
              <tr className="text-center text-xs sm:text-base">
                <th className="bg-secondaryMain text-blackHigh normal-case py-2 sm:py-4 md:py-6">
                  {t("tables.total")}
                </th>
                <th className="bg-secondaryMain text-blackHigh normal-case py-2 sm:py-4 md:py-6">
                  {showStore?.storeDetails[0]?.finalPaid}
                </th>

                <th className="bg-secondaryMain text-blackHigh normal-case py-2 sm:py-4 md:py-6">
                  {showStore?.storeDetails[0]?.finalRemaining}
                </th>

                <th className="bg-secondaryMain text-blackHigh normal-case py-2 sm:py-4 md:py-6">
                  {totalDue}
                </th>

                <th className="bg-secondaryMain text-blackHigh normal-case py-2 sm:py-4 md:py-6">
                  {totalrevenue}
                </th>
                <th className="bg-secondaryMain text-blackHigh normal-case py-2 sm:py-4 md:py-6">
                  {totalCost}
                </th>
                <th className="bg-secondaryMain text-blackHigh normal-case py-2 sm:py-4 md:py-6">
                  {totalSales}
                </th>
                <th className="bg-secondaryMain text-blackHigh normal-case py-2 sm:py-4 md:py-6">
                  <label
                    type="button"
                    // onClick={() => handleNavigate(result)}
                    htmlFor="paidToOwnerModal"
                    className="cursor-pointer inline-block px-6 py-2 bg-whiteHigh rounded-lg text-sm"
                    onClick={() =>
                      setActiveStore({
                        id: showStore?.storeData?._id,
                        remaining: showStore?.storeDetails[0]?.finalRemaining,
                      })
                    }
                  >
                    {t("buttons.recieve")}
                  </label>
                </th>
              </tr>
            ) : (
              <tr className="border-none">
                <th colSpan="8" className="md:py-6">
                  <h2 className="text-center text-lg text-blackRgb font-medium">
                    {t("noData")}
                  </h2>
                </th>
              </tr>
            )}
          </thead>
        </table>
      </div>
    </section>
  );
};

export default StoreFinancialTable;
