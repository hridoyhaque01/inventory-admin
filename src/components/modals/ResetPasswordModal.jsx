import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PasswordInput from "../shared/ui/PasswordInput";

const ResetPasswordModal = ({ email, errorNotify, infoNotify, handler }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowIcon, setIsShowIcon] = useState(false);
  const [isStrong, setIsStrong] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isShowConfirmIcon, setIsShowConfirmIcon] = useState(false);
  const { t } = useTranslation();

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

  const handleInputTwo = (event) => {
    setIsShowConfirmIcon(event.target.value.trim().length > 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;
    if (newPassword !== confirmPassword) {
      errorNotify("Password does not match");
      return;
    } else {
      const formData = new FormData();
      const data = { newPassword, email };
      formData.append("data", JSON.stringify(data));
      handler(formData)
        .unwrap()
        .then((res) => {
          infoNotify("Store password update successfull");
          form.reset();
        })
        .catch((error) => {
          console.log(error);
          errorNotify("Store password update failed");
        });
    }
  };
  return (
    <section>
      <input type="checkbox" id="resetPasswordModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box max-w-2xl flex flex-col items-center justify-center gap-4 bg-white">
          <div className="w-full max-w-[618px]">
            <div className="flex justify-center mb-6">
              <span className="inline-block rounded-full  font-medium text-lg text-blackSemi">
                {t("buttons.reset")}
              </span>
            </div>
            <form action="" className="w-full" onSubmit={handleSubmit}>
              <div className="w-full flex flex-col justify-start gap-6">
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
                      name="newPassword"
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

                {/* submit button  */}

                <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4">
                  <span className="w-[170px]"></span>
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="resetPasswordModal"
                      className="btn bg-transparent hover:bg-transparent w-[110px] sm:w-[160px]  rounded-full border border-errorLightColor text-errorLightColor font-medium text-center text-sm sm:text-base"
                    >
                      {t("buttons.cancel")}
                    </label>
                    <button type="submit" disabled={!isStrong}>
                      <label
                        htmlFor="resetPasswordModal"
                        className="btn w-[110px] sm:w-[160px] text-sm sm:text-base  rounded-full border bg-primaryMainLight hover:bg-primaryMainLight text-whiteHigh font-medium text-center whitespace-nowrap"
                        disabled={!isStrong}
                      >
                        {t("buttons.save")}
                      </label>
                    </button>
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

export default ResetPasswordModal;
