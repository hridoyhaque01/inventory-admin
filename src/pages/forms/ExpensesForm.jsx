import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/loaders/RequestLoader";
import {
  useAddExpenseMutation,
  useUpdateExpenseMutation,
} from "../../features/expenses/expensesApi";

function ExpensesForm() {
  const [date, setDate] = useState("");
  const [addExpense, { isLoading }] = useAddExpenseMutation();
  const [updateExpense, { isLoading: updateExpenseLoading }] =
    useUpdateExpenseMutation();
  const { state } = useLocation();
  const { payload, type } = state || {};
  const navigate = useNavigate();
  const { t } = useTranslation();

  const errorNotify = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const description = form.description.value;
    const amount = form.amount.value;
    const data = {
      date,
      description,
      amount: Number(amount),
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    if (type === "edit") {
      updateExpense({ data: formData, id: payload?._id })
        .unwrap()
        .then((res) => {
          navigate("/expenses");
        })
        .catch((error) => {
          errorNotify("Expense update failed");
        });
    } else {
      addExpense(formData)
        .unwrap()
        .then((res) => {
          form.reset();
          setDate("");
          navigate("/expenses");
        })
        .catch((error) => {
          errorNotify("Expense add failed");
        });
    }
  };

  useEffect(() => {
    if (payload?._id) {
      setDate(payload?.date);
    }
  }, [payload?._id, payload?.date]);

  return (
    <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-lg md:text-2xl font-bold">
            {t("tableTitle.expenses")}
          </h4>
        </div>
        <div className="bg-whiteHigh w-full px-4">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-start gap-6">
                {/* Product Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("date")} :
                  </span>
                  <input
                    type="date"
                    placeholder="Date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm sm:text-base"
                    required
                  />
                </div>

                {/* Description */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("forms.description")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("placeholders.enterDescription")}
                    name="description"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm sm:text-base"
                    required
                    defaultValue={payload?.description}
                  />
                </div>

                {/* Shop Name: */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.amount")} :
                  </span>
                  <input
                    type="number"
                    placeholder={t("placeholders.enterAmount")}
                    name="amount"
                    step="any"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm sm:text-base"
                    required
                    defaultValue={payload?.amount}
                  />
                </div>

                {/* edit button */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4">
                  <span className="w-[140px]"></span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/expenses"
                      className="w-[140px] sm:w-[160px] p-3 sm:p-4 rounded-full border border-errorLightColor text-errorLightColor font-medium text-center text-sm sm:text-base"
                    >
                      {t("buttons.cancel")}
                    </Link>
                    <button
                      type="submit"
                      className="w-[140px] sm:w-[160px] text-sm sm:text-base p-3 sm:p-4 rounded-full border bg-primaryMainLight text-whiteHigh font-medium text-center"
                    >
                      {t("buttons.save")}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {(isLoading || updateExpenseLoading) && <RequestLoader></RequestLoader>}
        <div>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </div>
    </section>
  );
}

export default ExpensesForm;
