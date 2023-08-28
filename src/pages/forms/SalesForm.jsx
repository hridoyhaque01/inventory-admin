import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

function SalesForm() {
  const { state } = useLocation();
  const { payload } = state || {};
  const { t } = useTranslation();

  return (
    <section className="h-full w-full overflow-auto px-10 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-2xl font-bold">
            {t("tableTitle.sales")}
          </h4>
        </div>
        <div className="bg-whiteHigh w-full">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="">
              <div className="flex flex-col justify-start gap-6">
                {/* productId */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    {t("tables.productId")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("tables.productId")}
                    name="productId"
                    className="w-full py-3 px-4 text-fadeColor border border-whiteLow outline-none rounded text-sm bg-whiteMid"
                    readOnly
                    defaultValue={payload?.productId}
                  />
                </div>

                {/* Product Name */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    {t("tables.productName")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("tables.productName")}
                    name="productName"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm bg-whiteMid"
                    readOnly
                    defaultValue={payload?.productName}
                  />
                </div>

                {/* Product Category: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    {t("tables.category")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("tables.category")}
                    name="productName"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm bg-whiteMid"
                    readOnly
                    defaultValue={payload?.productCategory}
                  />
                  {/* <div className="relative w-full">
                    <select
                      className="w-full bg-transparent p-3 border border-whiteLow rounded-md flex items-center  placeholder:text-blackSemi appearance-none outline-none"
                      name="productCategory"
                      disabled
                      defaultValue=""
                    >
                      <option value="">{payload?.productCategory}</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center text-secondaryColor pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                      >
                        <path
                          d="M12.0561 5.53003L8.99609 8.58336L5.93609 5.53003L4.99609 6.47003L8.99609 10.47L12.9961 6.47003L12.0561 5.53003Z"
                          fill="#808080"
                        />
                      </svg>
                    </div>
                  </div> */}
                </div>

                {/* Shop Name: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    {t("tables.shopName")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("tables.shopName")}
                    name="shopName"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm bg-whiteMid"
                    readOnly
                    defaultValue={payload?.storeName}
                  />
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    {t("tables.quantity")} :
                  </span>
                  <div className="w-full py-3 px-4 flex items-center border border-whiteLow outline-none rounded text-fadeColor text-sm bg-whiteMid">
                    <input
                      type="number"
                      name="quantity"
                      className="w-20 border-none outline-none bg-transparent"
                      placeholder={t("tables.quantity")}
                      readOnly
                      defaultValue={payload?.unitCount}
                    />
                    <input
                      type="text"
                      name="unit"
                      className="border-none outline-none w-16 bg-transparent"
                      readOnly
                      defaultValue={payload?.unit}
                    />
                    {/* 
                    <div className="relative w-full max-w-max">
                      <select
                        className="appearance-none outline-none  w-16"
                        name="quantityAction"
                        disabled
                      >
                        <option value="">{payload?.unit}</option>
                      </select>
                      <div className="absolute inset-y-0 right-1 flex items-center text-secondaryColor pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="none"
                        >
                          <path
                            d="M12.0561 5.53003L8.99609 8.58336L5.93609 5.53003L4.99609 6.47003L8.99609 10.47L12.9961 6.47003L12.0561 5.53003Z"
                            fill="#808080"
                          />
                        </svg>
                      </div>
                    </div> */}
                  </div>
                  {/* <input
                    type="number"
                    name="buyingPrice"
                    placeholder="Buying price"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm bg-whiteMid"
                  /> */}
                </div>

                {/* Buying Price/Unit: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    {t("tables.sellingPrice")} :
                  </span>
                  <input
                    type="number"
                    name="sellingPrice"
                    placeholder={t("tables.sellingPrice")}
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm bg-whiteMid"
                    readOnly
                    defaultValue={payload?.unitPrice}
                  />
                </div>
                {/* edit button */}
                <div className="flex items-center gap-3 mt-4">
                  <span className="w-[140px]"></span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/sales"
                      className="w-[160px] p-4 rounded-full border bg-primaryMainLight text-whiteHigh font-medium text-center"
                    >
                      {t("buttons.back")}
                    </Link>
                    {/* <button
                      type="submit"
                      className="w-[160px] p-4 rounded-full bg-primaryMainLight font-medium text-whiteHigh text-center"
                    >
                      Save
                    </button> */}
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

export default SalesForm;
