import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../shared/pagination/Pagination";

function BuySuppliesTable({ data }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);
  const { t } = useTranslation();

  const handleNavigate = (item) => {
    navigate("/supplies-details", {
      state: {
        payload: item,
        type: "edit",
      },
    });
  };

  return (
    <>
      <div className="overflow-auto w-full flex flex-col items-start justify-between pb-4 gap-4 ">
        <table className="table w-full overflow-auto ">
          <thead className=" p-0">
            <tr className="text-center font-bold text-sm sm:text-base ms:text-xl">
              <th className="bg-primaryMainLightest text-blackHigh normal-case">
                {t("tables.serial")}
              </th>
              <th className="bg-primaryMainLightest text-blackHigh normal-case">
                {t("tables.productId")}
              </th>
              <th className="bg-primaryMainLightest text-blackHigh normal-case">
                {t("tables.productName")}
              </th>

              <th className="bg-primaryMainLightest text-blackHigh normal-case p-2">
                {t("tables.supplierName")}
              </th>
              <th className="bg-primaryMainLightest text-blackHigh normal-case p-2">
                {t("tables.quantity")}
              </th>
              <th className="bg-primaryMainLightest text-blackHigh normal-case p-2">
                {t("tables.unitPrice")}
              </th>
              <th className="bg-primaryMainLightest text-blackHigh normal-case p-2">
                {t("tables.totalPrice")}
              </th>

              <th className="bg-primaryMainLightest text-blackHigh normal-case">
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
            <tbody className="text-center">
              {currentRows?.map((item, i) => (
                <tr className="text-center text-xs sm:text-base" key={i}>
                  <td className="py-3">
                    {currentPage === 1 && i + 1 < 10
                      ? "0" + (rowsPerPage * (currentPage - 1) + i + 1)
                      : rowsPerPage * (currentPage - 1) + i + 1}
                  </td>
                  <td className="py-3">{item?.productId}</td>
                  <td className="py-3">{item?.productName}</td>
                  <td className="py-3">{item?.supplierName}</td>
                  <td className="py-3">{item?.unitCount}</td>
                  <td className="py-3">{item?.unitPrice}</td>
                  <td className="py-3">{item?.totalAmount}</td>

                  <td className="py-3">
                    <button
                      type="button"
                      onClick={() => handleNavigate(item)}
                      className="bg-successLight text-successMain py-1.5 px-4 rounded-lg text-sm whitespace-nowrap"
                    >
                      {t("buttons.details")}
                    </button>
                  </td>
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
          totalRows={data?.length}
        ></Pagination>
      </div>
    </>
  );
}

export default BuySuppliesTable;
