import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaidToOwnerModal from "../../modals/PaidToOwnerModal";
import { Pagination } from "../../shared/pagination/Pagination";

const DashboardTable = ({ results }) => {
  const data = [1, 2, 34, 45, 5];
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);
  return (
    <section>
      <div className="flex flex-col h-[640px]">
        <section className="flex items-center  bg-primaryMainDarkest p-3 rounded-t-md">
          <p className="text-right text-2xl text-whiteHigh font-bold">{}</p>
        </section>
        <div className="h-full overflow-auto flex flex-col items-end justify-between pb-4 gap-4 bg-whiteHigh rounded-b-md">
          <table className="table w-full ">
            <thead className=" p-0">
              <tr className="font-bold text-center text-3xl">
                <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                  Serial
                </th>
                <th className="bg-primaryMainLightest text-blackHigh text-base normal-case p-2">
                  Paid to Owner
                </th>

                <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                  Remaining
                </th>

                <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                  Total Due
                </th>

                <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                  Revenue
                </th>
                <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                  Total Costs
                </th>
                <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                  Total sales
                </th>
                <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                  Date
                </th>
                <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                  Action
                </th>
              </tr>
            </thead>
            {currentRows?.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan="6" className="">
                    No data found
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="text-center">
                {/* {currentRows?.map((customer, i)=>) */}
                {currentRows?.map((result, i) => (
                  <tr className="text-center" key={i}>
                    <td className="py-2">
                      {currentPage === 1 && i + 1 < 10
                        ? "0" + (rowsPerPage * (currentPage - 1) + i + 1)
                        : rowsPerPage * (currentPage - 1) + i + 1}
                    </td>
                    <td className="py-2">{result?.totalPaidToOwner}</td>
                    <td className="py-2">{result?.remaining}</td>
                    <td className="py-2">{result?.revenue}</td>
                    <td className="py-2">{result?.totalCost}</td>
                    <td className="py-2">{result?.totalDue}</td>
                    <td className="py-2">{result?.totalSales}</td>
                    <td className="py-2">{result?.date}</td>
                    <td className="py-2">
                      <label
                        type="button"
                        // onClick={() => handleNavigate(result)}
                        htmlFor="paidToOwnerModal"
                        className="cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M3.64355 16.3148L12.0605 7.89792M3.64355 16.3148L12.0605 7.89792M3.64355 16.3148C3.55625 16.4021 3.5 16.5354 3.5 16.6613V19.0013C3.5 19.2751 3.72614 19.5013 4 19.5013H6.34C6.46935 19.5013 6.59727 19.4496 6.70192 19.3523M3.64355 16.3148L6.70192 19.3523M12.0605 7.89792L15.1124 10.9418L6.70192 19.3523M12.0605 7.89792L6.70192 19.3523M19 19.5013H12.2071L15.2071 16.5013H19C19.8239 16.5013 20.5 17.1774 20.5 18.0013C20.5 18.8251 19.8239 19.5013 19 19.5013ZM18.3564 6.98483C18.5512 7.17957 18.5512 7.49299 18.3564 7.68773L16.88 9.16417L13.8371 6.12128L15.3136 4.64483C15.5083 4.45009 15.8217 4.45009 16.0164 4.64483L18.3564 6.98483Z"
                            fill="#F4A100"
                            stroke="#F4A100"
                          />
                        </svg>
                      </label>
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
      </div>
      <PaidToOwnerModal></PaidToOwnerModal>
    </section>
  );
};

export default DashboardTable;
