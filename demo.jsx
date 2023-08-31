import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/loaders/RequestLoader";
import SearchLoader from "../../components/loaders/SearchLoader";
import PaidToOwnerModal from "../../components/modals/PaidToOwnerModal";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
import StoreFinancialTable from "../../components/tables/storeFinancialTable/StoreFinancialTable";
import {
  useGetStoresResultQuery,
  useUpdatePaymentMutation,
} from "../../features/store/storeApi";
import { setActiveTab } from "../../features/store/storeSlice";
function StoreFinancial() {
  const { data, isLoading, isError } = useGetStoresResultQuery();
  const [updatePayment, { isLoading: paymentLoading }] =
    useUpdatePaymentMutation();
  const [activeStore, setActiveStore] = useState({});
  const { activeTab } = useSelector((state) => state.store);
  const dispatch = useDispatch();
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

  let content = null;

  if (isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (!isLoading && !isError && data?.length === 0) {
    content = <NoData></NoData>;
  } else if (!isLoading && !isError && data?.length > 0) {
    content = (
      <>
        <nav
          className="w-full flex items-center px-1 gap-2 rounded-sm  overflow-auto tabs-container"
          aria-label="Tabs"
          role="tablist"
        >
          {data?.map((item, i) => (
            <button
              type="button"
              className={`hs-tab-active:bg-primaryMainLight hs-tab-active:text-whiteHigh bg-whiteHigh border-transparent rounded py-2 px-6 inline-flex items-center gap-2 text-sm whitespace-nowrap font-medium ${
                activeTab === "store" + i ? "active" : ""
              }`}
              id={item?.storeData?.email}
              data-hs-tab={`#store${i}`}
              aria-controls={`store${i}`}
              role="tab"
              key={i}
              onClick={() => dispatch(setActiveTab(`store${i}`))}
            >
              {item?.storeData?.name}
            </button>
          ))}
        </nav>

        <div className="mt-3">
          {data?.map((item, i) => (
            <div
              id={`store${i}`}
              role="tabpanel"
              aria-labelledby="basic-tabs-item-1"
              className={activeTab !== "store" + i ? "hidden" : ""}
              key={i}
            >
              <StoreFinancialTable
                results={item}
                setActiveStore={setActiveStore}
              ></StoreFinancialTable>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
      <div className="">{content}</div>
      {paymentLoading && <RequestLoader></RequestLoader>}
      <PaidToOwnerModal
        activeStore={activeStore}
        errorNotify={errorNotify}
        infoNotify={infoNotify}
        handler={updatePayment}
      ></PaidToOwnerModal>
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
    </section>
  );
}

export default StoreFinancial;
