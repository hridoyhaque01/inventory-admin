import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/loaders/RequestLoader";
import {
  useAddProductsMutation,
  useUpdateProductsMutation,
} from "../../features/inventory/inventoryApi";

function InventoryUpdateForm() {
  const { state } = useLocation() || {};
  const { payload, type } = state || {};
  const [addProducts, { isLoading }] = useAddProductsMutation();
  const [updateProducts, { isLoading: updateProductLoading }] =
    useUpdateProductsMutation();
  const navigate = useNavigate();

  console.log(payload);

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
    const productName = form.productName.value;

    const data = {
      productId: payload?.productId,
      productName,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    console.log(data);
  };

  return (
    <section className="h-full w-full overflow-auto px-10 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-2xl font-bold">Inventory</h4>
        </div>
        <div className="bg-whiteHigh w-full">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-start gap-6">
                {/* productId */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Product Id:
                  </span>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    name="productId"
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor `}
                    defaultValue={payload?.productId}
                    readOnly
                  />
                </div>

                {/* Product Name */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Product Name:
                  </span>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    name="productName"
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow `}
                    defaultValue={payload?.productName}
                  />
                </div>

                {/* Product Category  */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Product Category:
                  </span>
                  <input
                    type="text"
                    placeholder="Product category"
                    name="productCategory"
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor `}
                    defaultValue={payload?.productCategory}
                    readOnly
                  />
                </div>

                {/* Shop name */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Shop Name :
                  </span>
                  <input
                    type="text"
                    placeholder="Store name"
                    name="storeName"
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor `}
                    defaultValue={payload?.storeName}
                    readOnly
                  />
                </div>

                {/* Quantity Price/Unit: */}
                {/* Quantity Price/Unit: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Quantity:
                  </span>
                  <div className="w-full py-3 px-4 flex items-center border border-whiteLow outline-none rounded text-fadeColor ">
                    <input
                      type="number"
                      name="unitCount"
                      className={`w-28 border-none outline-none text-fadeColor`}
                      placeholder="Quantity"
                      defaultValue={payload?.productQuantity}
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
                </div>
                {/* Buying Price/Unit: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Buying Price/Unit:
                  </span>
                  <input
                    type="number"
                    name="buyingPrice"
                    placeholder="Enter buying price"
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor `}
                    defaultValue={payload?.buyingPrice}
                    readOnly
                  />
                </div>

                {/* Selling Price/Unit: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Selling Price/Unit:
                  </span>
                  <input
                    type="number"
                    name="sellingPrice"
                    placeholder="Enter selling price"
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor `}
                    defaultValue={payload?.sellingPrice}
                    readOnly
                  />
                </div>
                {/* edit button */}
                <div className="flex items-center gap-3 mt-4">
                  <span className="w-[140px]"></span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/inventory"
                      className="w-[160px] p-4 rounded-full border border-errorLightColor text-errorLightColor font-medium text-center"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={isLoading}
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
      </div>
      {(isLoading || updateProductLoading) && <RequestLoader></RequestLoader>}
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
    </section>
  );
}

export default InventoryUpdateForm;
