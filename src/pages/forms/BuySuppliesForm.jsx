import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/loaders/RequestLoader";
import ProductSuggestions from "../../components/shared/autosuggestions/ProductSuggestions";
import SupplierSuggestions from "../../components/shared/autosuggestions/SupplierSuggestions";
import { useAddSuppliesMutation } from "../../features/buySupplies/buySuppliesApi";
import { useGetProductsQuery } from "../../features/products/productsApi";
import { useGetSuppliersQuery } from "../../features/supplier/supplierApi";

function BuySuppliesForm() {
  const { state } = useLocation();
  const [addSupplies, { isLoading }] = useAddSuppliesMutation();
  const { payload, type } = state || {};
  const [selectedProduct, setSelectedProduct] = useState({});
  const [productValue, setProductValue] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState({});
  const [supplierValue, setSupplierValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  let totalPrice = quantity && unitPrice ? Number(quantity) * unitPrice : "";

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

    const formData = new FormData();
    console.log(data);
    formData.append("data", JSON.stringify(data));

    addSupplies(formData)
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
      })
      .catch((error) => {
        errorNotify("Add supplies invoice failed");
      });
  };

  return productsLoading || suppliersLoading ? (
    <div>Loading...</div>
  ) : productError || suppliersError ? (
    <div>Something went wrong</div>
  ) : (
    <section className="h-full w-full overflow-auto px-10 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-2xl font-bold">Add </h4>
        </div>
        <div className="bg-whiteHigh w-full">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-start gap-6">
                {/* productId */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 relative">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
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
                    Product Name:
                  </span>
                  <input
                    type="text"
                    placeholder="Product name"
                    name="productName"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm"
                    readOnly
                    defaultValue={selectedProduct?.productName}
                  />
                </div>

                {/* Quantity Price/Unit: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Quantity:
                  </span>
                  <div className="w-full py-3 px-4 flex items-center border border-whiteLow outline-none rounded text-blackLow text-sm">
                    <input
                      type="number"
                      name="unitCount"
                      className={`w-28 border-none outline-none ${
                        type === "edit" ? "text-fadeColor" : "text-blackLow"
                      }`}
                      placeholder="Quantity"
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
                    Supplier Name :
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
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Unit price :
                  </span>
                  <input
                    type="text"
                    placeholder="Enter unit count"
                    name="unitPrice"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                  />
                </div>

                {/* Shop Name: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Total Price :
                  </span>
                  <input
                    type="text"
                    placeholder="Total price"
                    name="totalAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm"
                    readOnly
                    defaultValue={totalPrice}
                  />
                </div>

                {/* Shop Name: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Paid Amount :
                  </span>
                  <input
                    type="text"
                    placeholder="Enter paid amount"
                    name="paidAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm"
                    value={totalPrice ? paidAmount : ""}
                    onChange={(e) => handlePaid(e)}
                  />
                </div>

                {/* Shop Name: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Due Amount :
                  </span>
                  <input
                    type="text"
                    placeholder="Enter due amount"
                    name="dueAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm"
                    readOnly
                    defaultValue={
                      totalPrice && paidAmount
                        ? Number(totalPrice) - Number(paidAmount)
                        : ""
                    }
                  />
                </div>

                {/* edit button */}
                <div className="flex items-center gap-3 mt-4">
                  <span className="w-[140px]"></span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/supplies"
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
