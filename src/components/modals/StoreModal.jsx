import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const StoreModal = ({ errorNotify, infoNotify, handler, activeStore }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const data = {
      name,
      email,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    handler({ data: formData, id: activeStore?._id })
      .unwrap()
      .then((res) => {
        infoNotify("Update store successfull");

        const store = { ...activeStore, name, email };

        navigate("/store-details", {
          state: {
            payload: store,
          },
        });
      })
      .catch((error) => {
        errorNotify("Update store failed");
      });
  };
  return (
    <section>
      <input type="checkbox" id="storeModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box  max-w-2xl flex flex-col items-center justify-center gap-4 bg-white">
          <div className="w-full max-w-[618px]">
            <div className="flex justify-center mb-6">
              <span className="inline-block rounded-full  font-medium text-lg text-blackSemi">
                {t("forms.updateStore")}
              </span>
            </div>
            <form action="" className="w-full" onSubmit={handleSubmit}>
              <div className="w-full flex flex-col justify-start gap-6">
                {/* Store Name  */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[60px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("forms.name")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("placeholders.storeName")}
                    name="name"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm"
                    defaultValue={activeStore?.name}
                  />
                </div>

                {/* Store Name  */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[60px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("forms.email")} :
                  </span>
                  <input
                    type="email"
                    placeholder={t("placeholders.enterEmail")}
                    name="email"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm"
                    defaultValue={activeStore?.email}
                  />
                </div>

                {/* submit button  */}

                <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4">
                  <span className="w-[60px]"></span>
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="storeModal"
                      className="btn bg-transparent hover:bg-transparent w-[110px] sm:w-[160px]  rounded-full border border-errorLightColor text-errorLightColor font-medium text-center text-sm sm:text-base"
                    >
                      {t("buttons.cancel")}
                    </label>
                    {/* <button type="submit">
                      <label
                        htmlFor="storeModal"
                        className="btn w-[110px] sm:w-[160px] text-sm sm:text-base  rounded-full border bg-primaryMainLight hover:bg-primaryMainLight text-whiteHigh font-medium text-center whitespace-nowrap"
                      >
                        {t("buttons.save")}
                      </label>
                    </button> */}
                    <label
                      htmlFor="confirmationPopup"
                      className="btn w-[110px] sm:w-[160px] text-sm sm:text-base  rounded-full border bg-primaryMainLight hover:bg-primaryMainLight text-whiteHigh font-medium text-center whitespace-nowrap"
                    >
                      {t("buttons.save")}
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreModal;
