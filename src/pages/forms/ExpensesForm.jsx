import React, { useEffect, useState } from "react";
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

  const infoNotify = (message) =>
    toast.info(message, {
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
    <section className="h-full w-full overflow-auto px-10 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-2xl font-bold">My Expenses</h4>
        </div>
        <div className="bg-whiteHigh w-full">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-start gap-6">
                {/* Product Name */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Date :
                  </span>
                  <input
                    type="date"
                    placeholder="Date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm"
                    required
                  />
                </div>

                {/* Description */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Description :
                  </span>
                  <input
                    type="text"
                    placeholder="Enter description"
                    name="description"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm"
                    required
                    defaultValue={payload?.description}
                  />
                </div>

                {/* Shop Name: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Amount :
                  </span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    name="amount"
                    step="any"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm"
                    required
                    defaultValue={payload?.amount}
                  />
                </div>

                {/* edit button */}
                <div className="flex items-center gap-3 mt-4">
                  <span className="w-[140px]"></span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/expenses"
                      className="w-[160px] p-4 rounded-full border border-errorLightColor text-errorLightColor font-medium text-center"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="w-[160px] p-4 rounded-full bg-primaryMainLight font-medium text-whiteHigh text-center"
                    >
                      Save
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
