import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const PaidToOwnerModal = ({
  activeStore,
  errorNotify,
  infoNotify,
  handler,
}) => {
  const { t } = useTranslation();

  const [payment, setPayment] = useState("");
  const handlePayment = (event) => {
    const value = event.target.value;
    if (Number(value) > activeStore?.remaining || Number(value) < 0) {
      return;
    } else {
      setPayment(value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      payment: payment,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    handler({ id: activeStore?.id, data: formData })
      .unwrap()
      .then((res) => {
        infoNotify("Update payment successfull");
        setPayment("");
      })
      .catch((error) => {
        console.log(error);
        errorNotify("Update payment failed");
      });
  };

  return (
    <section>
      <input type="checkbox" id="paidToOwnerModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl flex flex-col items-center justify-center gap-4 bg-white">
          <div className="w-full max-w-[618px]">
            <div className="flex justify-center mb-6">
              <span className="inline-block rounded-full font-medium text-lg text-blackSemi">
                {t("forms.paidToOwner")}
              </span>
            </div>
            <form action="" className="w-full" onSubmit={handleSubmit}>
              <div className="w-full flex flex-col justify-start gap-6">
                {/* NEW PASSWORD  */}

                {/* Shop Name: */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("forms.remaining")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("forms.remaining")}
                    name="dueAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-fadeColor text-sm bg-whiteMid"
                    defaultValue={activeStore?.remaining}
                    readOnly
                  />
                </div>

                {/* Paid Amount : */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("forms.recivedAmount")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("forms.recivedAmount")}
                    name="paidAmount"
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm"
                    value={payment}
                    required
                    onChange={(e) => handlePayment(e)}
                  />
                </div>

                {/* submit button  */}

                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right"></span>
                  <div className="modal-action flex items-center justify-center">
                    <label
                      htmlFor="paidToOwnerModal"
                      className="btn bg-transparent hover:bg-transparent w-[140px] sm:w-[160px] rounded-full border border-errorLightColor text-errorLightColor font-medium text-center text-sm sm:text-base"
                    >
                      {t("buttons.cancel")}
                    </label>
                    {/* <button type="submit">
                      <label
                        htmlFor="paidToOwnerModal"
                        className="btn w-[140px] sm:w-[160px] text-sm sm:text-base rounded-full border bg-primaryMainLight hover:bg-primaryMainLight text-whiteHigh font-medium text-center whitespace-nowrap"
                      >
                        {t("buttons.save")}
                      </label>
                    </button> */}
                    <label
                      htmlFor="confirmationPopup"
                      className="btn w-[140px] sm:w-[160px] text-sm sm:text-base rounded-full border bg-primaryMainLight hover:bg-primaryMainLight text-whiteHigh font-medium text-center whitespace-nowrap"
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

export default PaidToOwnerModal;
