import React, { useEffect, useState } from "react";
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
function StoreFinancial() {
  const { data, isLoading, isError } = useGetStoresResultQuery();
  const [updatePayment, { isLoading: paymentLoading }] =
    useUpdatePaymentMutation();

  const [activeStore, setActiveStore] = useState({});
  const [showStoreId, setShowStoreId] = useState("");

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
    const singleStore = data?.find(
      (item) => item?.storeData?._id === showStoreId
    );

    if (singleStore?.storeData?._id) {
      content = (
        <StoreFinancialTable
          setActiveStore={setActiveStore}
          setShowStoreId={setShowStoreId}
          stores={data}
          showStore={singleStore}
        ></StoreFinancialTable>
      );
    } else {
      content = <NoData></NoData>;
    }
  }

  useEffect(() => {
    if (!isError && !isLoading) {
      setShowStoreId(data[0]?.storeData?._id);
    }
  }, [isError, isLoading]);

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
      {/* <ConfirmationModal status="tableTitle.editNotAllow"></ConfirmationModal> */}
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
