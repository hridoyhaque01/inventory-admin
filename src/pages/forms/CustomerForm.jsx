import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function CustomerForm() {
  const { state } = useLocation();
  const { payload } = state || {};
  const { t } = useTranslation();

  return (
    <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-lg md:text-2xl font-bold">
            {t("tableTitle.customer")}
          </h4>
        </div>
        <div className="bg-whiteHigh w-full px-4">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="">
              <div className="flex flex-col justify-start gap-6">
                {/* productId */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.phone")} :
                  </span>
                  <input
                    type="number"
                    placeholder={t("placeholders.enterPhone")}
                    name="customerPhone"
                    readOnly
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm sm:text-base bg-whiteMid"
                    defaultValue={payload?.customerPhone}
                  />
                </div>

                {/* Product Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base  text-left md:text-right">
                    {t("tables.name")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("placeholders.enterFullName")}
                    name="customerName"
                    readOnly
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm sm:text-base bg-whiteMid"
                    defaultValue={payload?.customerName}
                  />
                </div>

                {/* Shop Name: */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.address")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("placeholders.enterAddress")}
                    name="location"
                    readOnly
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm sm:text-base bg-whiteMid"
                    defaultValue={payload?.customerAddress}
                  />
                </div>

                {/* edit button */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 mt-2">
                  <span className="w-[140px]"></span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/customer"
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

export default CustomerForm;
