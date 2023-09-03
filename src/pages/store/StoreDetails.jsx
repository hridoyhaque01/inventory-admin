import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/loaders/RequestLoader";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import ResetPasswordModal from "../../components/modals/ResetPasswordModal";
import StoreModal from "../../components/modals/StoreModal";
import {
  useUpdateStoreMutation,
  useUpdateStorePasswordMutation,
} from "../../features/store/storeApi";

function StoreDetails() {
  const [updateStorePassword, { isLoading }] = useUpdateStorePasswordMutation();
  const { state } = useLocation() || {};
  const { payload } = state || {};
  const { t } = useTranslation();

  const [updateStore, { isLoading: storeUpdateLoading }] =
    useUpdateStoreMutation();

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

  return (
    <div className="w-full overflow-hidden px-4 md:px-6 mt-6">
      <div className="flex flex-col justify-around  w-full bg-whiteHigh shadow-md rounded-2xl overflow-hidden">
        <div className=" w-full bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-lg md:text-2xl font-bold">
            {payload?.name}
          </h4>
        </div>
        <div className="w-full overflow-auto">
          <table className="table w-full  ">
            <thead className=" p-0">
              <tr className="font-bold text-sm sm:text-base ms:text-xl">
                <th className="bg-primaryMainLightest text-blackHigh normal-case">
                  {t("tables.serial")}
                </th>
                <th className="bg-primaryMainLightest text-blackHigh normal-case">
                  {t("tables.created")}
                </th>
                <th className="bg-primaryMainLightest text-blackHigh normal-case">
                  {t("tables.name")}
                </th>

                <th className="bg-primaryMainLightest text-blackHigh normal-case">
                  {t("forms.email")}
                </th>

                <th className="bg-primaryMainLightest text-blackHigh normal-case">
                  {t("forms.password")}
                </th>

                <th className="bg-primaryMainLightest text-blackHigh normal-case text-center">
                  {t("tables.action")}
                </th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="border-none text-xs sm:text-base">
                <td className="py-3">01</td>
                <td className="py-3">
                  {new Date(payload?.timestamp * 1000).toLocaleDateString(
                    "en-US"
                  )}
                </td>

                <td className="py-3">{payload?.name}</td>
                <td className="py-3">{payload?.email}</td>
                <td className="py-3">*************</td>
                <td className="py-3 text-center flex items-center justify-center gap-2">
                  <label
                    htmlFor="resetPasswordModal"
                    className="inline-flex bg-successLight px-4 sm:py-2 py-3 rounded-md text-successColor cursor-pointer whitespace-nowrap"
                  >
                    {t("buttons.reset")}
                  </label>
                  <label
                    htmlFor="storeModal"
                    className="inline-flex bg-primaryMainLow px-4 sm:py-2 py-3 rounded-md text-successColor cursor-pointer whitespace-nowrap"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 sm:w-6 sm:h-6"
                    >
                      <path
                        d="M3.64355 16.3148L12.0605 7.89792M3.64355 16.3148L12.0605 7.89792M3.64355 16.3148C3.55625 16.4021 3.5 16.5354 3.5 16.6613V19.0013C3.5 19.2751 3.72614 19.5013 4 19.5013H6.34C6.46935 19.5013 6.59727 19.4496 6.70192 19.3523M3.64355 16.3148L6.70192 19.3523M12.0605 7.89792L15.1124 10.9418L6.70192 19.3523M12.0605 7.89792L6.70192 19.3523M19 19.5013H12.2071L15.2071 16.5013H19C19.8239 16.5013 20.5 17.1774 20.5 18.0013C20.5 18.8251 19.8239 19.5013 19 19.5013ZM18.3564 6.98483C18.5512 7.17957 18.5512 7.49299 18.3564 7.68773L16.88 9.16417L13.8371 6.12128L15.3136 4.64483C15.5083 4.45009 15.8217 4.45009 16.0164 4.64483L18.3564 6.98483Z"
                        fill="#F4A100"
                        stroke="#F4A100"
                      />
                    </svg>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <ResetPasswordModal
          email={payload?.email}
          errorNotify={errorNotify}
          infoNotify={infoNotify}
          handler={updateStorePassword}
        ></ResetPasswordModal>
        <StoreModal
          email={payload?.email}
          errorNotify={errorNotify}
          infoNotify={infoNotify}
          handler={updateStore}
          activeStore={payload}
        ></StoreModal>
        <ConfirmationModal status="tableTitle.editNotAllow"></ConfirmationModal>
      </div>
      {(isLoading || storeUpdateLoading) && <RequestLoader></RequestLoader>}
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
    </div>
  );
}

export default StoreDetails;
