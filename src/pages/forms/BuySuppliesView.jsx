import React from "react";
import { Link, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function BuySuppliesView() {
  const { state } = useLocation();
  const { payload, type } = state || {};
  return (
    <section className="h-full w-full overflow-auto px-10 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-2xl font-bold">
            Supplies Details
          </h4>
        </div>
        <div className="bg-whiteHigh w-full">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="">
              <div className="flex flex-col justify-start gap-6">
                {/* productId */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 relative">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    Product ID :
                  </span>
                  <div className="w-full relative">
                    <input
                      type="text"
                      placeholder="Product name"
                      name="productName"
                      className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm"
                      readOnly
                      defaultValue={payload?.productId}
                    />
                  </div>
                </div>

                {/* Product Name */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Product Name:
                  </span>
                  <input
                    type="text"
                    placeholder="Product name"
                    name="productName"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm"
                    readOnly
                    defaultValue={payload?.productName}
                  />
                </div>

                {/* Quantity Price/Unit: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Quantity:
                  </span>
                  <div className="w-full py-3 px-4 flex items-center border border-whiteLow outline-none rounded text-blackLow text-sm">
                    <input
                      type="number"
                      name="unitCount"
                      className={`w-28 border-none outline-none ${
                        type === "edit" ? "text-fadeColor" : "text-blackLow"
                      }`}
                      placeholder="Quantity"
                      defaultValue={payload?.unitCount}
                      readOnly
                    />

                    <div className="relative w-full max-w-max">
                      <input
                        type="text"
                        className="appearance-none outline-none  w-16 text-fadeColor"
                        readOnly
                        defaultValue={payload?.unit}
                      />
                    </div>
                  </div>
                  {/* <input
                    type="number"
                    name="buyingPrice"
                    placeholder="Buying price"
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded ${type==="edit" ? 'text-fadeColor' :'text-blackLow'} text-sm`}
                  /> */}
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-3 relative">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    Supplier Name :
                  </span>
                  <div className="w-full relative">
                    <input
                      type="text"
                      placeholder="Product name"
                      name="productName"
                      className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm"
                      readOnly
                      defaultValue={payload?.supplierName}
                    />
                  </div>
                </div>

                {/* Unit Count */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Unit price :
                  </span>
                  <input
                    type="text"
                    placeholder="Enter unit count"
                    name="unitPrice"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm"
                    defaultValue={payload?.unitPrice}
                    readOnly
                  />
                </div>

                {/* Shop Name: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Total Price :
                  </span>
                  <input
                    type="text"
                    placeholder="Total price"
                    name="totalAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm"
                    readOnly
                    defaultValue={payload?.totalAmount}
                  />
                </div>

                {/* Shop Name: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Paid Amount :
                  </span>
                  <input
                    type="text"
                    placeholder="Enter paid amount"
                    name="paidAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm"
                    defaultValue={payload?.paidAmount}
                    readOnly
                  />
                </div>

                {/* Shop Name: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Due Amount :
                  </span>
                  <input
                    type="text"
                    placeholder="Enter due amount"
                    name="dueAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm"
                    readOnly
                    defaultValue={
                      Number(payload?.totalAmount) - Number(payload?.paidAmount)
                    }
                  />
                </div>

                {/* edit button */}
                <div className="flex items-center gap-3 mt-4">
                  <span className="w-[140px]"></span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/supplies"
                      className="w-[160px] p-4 rounded-full bg-primaryMainLight font-medium text-whiteHigh text-center"
                    >
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BuySuppliesView;
