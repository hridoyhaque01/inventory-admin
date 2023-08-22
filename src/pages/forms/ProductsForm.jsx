import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/loaders/RequestLoader";
import { useAddSupplierMutation } from "../../features/supplier/supplierApi";

function ProductsForm() {
  const [addSupplier, { isLoading }] = useAddSupplierMutation();
  const { state } = useLocation();
  const { payload, type } = state || {};
  const [paidAmount, setPaidAmount] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const totalPrice = productQuantity
    ? buyingPrice * Number(productQuantity)
    : buyingPrice;

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
    const productId = form.productId.value;
    const productName = form.productName.value;
    const productCategory = form.productCategory.value;
    const productQuantity = form.productQuantity.value;
    const unit = form.unit.value;
    const totalPrice = form.totalPrice.value;
    const paid = form.paid.value;
    const pricePerUnit = form.pricePerUnit.value;

    const data = {
      supplierName,
      supplierPhone,
      productId,
      productName,
      productCategory,
      productQuantity: Number(productQuantity),
      unit,
      pricePerUnit: pricePerUnit,
      totalPrice: Number(totalPrice),
      paid: Number(paid),
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    addSupplier(formData)
      .unwrap()
      .then((res) => {
        infoNotify("Add supplier successfull");
        form.reset();
        setPaidAmount("");
        setBuyingPrice("");
        setProductQuantity("");
      })
      .catch((error) => {
        errorNotify("Add supplier failed");
      });
  };

  useEffect(() => {
    if (payload?._id) {
      setBuyingPrice(payload?.totalPrice);
      setPaidAmount(payload?.paid);
      setProductQuantity(payload?.productQuantity);
    }
  }, [payload?._id]);

  const handlePaid = (event) => {
    const value = event.target.value;
    if (totalPrice < Number(value)) {
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
            Add Products
          </h4>
        </div>
        <div className="bg-whiteHigh w-full px-4">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-start gap-6">
                {/* Supplier Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    Product Id :
                  </span>
                  <input
                    type="text"
                    placeholder="Enter product Id"
                    name="productId"
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm`}
                    required
                    readOnly={type === "edit" ? true : false}
                    defaultValue={payload?.productId}
                  />
                </div>
                {/* product Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    product Name :
                  </span>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    name="productName"
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm`}
                    required
                    readOnly={type === "edit" ? true : false}
                    defaultValue={payload?.productName}
                  />
                </div>

                {/* Product Category: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Product Category:
                  </span>
                  <div className="relative w-full">
                    <select
                      className="w-full bg-transparent p-3 border border-whiteLow rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                      name="productCategory"
                      defaultValue={payload ? payload?.productCategory : ""}
                      required
                      disabled={type === "edit" ? true : false}
                    >
                      <option value="" disabled>
                        Select product Category
                      </option>
                      <option value="category one">Category one</option>
                      <option value="category two">Category two</option>
                      <option value="category three">Category three</option>
                      <option value="category four">Category four</option>
                      <option value="category five">Category five</option>
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
                          fill={type === "edit" ? "#808080" : "#303030"}
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Quantity Price/Unit: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Quantity:
                  </span>
                  <div className="w-full py-3 px-4 flex items-center border border-whiteLow outline-none rounded text-blackLow text-sm">
                    <input
                      type="number"
                      name="productQuantity"
                      className={`w-28 border-none outline-none ${
                        type === "edit" ? "text-fadeColor" : "text-blackLow"
                      }`}
                      placeholder="Enter quantity"
                      defaultValue={`${payload?.productQuantity}`}
                      required
                      readOnly={type === "edit" ? true : false}
                    />

                    <div className="relative w-full max-w-max">
                      <select
                        className="appearance-none outline-none  w-16"
                        name="unit"
                        defaultValue={`${payload?.unit}` || "KG"}
                        disabled={type === "edit" ? true : false}
                      >
                        <option value="KG">KG</option>
                        <option value="Bosta">Bosta</option>
                        <option value="Litter">Litter</option>
                        <option value="Gram">Gram</option>
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
                            fill={type === "edit" ? "#808080" : "#303030"}
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* <input
                    type="number"
                    name="buyingPrice"
                    placeholder="Buying price"
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded ${type==="edit" ? 'text-fadeColor' :'text-blackLow'} text-sm`}
                  /> */}
                </div>

                {/* product id */}

                {/* submit buttons  */}

                <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4">
                  <span className="w-[140px]"></span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/products"
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

export default ProductsForm;
