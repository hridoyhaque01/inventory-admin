import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/loaders/RequestLoader";
import ProductSuggestions from "../../components/shared/autosuggestions/ProductSuggestions";
import { useAddProductsMutation } from "../../features/inventory/inventoryApi";
import { useGetProductsQuery } from "../../features/products/productsApi";
import { useGetStoresQuery } from "../../features/store/storeApi";

function InventoryForm() {
  const { state } = useLocation() || {};
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productValue, setProductValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [addProducts, { isLoading }] = useAddProductsMutation();

  const {
    data: products,
    isLoading: productsLoading,
    isError: productError,
  } = useGetProductsQuery();

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
    const productQuantity = form.unitCount.value;
    const buyingPrice = Number(form.buyingPrice.value);
    const sellingPrice = Number(form.sellingPrice.value);
    const store = form.store.value;
    const splitStore = store?.split("-");
    const storeName = splitStore[0] || "";
    const storeId = splitStore[1] || "";

    const data = {
      productId: selectedProduct?.productId,
      productName: selectedProduct?.productName,
      productCategory: selectedProduct?.productCategory,
      productQuantity,
      unit: selectedProduct?.productUnit,
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
        infoNotify("Add product successfull");
        form.reset();
        setSelectedProduct({});
        setProductValue("");
        setQuantity("");
      })
      .catch((error) => {
        errorNotify("Add product failed");
      });
    console.log(data);
  };

  const handleQuantity = (event) => {
    const value = event.target.value;
    if (Number(value) > Number(selectedProduct?.productLeft)) {
      return;
    } else {
      setQuantity(value);
    }
  };

  return storeLoading || productsLoading ? (
    <div>Loading...</div>
  ) : isError || productError ? (
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
                {/* productId */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 relative">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap sm:text-base text-left md:text-right">
                    Product ID :
                  </span>
                  <div className="w-full relative">
                    <ProductSuggestions
                      suggestions={products}
                      setSelectedProduct={setSelectedProduct}
                      setValue={setProductValue}
                      value={productValue}
                    ></ProductSuggestions>
                  </div>
                </div>

                {/* Product Name */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Product Name :
                  </span>
                  <input
                    type="text"
                    placeholder="Product name"
                    name="productName"
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor`}
                    defaultValue={selectedProduct?.productName}
                    readOnly
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Product Category :
                  </span>
                  <input
                    type="text"
                    placeholder="Product name"
                    name="productCategory"
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor`}
                    defaultValue={selectedProduct?.productCategory}
                    readOnly
                  />
                </div>

                {/* Shop name */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Shop Name :
                  </span>
                  <div className="relative w-full">
                    <select
                      className="w-full bg-transparent p-3 border border-whiteLow rounded-md flex items-center text-blackLow placeholder:text-blackSemi appearance-none outline-none"
                      name="store"
                      defaultValue=""
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
                          fill="#303030"
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
                  <div className="w-full py-3 px-4 flex items-center border border-whiteLow outline-none rounded text-blackLow">
                    <input
                      type="number"
                      name="unitCount"
                      className={`w-28 border-none outline-none text-blackLow`}
                      placeholder="Quantity"
                      value={quantity}
                      onChange={(e) => handleQuantity(e)}
                      required
                      readOnly={selectedProduct?._id ? false : true}
                    />

                    <div className="relative w-full max-w-max">
                      <input
                        type="text"
                        className="appearance-none outline-none  w-16 text-fadeColor"
                        readOnly
                        defaultValue={selectedProduct?.productUnit}
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
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow`}
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
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow`}
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
        />
      </div>
    </section>
  );
}

export default InventoryForm;
