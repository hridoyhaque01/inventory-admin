import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function BuySuppliesView() {
  const { state } = useLocation();
  const { payload, type } = state || {};
  const { t } = useTranslation();

  return (
    <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-lg md:text-2xl font-bold">
            {t("tableTitle.supplies")}
          </h4>
        </div>
        <div className="bg-whiteHigh w-full px-4">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="">
              <div className="flex flex-col justify-start gap-6">
                {/* productId */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 relative">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.productId")} :
                  </span>
                  <div className="w-full relative">
                    <input
                      type="text"
                      placeholder="Product name"
                      name="productName"
                      className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm sm:text-base  bg-whiteMid "
                      readOnly
                      defaultValue={payload?.productId}
                    />
                  </div>
                </div>

                {/* Product Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.productName")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("tables.productName")}
                    name="productName"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm sm:text-base  bg-whiteMid"
                    readOnly
                    defaultValue={payload?.productName}
                  />
                </div>

                {/* Quantity Price/Unit: */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.quantity")} :
                  </span>
                  <div className="w-full py-3 px-4 flex items-center border border-whiteLow outline-none rounded text-blackLow text-sm  bg-whiteMid">
                    <input
                      type="number"
                      name="unitCount"
                      className={`w-28 border-none outline-none bg-transparent ${
                        type === "edit" ? "text-fadeColor" : "text-blackLow"
                      }`}
                      placeholder={t("tables.quantity")}
                      defaultValue={payload?.unitCount}
                      readOnly
                    />

                    <div className="relative w-full max-w-max">
                      <input
                        type="text"
                        className="appearance-none outline-none  w-16 text-fadeColor bg-transparent"
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
                    {t("tables.supplierName")} :
                  </span>
                  <div className="w-full relative">
                    <input
                      type="text"
                      placeholder="Product name"
                      name="productName"
                      className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm sm:text-base  bg-whiteMid"
                      readOnly
                      defaultValue={payload?.supplierName}
                    />
                  </div>
                </div>

                {/* Unit Count */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.unitPrice")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("placeholders.enterUnitPrice")}
                    name="unitPrice"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm sm:text-base  bg-whiteMid"
                    defaultValue={payload?.unitPrice}
                    readOnly
                  />
                </div>

                {/* Shop Name: */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("forms.paidAmount")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("placeholders.enterPaid")}
                    name="totalAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm sm:text-base  bg-whiteMid"
                    readOnly
                    defaultValue={payload?.totalAmount}
                  />
                </div>

                {/* Shop Name: */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("forms.paidAmount")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("placeholders.enterPaid")}
                    name="paidAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm sm:text-base  bg-whiteMid"
                    defaultValue={payload?.paidAmount}
                    readOnly
                  />
                </div>

                {/* Shop Name: */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.dueAmount")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("placeholders.enterDueAmount")}
                    name="dueAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm sm:text-base  bg-whiteMid"
                    readOnly
                    defaultValue={
                      Number(payload?.totalAmount) - Number(payload?.paidAmount)
                    }
                  />
                </div>

                {/* edit button */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4">
                  <span className="w-[140px]"></span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/supplies"
                      className="w-[140px] sm:w-[160px] text-sm sm:text-base p-3 sm:p-4 rounded-full border bg-primaryMainLight text-whiteHigh font-medium text-center"
                    >
                      {t("buttons.back")}
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
