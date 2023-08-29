import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../shared/pagination/Pagination";

function StoreTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigate = (store) => {
    navigate("/store-details", {
      state: {
        payload: store,
      },
    });
  };

  const handleDataNavigate = (data) => {
    navigate("/store-financial", {
      state: {
        payload: data,
      },
    });
  };

  return (
    <div className="h-full overflow-auto flex flex-col items-end justify-between pb-4 gap-4">
      <table className="table w-full">
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
              {t("tables.address")}
            </th>

            <th className="bg-primaryMainLightest text-blackHigh normal-case text-center">
              {t("tables.action")}
            </th>
          </tr>
        </thead>
        {currentRows?.length === 0 ? (
          <tbody>
            <tr className="border-none">
              <td colSpan="10" className="py-6">
                <h2 className="text-center text-lg text-blackRgb font-medium">
                  {t("noData")}
                </h2>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="">
            {currentRows?.map((item, i) => {
              const { storeData: store, storeDetails } = item || {};
              return (
                <tr className="text-xs sm:text-base" key={store?._id}>
                  <td className="py-3">
                    {currentPage === 1 && i + 1 < 10
                      ? "0" + (rowsPerPage * (currentPage - 1) + i + 1)
                      : rowsPerPage * (currentPage - 1) + i + 1}
                  </td>
                  <td className="py-3">
                    {new Date(store?.timestamp).toLocaleDateString("en-US")}
                  </td>

                  <td className="py-3">{store?.name}</td>
                  <td className="py-3">{store?.location}</td>
                  <td className="py-3 text-center flex items-center justify-center gap-3">
                    <button
                      type="button"
                      className="inline-flex bg-successLight px-4 py-3 rounded-xl text-successColor cursor-pointer whitespace-nowrap"
                      onClick={() => handleNavigate(store)}
                    >
                      {t("buttons.details")}
                    </button>
                    <button
                      type="button"
                      className="inline-flex bg-secondaryMain px-4 py-3 rounded-xl text-blackLow cursor-pointer whitespace-nowrap"
                      onClick={() => handleDataNavigate(item)}
                    >
                      Financial
                      {/* {t("buttons.details")} */}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
      <div className="pr-6">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalRows={data?.length}
        ></Pagination>
      </div>
    </div>
  );
}

export default StoreTable;
