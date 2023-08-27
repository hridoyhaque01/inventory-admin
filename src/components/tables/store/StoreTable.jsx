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

  return (
    <div className="h-full overflow-auto flex flex-col items-end justify-between pb-4 gap-4">
      <table className="table w-full">
        <thead className=" p-0">
          <tr className="font-bold text-3xl">
            <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
              {t("tables.serial")}
            </th>
            <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
              {t("tables.created")}
            </th>
            <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
              {t("tables.name")}
            </th>

            <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
              {t("tables.address")}
            </th>

            <th className="bg-primaryMainLightest text-blackHigh text-base normal-case text-center">
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
            {currentRows?.map((store, i) => (
              <tr className="" key={store?._id}>
                {/* <th className="p-2">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent border-fadeHigh  checkbox-sm rounded "
                      name="checkbox"
                    />
                  </th> */}
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
                <td className="py-3 text-center">
                  <button
                    type="button"
                    className="inline-flex bg-successLight px-4 py-3 rounded-xl text-successColor cursor-pointer"
                    onClick={() => handleNavigate(store)}
                  >
                    {t("buttons.details")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalRows={data?.length}
      ></Pagination>
    </div>
  );
}

export default StoreTable;
