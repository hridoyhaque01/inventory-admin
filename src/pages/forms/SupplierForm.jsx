import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/loaders/RequestLoader";
import {
  useAddSupplierMutation,
  useUpdateSuppliersMutation,
} from "../../features/supplier/supplierApi";

function SupplierForm() {
  const [addSupplier, { isLoading }] = useAddSupplierMutation();
  const [updateSuppliers, { isLoading: updateFetching }] =
    useUpdateSuppliersMutation();
  const { state } = useLocation();
  const { payload, type } = state || {};
  const [paidAmount, setPaidAmount] = useState("");
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
    const supplierName = form.supplierName.value;
    const supplierPhone = form.supplierPhone.value;
    const supplierAddress = form.supplierAddress.value;
    const data = {
      supplierName,
      supplierPhone,
      supplierAddress,
    };

    if (type !== "edit") {
      data.supplierDue = "0";
    }

    if (paidAmount && type === "edit") {
      data.supplierDue = (
        Number(payload.supplierDue) - Number(paidAmount)
      ).toString();
    }
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    if (type === "edit") {
      updateSuppliers({ data: formData, id: payload?._id })
        .unwrap()
        .then((res) => {
          infoNotify("update supplier successfull");
          form.reset();
          setPaidAmount("");
          navigate("/suppliers");
        })
        .catch((error) => {
          errorNotify("update supplier failed");
        });
    } else {
      addSupplier(formData)
        .unwrap()
        .then((res) => {
          infoNotify("Add supplier successfull");
          form.reset();
          setPaidAmount("");
        })
        .catch((error) => {
          console.log(error);
          errorNotify("Add supplier failed");
        });
    }
  };

  const handlePaid = (event) => {
    const value = event.target.value;
    if (Number(payload?.supplierDue) < Number(value)) {
      return;
    } else {
      setPaidAmount(value);
    }
  };

  return (
    <section className="h-full w-full overflow-auto px-6 md:px-10 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-lg md:text-2xl font-bold">
            Add Supplier
          </h4>
        </div>
        <div className="bg-whiteHigh w-full px-4">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-start gap-6">
                {/* Supplier Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    Supplier Name :
                  </span>
                  <input
                    type="text"
                    placeholder="Enter supplier name"
                    name="supplierName"
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm`}
                    required
                    defaultValue={payload?.supplierName}
                  />
                </div>

                {/* Supplier Phone */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    Supplier Phone :
                  </span>
                  <input
                    type="number"
                    placeholder="Enter supplier phone number"
                    name="supplierPhone"
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm`}
                    required
                    defaultValue={payload?.supplierPhone}
                  />
                </div>

                {/* product Address */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    Supplier Address :
                  </span>
                  <input
                    type="text"
                    placeholder="Enter supplier address"
                    name="supplierAddress"
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm`}
                    required
                    defaultValue={payload?.supplierAddress}
                  />
                </div>

                {/* product id */}

                {/* paid */}
                {type === "edit" && (
                  <>
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                        Due Amount :
                      </span>
                      <input
                        type="number"
                        placeholder="due amount"
                        name="supplierDue"
                        step="any"
                        className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm`}
                        required
                        readOnly={type === "edit" ? true : false}
                        defaultValue={payload?.supplierDue}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                        Paid :
                      </span>
                      <input
                        type="number"
                        placeholder="Enter paid amount"
                        name="paid"
                        step="any"
                        className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm"
                        value={paidAmount}
                        onChange={(e) => handlePaid(e)}
                      />
                    </div>
                  </>
                )}
                {/* submit buttons  */}

                <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4">
                  <span className="w-[140px]"></span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/suppliers"
                      className="w-[140px] sm:w-[160px] p-3 sm:p-4 rounded-full border border-errorLightColor text-errorLightColor font-medium text-center"
                    >
                      Back
                    </Link>
                    <button
                      type="submit"
                      className="w-[140px] sm:w-[160px] p-3 sm:p-4 rounded-full border bg-primaryMainLight text-whiteHigh font-medium text-center"
                    >
                      Submit
                    </button>
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
        {isLoading && <RequestLoader></RequestLoader>}
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
          ></ToastContainer>
        </div>
      </div>
    </section>
  );
}

export default SupplierForm;
