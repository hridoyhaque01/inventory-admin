import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/loaders/RequestLoader";
import {
  useAddUnitMutation,
  useUpdateUnitMutation,
} from "../../features/unit/unitApi";
function UnitForm() {
  const { state } = useLocation();
  const { payload, type } = state || {};
  const { t } = useTranslation();
  const [addUnit, { isLoading }] = useAddUnitMutation();
  const [updateUnit, { isLoading: updateLoading }] = useUpdateUnitMutation();
  const navigate = useNavigate();

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
    const unitName = event.target.unitName.value;
    const data = {
      unitName,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (type === "edit") {
      updateUnit({ data: formData, id: payload?._id })
        .unwrap()
        .then((res) => {
          navigate("/unit");
        })
        .catch((error) => {
          errorNotify("Unit update failed");
        });
    } else {
      addUnit(formData)
        .unwrap()
        .then((res) => {
          navigate("/unit");
        })
        .catch((error) => {
          errorNotify("Unit add failed");
        });
    }
  };

  return (
    <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-lg md:text-2xl font-bold">
            {t("placeholders.unit")}
          </h4>
        </div>
        <div className="bg-whiteHigh w-full px-4">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-start gap-6">
                {/* Product Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base  text-left md:text-right">
                    {t("placeholders.unit")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("placeholders.enterUnit")}
                    name="unitName"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm sm:text-base"
                    defaultValue={payload?.unitName}
                  />
                </div>

                {/* submit buttons*/}
                <div className="flex flex-col md:flex-row md:items-center gap-3 mt-2">
                  <span className="w-[140px]"></span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/unit"
                      className="w-[170px] sm:w-[160px] p-3 sm:p-4 rounded-full border border-errorLightColor text-errorLightColor font-medium text-center text-sm sm:text-base"
                    >
                      {t("buttons.cancel")}
                    </Link>
                    <button
                      type="submit"
                      className="w-[170px] sm:w-[160px] text-sm sm:text-base p-3 sm:p-4 rounded-full border bg-primaryMainLight text-whiteHigh font-medium text-center"
                    >
                      {t("buttons.save")}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {(isLoading || updateLoading) && <RequestLoader></RequestLoader>}
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

export default UnitForm;
