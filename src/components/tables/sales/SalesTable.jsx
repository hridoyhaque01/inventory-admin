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
                          d="M3.64355 16.3148L12.0605 7.89792M3.64355 16.3148L12.0605 7.89792M3.64355 16.3148C3.55625 16.4021 3.5 16.5354 3.5 16.6613V19.0013C3.5 19.2751 3.72614 19.5013 4 19.5013H6.34C6.46935 19.5013 6.59727 19.4496 6.70192 19.3523M3.64355 16.3148L6.70192 19.3523M12.0605 7.89792L15.1124 10.9418L6.70192 19.3523M12.0605 7.89792L6.70192 19.3523M19 19.5013H12.2071L15.2071 16.5013H19C19.8239 16.5013 20.5 17.1774 20.5 18.0013C20.5 18.8251 19.8239 19.5013 19 19.5013ZM18.3564 6.98483C18.5512 7.17957 18.5512 7.49299 18.3564 7.68773L16.88 9.16417L13.8371 6.12128L15.3136 4.64483C15.5083 4.45009 15.8217 4.45009 16.0164 4.64483L18.3564 6.98483Z"
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
