import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/loaders/RequestLoader";
import {
  useAddProductsMutation,
  useUpdateProductsMutation,
} from "../../features/inventory/inventoryApi";
import { useGetStoresQuery } from "../../features/store/storeApi";

function InventoryForm() {
  const { state } = useLocation() || {};
  const { payload, type } = state || {};
  const [addProducts, { isLoading }] = useAddProductsMutation();
  const [updateProducts, { isLoading: updateProductLoading }] =
    useUpdateProductsMutation();
  const navigate = useNavigate();
  const {
    data: stores,
    isLoading: storeLoading,
    isError,
  } = useGetStoresQuery();

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
    const productId = form.productId.value;
    const productName = form.productName.value;
    const productCategory = form.productCategory.value;
    const productQuantity = Number(form.productQuantity.value);
    const unit = form.unit.value;
    const buyingPrice = Number(form.buyingPrice.value);
    const sellingPrice = Number(form.sellingPrice.value);
    const store = form.store.value;
    const splitStore = store?.split("-");
    const storeName = splitStore[0] || "";
    const storeId = splitStore[1] || "";
    const data = {
      productId,
      productName,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (type === "edit") {
      updateProducts({ data: formData, storeId: storeId })
        .unwrap()
        .then((res) => {
          navigate("/inventory");
        })
        .catch((error) => {
          errorNotify("Product update failed");
          console.log(error);
        });
    } else {
      const data = {
        productId,
        productName,
        productCategory,
        productQuantity,
        unit,
        buyingPrice,
        sellingPrice,
        storeName,
        storeId,
        unitLeft: productQuantity,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      addProducts(formData)
        .unwrap()
        .then((res) => {
          form.reset();
          infoNotify("Product add successfull");
        })
        .catch((error) => {
          errorNotify("Product add failed");
          console.log(error);
        });
    }
  };

  return storeLoading ? (
    <div>Loading...</div>
  ) : isError ? (
    <div>Something went wrong</div>
  ) : (
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
                    Product ID :
                  </span>
                  <input
                    type="text"
                    placeholder="Enter product ID"
                    name="productId"
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded ${
                      type === "edit" ? "text-fadeColor" : "text-blackLow"
                    } text-sm`}
                    defaultValue={payload?.productId}
                    readOnly={type === "edit" ? true : false}
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
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm`}
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

                {/* Shop name */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Shop Name :
                  </span>
                  <div className="relative w-full">
                    <select
                      className="w-full bg-transparent p-3 border border-whiteLow rounded-md flex items-center text-darkSemi placeholder:text-blackSemi appearance-none outline-none"
                      name="store"
                      defaultValue={
                        payload
                          ? `${payload?.storeName}-${payload?.storeId}`
                          : ""
                      }
                      disabled={type === "edit" ? true : false}
                      required
                    >
                      <option value="" disabled>
                        Select shop name
                      </option>
                      {stores?.map((store, i) => (
                        <option value={`${store?.name}-${store?._id}`} key={i}>
                          {store?.name}
                        </option>
                      ))}
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

                {/* Buying Price/Unit: */}
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
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded ${
                      type === "edit" ? "text-fadeColor" : "text-blackLow"
                    } text-sm`}
                    defaultValue={payload?.buyingPrice}
                    readOnly={type === "edit" ? true : false}
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
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded ${
                      type === "edit" ? "text-fadeColor" : "text-blackLow"
                    } text-sm`}
                    defaultValue={payload?.sellingPrice}
                    readOnly={type === "edit" ? true : false}
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

export default InventoryForm;
