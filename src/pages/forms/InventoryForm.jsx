import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/loaders/RequestLoader";
import ProductSuggestions from "../../components/shared/autosuggestions/ProductSuggestions";
import { useAddProductsMutation } from "../../features/inventory/inventoryApi";
import { useGetProductsQuery } from "../../features/products/productsApi";
import { useGetStoresQuery } from "../../features/store/storeApi";

function InventoryForm() {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productValue, setProductValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [addProducts, { isLoading }] = useAddProductsMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    data: products,
    isLoading: productsLoading,
    isError: productError,
  } = useGetProductsQuery();

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
      product_id: selectedProduct?._id,
      unitLeft: productQuantity,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    const productLeftInit =
      parseInt(selectedProduct?.productLeft) - parseInt(productQuantity);
    const productData = { productLeft: productLeftInit };
    const productForm = new FormData();

    productForm.append("data", JSON.stringify(productData));

    addProducts({
      data: formData,
      productData: productForm,
      productId: selectedProduct?._id,
    })
      .unwrap()
      .then((res) => {
        form.reset();
        setSelectedProduct({});
        setProductValue("");
        setQuantity("");
        navigate("/inventory");
      })
      .catch((error) => {
        errorNotify("Add product failed");
      });
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
    <div>{t("loading")}...</div>
  ) : isError || productError ? (
    <div>{t("somethingWrong")}</div>
  ) : (
    <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-lg md:text-2xl font-bold">
            {t("tableTitle.inventory")}
          </h4>
        </div>
        <div className="bg-whiteHigh px-4 w-full">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-start gap-6">
                {/* productId */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.productId")} :
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
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.productName")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("tables.productName")}
                    name="productName"
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor bg-whiteMid text-sm sm:text-base`}
                    defaultValue={selectedProduct?.productName}
                    readOnly
                  />
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.productCategory")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("tables.productCategory")}
                    name="productCategory"
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor bg-whiteMid text-sm sm:text-base`}
                    defaultValue={selectedProduct?.productCategory}
                    readOnly
                  />
                </div>

                {/* Shop name */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.shopName")} :
                  </span>
                  <div className="relative w-full">
                    <select
                      className="w-full bg-transparent p-3 border border-whiteLow rounded-md flex items-center text-blackLow placeholder:text-blackSemi appearance-none outline-none text-sm sm:text-base"
                      name="store"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        {t("placeholders.selectShopName")}
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
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.quantity")} :
                  </span>
                  <div className="w-full py-3 px-4 flex items-center border border-whiteLow outline-none rounded text-blackLow">
                    <input
                      type="number"
                      name="unitCount"
                      className={`w-28 border-none outline-none text-blackLow text-sm sm:text-base`}
                      placeholder={t("tables.quantity")}
                      value={quantity}
                      onChange={(e) => handleQuantity(e)}
                      required
                      readOnly={selectedProduct?._id ? false : true}
                    />

                    <div className="relative w-full max-w-max">
                      <input
                        type="text"
                        className="appearance-none outline-none  w-16 text-fadeColor text-sm sm:text-base"
                        readOnly
                        defaultValue={selectedProduct?.productUnit}
                      />
                    </div>
                  </div>
                </div>
                {/* Buying Price/Unit: */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.buyingPrice")} :
                  </span>
                  <input
                    type="number"
                    name="buyingPrice"
                    placeholder={t("placeholders.enterBuyingPrice")}
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm sm:text-base`}
                  />
                </div>

                {/* Selling Price/Unit: */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.sellingPrice")} :
                  </span>
                  <input
                    type="number"
                    name="sellingPrice"
                    placeholder={t("placeholders.enterSellingPrice")}
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm sm:text-base`}
                  />
                </div>
                {/* submit buttons */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 mt-2">
                  <span className="w-[140px]"></span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/inventory"
                      className="w-[140px] sm:w-[160px] p-3 sm:p-4 rounded-full border border-errorLightColor text-errorLightColor font-medium text-center text-sm sm:text-base"
                    >
                      {t("buttons.cancel")}
                    </Link>
                    <button
                      type="submit"
                      disabled={Number(quantity) <= 0}
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
