import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/loaders/RequestLoader";
import { useUpdateProductsMutation } from "../../features/inventory/inventoryApi";
import { useGetProductsByIdQuery } from "../../features/products/productsApi";

function InventoryUpdateForm() {
  const { state } = useLocation() || {};
  const { payload, type } = state || {};
  const [updateProducts, { isLoading }] = useUpdateProductsMutation();
  const navigate = useNavigate();
  const {
    data,
    isError,
    isLoading: productLoading,
  } = useGetProductsByIdQuery(payload?.productId);
  const { t } = useTranslation();

  const [quantity, setQuantity] = useState("");
  const [productLeft, setProductLeft] = useState("");

  const [isSubmitAcc, setIsSubmitAcc] = useState(true);

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
    const productName = form.productName.value;

    const inventoryData = {
      productId: payload?.productId,
      productName,
      productQuantity: quantity,
      unitLeft: productLeft,
    };

    const productLeftInit =
      parseInt(data?.productLeft) -
      (parseInt(quantity) - parseInt(payload?.productQuantity));

    const productData = {
      productLeft: productLeftInit,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(inventoryData));

    const productForm = new FormData();
    productForm.append("data", JSON.stringify(productData));
    updateProducts({
      data: formData,
      storeId: payload?.storeId,
      productData: productForm,
      productId: data?._id,
    })
      .unwrap()
      .then((res) => {
        navigate("/inventory");
      })
      .catch((error) => {
        errorNotify("Update inventory failed");
      });
  };

  const handleQuantity = (e) => {
    const value = e.target.value;
    if (
      parseInt(value) < parseInt(payload?.productQuantity) ||
      parseInt(value) > parseInt(data?.productLeft)
    ) {
      setIsSubmitAcc(false);
    } else {
      setIsSubmitAcc(true);
    }
    setQuantity(value);
    const unitLeft =
      parseInt(payload?.unitLeft) +
      (parseInt(value) - parseInt(payload?.productQuantity));
    setProductLeft(unitLeft);
  };

  useEffect(() => {
    if (payload?.productId) {
      setQuantity(payload?.productQuantity);
      setProductLeft(payload?.unitLeft);
    }
  }, [payload?.productId, payload?.productQuantity, payload?.unitLeft]);

  return productLoading ? (
    <div>{t("loading")}...</div>
  ) : isError ? (
    <div>{t("somethingWrong")}</div>
  ) : (
    <section className="h-full w-full overflow-auto px-10 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-2xl font-bold">
            {t("tableTitle.inventory")}
          </h4>
        </div>
        <div className="bg-whiteHigh w-full">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-start gap-6">
                {/* productId */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    {t("tables.productId")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("placeholders.enterProductId")}
                    name="productId"
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor bg-whiteMid`}
                    defaultValue={payload?.productId}
                    readOnly
                  />
                </div>

                {/* Product Name */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    {t("tables.productName")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("tables.productName")}
                    name="productName"
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow`}
                    defaultValue={payload?.productName}
                  />
                </div>

                {/* Product Category  */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    {t("tables.productCategory")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("tables.productCategory")}
                    name="productCategory"
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor bg-whiteMid`}
                    defaultValue={payload?.productCategory}
                    readOnly
                  />
                </div>

                {/* Shop name */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    {t("tables.shopName")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("tables.shopName")}
                    name="storeName"
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor bg-whiteMid`}
                    defaultValue={payload?.storeName}
                    readOnly
                  />
                </div>

                {/* Quantity Price/Unit: */}
                {/* Quantity Price/Unit: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    {t("tables.quantity")} :
                  </span>
                  <div className="w-full py-3 px-4 flex items-center border border-whiteLow outline-none rounded text-fadeColor ">
                    <input
                      type="number"
                      name="unitCount"
                      className={`w-28 border-none outline-none text-blackLow`}
                      placeholder={t("tables.quantity")}
                      value={quantity}
                      onChange={(e) => handleQuantity(e)}
                      // readOnly
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
                    {t("tables.buyingPrice")} :
                  </span>
                  <input
                    type="number"
                    name="buyingPrice"
                    placeholder={t("placeholders.enterBuyingPrice")}
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor bg-whiteMid`}
                    defaultValue={payload?.buyingPrice}
                    readOnly
                  />
                </div>

                {/* Selling Price/Unit: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    {t("tables.sellingPrice")} :
                  </span>
                  <input
                    type="number"
                    name="sellingPrice"
                    placeholder={t("placeholders.enterSellingPrice")}
                    required
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor bg-whiteMid`}
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
                      {t("buttons.cancel")}
                    </Link>
                    <button
                      type="submit"
                      className="w-[160px] p-4 rounded-full bg-primaryMainLight font-medium text-whiteHigh text-center"
                      disabled={!isSubmitAcc}
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
      {(isLoading || productLoading) && <RequestLoader></RequestLoader>}
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
