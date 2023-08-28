import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import getIsoDateString from "../../utils/getIsoDateString";

function MoneyOwedForm() {
  const { state } = useLocation();
  const { payload } = state || {};
  const { t } = useTranslation();

  return (
    <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-lg md:text-2xl font-bold">
            {t("tableTitle.owes")}
          </h4>
        </div>
        <div className="bg-whiteHigh w-full px-4">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="">
              <div className="flex flex-col justify-start gap-6">
                {/* productId */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.customerId")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("tables.customerId")}
                    name="customerId"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm sm:text-base bg-whiteMid"
                    defaultValue={payload?.customerId}
                    readOnly
                  />
                </div>

                {/* Product Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("forms.totalAmount")} :
                  </span>
                  <input
                    type="number"
                    placeholder={t("forms.totalAmount")}
                    name="totalAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm sm:text-base bg-whiteMid"
                    defaultValue={payload?.totalAmount}
                    readOnly
                  />
                </div>

                {/* Pay Date: */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.payDate")} :
                  </span>
                  <input
                    type="date"
                    placeholder={t("tables.payDate")}
                    name="payDate"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm sm:text-base bg-whiteMid"
                    defaultValue={getIsoDateString(payload?.payDate)}
                    readOnly
                  />
                </div>

                {/* Paid */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("forms.paid")} :
                  </span>
                  <input
                    type="number"
                    placeholder={t("forms.paid")}
                    name="due"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm sm:text-base bg-whiteMid"
                    defaultValue={payload?.paidAmount}
                    readOnly
                  />
                </div>

                {/* Paid */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.dueAmount")} :
                  </span>
                  <input
                    type="number"
                    placeholder={t("tables.dueAmount")}
                    name="dueAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm sm:text-base bg-whiteMid"
                    defaultValue={payload?.dueAmount}
                    readOnly
                  />
                </div>

                {/* edit button */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 mt-2">
                  <span className="w-[140px]"></span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/moneyOwed"
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

export default MoneyOwedForm;
