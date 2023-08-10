import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../shared/pagination/Pagination";

function SalesTable({ data }) {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [activeButton, setActiveButton] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [imageUrl, setImageUrl] = useState();
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);

  const handleNavigate = (data) => {
    navigate("/sales-edit", {
      state: {
        payload: data,
      },
    });
  };

  return (
    <>
      <div>
        <table className="table w-full">
          <thead className=" p-0">
            <tr className="font-bold text-center text-3xl">
              <th className="bg-primaryMainLightest text-bold normal-case p-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-accent border-fadeHigh text-base  checkbox-sm rounded "
                  name="checkbox"
                />
              </th>
              <th className="bg-primaryMainLightest text-blackHigh text-base normal-case p-2">
                Serial
              </th>

              <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                Product Id
              </th>

              <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                Product Name
              </th>

              <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                Category
              </th>

              <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                Shop Name
              </th>

              <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                Quantity
              </th>

              <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                Selling Price/Unit
              </th>

              <th className="bg-primaryMainLightest text-blackHigh text-base normal-case">
                Actions
              </th>
            </tr>
          </thead>
          {currentRows?.length === 0 ? (
            <tbody>
              <tr className="border-none">
                <td colSpan="10" className="py-6">
                  <h2 className="text-center text-lg text-blackRgb font-medium">
                    No data found!
                  </h2>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="text-center">
              {currentRows?.map((item, i) => (
                <tr className="text-center" key={item?._id}>
                  <th className="py-3">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent border-fadeHigh  checkbox-sm rounded "
                      name="checkbox"
                    />
                  </th>
                  <td className="py-3">
                    {currentPage === 1 && i + 1 < 10
                      ? "0" + (rowsPerPage * (currentPage - 1) + i + 1)
                      : rowsPerPage * (currentPage - 1) + i + 1}
                  </td>
                  <td className="py-3">{item?.productId}</td>

                  <td className="py-3">{item?.productName}</td>
                  <td className="py-3">{item?.productCategory}</td>
                  <td className="py-3">{item?.storeName}</td>
                  <td className="py-3">{item?.unitCount}</td>
                  <td className="py-3">{item?.unitPrice}</td>
                  <td className="py-3">
                    <button type="button" onClick={() => handleNavigate(item)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M2.9416 12.2289L2.94163 12.2289L2.93686 12.2243C2.65588 11.9507 2.49805 11.5709 2.49805 11.1725V4.0025C2.49805 3.17864 3.17419 2.5025 3.99805 2.5025H11.168C11.5671 2.5025 11.9495 2.66102 12.2245 2.93606L21.0545 11.7661C21.6509 12.3624 21.6476 13.3058 21.0645 13.8889L13.8945 21.0589C13.3098 21.6437 12.3563 21.6437 11.7716 21.0589L2.9416 12.2289ZM4.49805 6.5025C4.49805 7.60864 5.3919 8.5025 6.49805 8.5025C7.60419 8.5025 8.49805 7.60864 8.49805 6.5025C8.49805 5.39636 7.60419 4.5025 6.49805 4.5025C5.3919 4.5025 4.49805 5.39636 4.49805 6.5025Z"
                          fill="#F4A100"
                          stroke="#F4A100"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="pr-6">
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

export default SalesTable;
