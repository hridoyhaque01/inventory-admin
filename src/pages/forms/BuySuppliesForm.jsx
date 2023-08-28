import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/loaders/RequestLoader";
import ProductSuggestions from "../../components/shared/autosuggestions/ProductSuggestions";
import SupplierSuggestions from "../../components/shared/autosuggestions/SupplierSuggestions";
import { useAddSuppliesMutation } from "../../features/buySupplies/buySuppliesApi";
import { useGetProductsQuery } from "../../features/products/productsApi";
import { useGetSuppliersQuery } from "../../features/supplier/supplierApi";

function BuySuppliesForm() {
  const [addSupplies, { isLoading }] = useAddSuppliesMutation();
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productValue, setProductValue] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState({});
  const [supplierValue, setSupplierValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  let totalPrice = quantity && unitPrice ? Number(quantity) * unitPrice : "";
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

  const {
    data: products,
    isLoading: productsLoading,
    isError: productError,
  } = useGetProductsQuery();
  const {
    data: suppliers,
    isLoading: suppliersLoading,
    isError: suppliersError,
  } = useGetSuppliersQuery();

  const handlePaid = (event) => {
    const value = event.target.value;
    if (totalPrice && Number(totalPrice) < Number(value)) {
      return;
    } else {
      setPaidAmount(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const productId = selectedProduct?.productId;
    const productName = selectedProduct?.productName;
    const unit = selectedProduct?.productUnit;
    const supplierId = selectedSupplier?._id;
    const supplierName = selectedSupplier?.supplierName;
    const supplierPhone = selectedSupplier?.supplierPhone;
    const unitPrice = form.unitPrice.value;
    const totalAmount = form.totalAmount.value;
    const paidAmount = form.paidAmount.value;
    const dueAmount = form.dueAmount.value;
    const unitCount = form.unitCount.value;

    const data = {
      productId,
      productName,
      unit,
      supplierId,
      supplierName,
      supplierPhone,
      unitPrice,
      totalAmount,
      paidAmount,
      dueAmount,
      unitCount,
    };

    // supplies data
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    // product form data

    const productLeftCount =
      parseInt(selectedProduct?.productLeft) + parseInt(unitCount);
    const productdata = { productLeft: productLeftCount };
    const productForm = new FormData();
    productForm.append("data", JSON.stringify(productdata));

    // supplier form data

    const supplierForm = new FormData();
    const supplierDueData =
      parseInt(selectedSupplier?.supplierDue) + parseInt(dueAmount);
    const supplierData = { supplierDue: supplierDueData };
    supplierForm.append("data", JSON.stringify(supplierData));

    addSupplies({
      data: formData,
      productId: selectedProduct?._id,
      productData: productForm,
      supplierId: supplierId,
      supplierData: supplierForm,
    })
      .unwrap()
      .then((res) => {
        infoNotify("Add supplies invoice successfull");
        form.reset();
        setSelectedProduct({});
        setProductValue("");
        setSelectedSupplier({});
        setSupplierValue("");
        setQuantity("");
        setPaidAmount("");
        setUnitPrice("");
        navigate("/supplies");
      })
      .catch((error) => {
        errorNotify("Add supplies invoice failed");
      });
  };

  return productsLoading || suppliersLoading ? (
    <div>{t("loading")}...</div>
  ) : productError || suppliersError ? (
    <div>{t("somethingWrong")}</div>
  ) : (
    <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-lg md:text-2xl font-bold">
            {t("tableTitle.supplies")}
          </h4>
        </div>
        <div className="bg-whiteHigh w-full px-4">
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
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm bg-whiteMid"
                    readOnly
                    defaultValue={selectedProduct?.productName}
                  />
                </div>

                {/* Quantity Price/Unit: */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.quantity")} :
                  </span>
                  <div className="w-full py-3 px-4 flex items-center border border-whiteLow outline-none rounded text-blackLow text-sm">
                    <input
                      type="number"
                      name="unitCount"
                      className={`w-28 border-none outline-none text-blackLow`}
                      placeholder={t("tables.quantity")}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
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
                  {/* <input
                    type="number"
                    name="buyingPrice"
                    placeholder="Buying price"
                    className={`w-full py-3 px-4 border border-whiteLow outline-none rounded ${type==="edit" ? 'text-fadeColor' :'text-blackLow'} text-sm`}
                  /> */}
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-3 relative">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.supplierName")} :
                  </span>
                  <div className="w-full relative">
                    <SupplierSuggestions
                      suggestions={suppliers}
                      setSelectedSupplier={setSelectedSupplier}
                      setValue={setSupplierValue}
                      value={supplierValue}
                    ></SupplierSuggestions>
                  </div>
                </div>

                {/* Unit Count */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.unitPrice")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("placeholders.enterUnitPrice")}
                    name="unitPrice"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                  />
                </div>

                {/* Shop Name: */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.totalPrice")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("placeholders.enterTotalPrice")}
                    name="totalAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm bg-whiteMid"
                    readOnly
                    defaultValue={totalPrice}
                  />
                </div>

                {/* Paid Amount : */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("forms.paidAmount")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("placeholders.enterPaid")}
                    name="paidAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm"
                    value={totalPrice ? paidAmount : ""}
                    onChange={(e) => handlePaid(e)}
                  />
                </div>

                {/* Shop Name: */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.dueAmount")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("placeholders.enterDueAmount")}
                    name="dueAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm bg-whiteMid"
                    readOnly
                    defaultValue={
                      totalPrice && paidAmount
                        ? Number(totalPrice) - Number(paidAmount)
                        : ""
                    }
                  />
                </div>

                {/* submit button */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4">
                  <span className="w-[140px]"></span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/supplies"
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

export default BuySuppliesForm;
