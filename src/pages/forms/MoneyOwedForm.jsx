import React from "react";
import { Link, useLocation } from "react-router-dom";
import getIsoDateString from "../../utils/getIsoDateString";

function MoneyOwedForm() {
  const { state } = useLocation();
  const { payload } = state || {};

  return (
    <section className="h-full w-full overflow-auto px-10 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-2xl font-bold">Money Owed</h4>
        </div>
        <div className="bg-whiteHigh w-full">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="">
              <div className="flex flex-col justify-start gap-6">
                {/* productId */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Customer Id :
                  </span>
                  <input
                    type="text"
                    placeholder="Customer id"
                    name="customerId"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm"
                    defaultValue={payload?.customerId}
                  />
                </div>

                {/* Product Name */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Total Amount :
                  </span>
                  <input
                    type="number"
                    placeholder="Total amount"
                    name="totalAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm"
                    defaultValue={payload?.totalAmount}
                    readOnly
                  />
                </div>

                {/* Pay Date: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Pay Date :
                  </span>
                  <input
                    type="date"
                    placeholder="Pay date"
                    name="payDate"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm"
                    defaultValue={getIsoDateString(payload?.payDate)}
                    readOnly
                  />
                </div>

                {/* Paid */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Paid :
                  </span>
                  <input
                    type="number"
                    placeholder="Paid amount"
                    name="due"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm"
                    defaultValue={payload?.paidAmount}
                    readOnly
                  />
                </div>

                {/* Paid */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Due Amount :
                  </span>
                  <input
                    type="number"
                    placeholder="Due amount"
                    name="dueAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm"
                    defaultValue={payload?.dueAmount}
                    readOnly
                  />
                </div>

                {/* edit button */}
                <div className="flex items-center gap-3 mt-4">
                  <span className="w-[140px]"></span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/moneyOwed"
                      className="w-[160px] p-4 rounded-full border bg-primaryMainLight text-whiteHigh font-medium text-center"
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

export default MoneyOwedForm;
