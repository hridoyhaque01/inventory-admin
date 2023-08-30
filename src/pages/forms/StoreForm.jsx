import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestLoader from "../../components/loaders/RequestLoader";
import PasswordInput from "../../components/shared/ui/PasswordInput";
import { useRegisterStoreMutation } from "../../features/store/storeApi";

function StoreForm() {
  const [registerStore, { isLoading }] = useRegisterStoreMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowIcon, setIsShowIcon] = useState(false);
  const [isStrong, setIsStrong] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isShowConfirmIcon, setIsShowConfirmIcon] = useState(false);
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

  const handleInputTwo = (event) => {
    setIsShowConfirmIcon(event.target.value.trim().length > 0);
  };

  const handleInput = (event) => {
    setIsShowIcon(event.target.value.trim().length > 0);
    const password = event.target.value;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasLength = password.length >= 8;
    const hasSpecialSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasLength &&
      hasSpecialSymbol
    ) {
      setIsStrong(true);
    } else {
      setIsStrong(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const location = form.location.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      errorNotify("Password does not match");
      return;
    } else {
      const formData = new FormData();
      const data = {
        name,
        email,
        location,
        password,
      };
      formData.append("data", JSON.stringify(data));
      registerStore(formData)
        .unwrap()
        .then((res) => {
          form.reset();
          navigate("/stores-settings");
        })
        .catch((error) => {
          errorNotify("Store register failed");
        });
    }
  };

  return (
    <section className="h-full w-full overflow-auto px-4 md:px-6 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-2xl font-bold">
            {t("tableTitle.store")}
          </h4>
        </div>
        <div className="bg-whiteHigh w-full px-4">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-start gap-6">
                {/* Name: */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[170px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("forms.name")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("placeholders.storeName")}
                    name="name"
                    required
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm sm:text-base"
                  />
                </div>

                {/* Product Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[170px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("forms.email")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("placeholders.enterEmail")}
                    name="email"
                    required
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm sm:text-base "
                  />
                </div>

                {/* Product Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[170px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("tables.address")} :
                  </span>
                  <input
                    type="text"
                    placeholder={t("placeholders.storeAddress")}
                    name="location"
                    required
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow text-sm sm:text-base "
                  />
                </div>

                {/* NEW PASSWORD  */}

                <div className="">
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <span className="inline-block w-[170px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                      {t("forms.newPassword")} :
                    </span>
                    <PasswordInput
                      isShowPassword={isShowPassword}
                      setIsShowPassword={setIsShowPassword}
                      handleInput={handleInput}
                      isShowIcon={isShowIcon}
                      name="password"
                      required
                      placeholder={t("placeholders.enterNewPass")}
                    ></PasswordInput>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <span className="inline-block w-[170px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right"></span>
                    {!isStrong && (
                      <p className="text-[10px] text-fadeColor md:mt-1">
                        {t("forms.restriction")}
                      </p>
                    )}
                  </div>
                </div>
                {/* confirm PASSWORD  */}

                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <span className="inline-block w-[170px] shrink-0 whitespace-nowrap text-sm sm:text-base text-left md:text-right">
                    {t("forms.confirmPassword")} :
                  </span>
                  <div className="w-full">
                    <PasswordInput
                      isShowPassword={isShowConfirmPassword}
                      setIsShowPassword={setIsShowConfirmPassword}
                      handleInput={handleInputTwo}
                      isShowIcon={isShowConfirmIcon}
                      name="confirmPassword"
                      required
                      placeholder={t("placeholders.enterConfirmPass")}
                    ></PasswordInput>
                  </div>
                </div>

                {/* edit button */}
                <div className="flex flex-col md:flex-row md:items-center gap-3 mt-2">
                  <span className="w-[170px]"></span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/stores-settings"
                      className="w-[170px] sm:w-[160px] p-3 sm:p-4 rounded-full border border-errorLightColor text-errorLightColor font-medium text-center text-sm sm:text-base"
                    >
                      {t("buttons.cancel")}
                    </Link>
                    <button
                      type="submit"
                      className="w-[170px] sm:w-[160px] text-sm sm:text-base p-3 sm:p-4 rounded-full border bg-primaryMainLight text-whiteHigh font-medium text-center"
                      disabled={!isStrong}
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

export default StoreForm;
