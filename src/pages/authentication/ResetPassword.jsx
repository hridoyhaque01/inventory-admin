import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logo } from "../../assets/getAssets";
import RequestLoader from "../../components/loaders/RequestLoader";
import PasswordInput from "../../components/shared/ui/PasswordInput";
import { useResetPasswordMutation } from "../../features/auth/authApi";

function ResetPassword() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowIcon, setIsShowIcon] = useState(false);
  const [isStrong, setIsStrong] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isShowConfirmIcon, setIsShowConfirmIcon] = useState(false);
  const navigate = useNavigate();
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;
    if (newPassword !== confirmPassword) {
      errorNotify("Password doesn't match");
      return;
    }
    const data = {
      email: "hridoyhaque.info@gmail.com",
      newPassword,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    resetPassword(formData)
      .unwrap()
      .then((res) => {
        if (res?.modifiedCount === 1) {
          navigate("/login");
        } else {
          errorNotify("Password update failed");
        }
      })
      .catch((error) => {
        confirmPassword.log(error);
        errorNotify("Password update failed");
      });
  };

  return (
    <section className="h-screen w-full bg-reset bg-cover bg-center object-cover flex items-center justify-center">
      <div className="w-full max-w-[760px] bg-whiteHigh px-6 py-14 relative">
        <div className="w-full max-w-[400px] mx-auto">
          <div className="text-center">
            <div className="text-center lg:text-left mb-6">
              <img src={logo} alt="" className="w-20 h-20" />
            </div>
            <h2 className="text-2xl text-blackSemi font-bold mt-2">
              Reset Password
            </h2>
          </div>

          <form action="" className="w-full mt-10" onSubmit={handleSubmit}>
            {/* NEW PASSWORD  */}

            <div className="inline-flex flex-col justify-start items-start gap-4 w-full">
              <span className="text-xs text-fadeColor font-medium leading-none">
                New Password
              </span>
              <div className="w-full">
                <PasswordInput
                  isShowPassword={isShowPassword}
                  setIsShowPassword={setIsShowPassword}
                  handleInput={handleInput}
                  isShowIcon={isShowIcon}
                  required
                  name="newPassword"
                  placeholder="Enter new password"
                ></PasswordInput>
                {!isStrong && (
                  <p className="text-[10px] text-fadeColor mt-1">
                    Must contain more than 7 character with uppercase,
                    lowercase, symble and number
                  </p>
                )}
              </div>
            </div>
            {/* CONFIRM PASSWORD  */}

            <div className="inline-flex flex-col justify-start items-start gap-4 w-full mt-6">
              <span className="text-xs text-fadeColor font-medium leading-none">
                Confirm Password
              </span>
              <div className="w-full">
                <PasswordInput
                  isShowPassword={isShowConfirmPassword}
                  setIsShowPassword={setIsShowConfirmPassword}
                  handleInput={handleInputTwo}
                  isShowIcon={isShowConfirmIcon}
                  required
                  name="confirmPassword"
                  placeholder="Enter confirm password"
                ></PasswordInput>
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full p-4 rounded-full bg-primaryMainLight font-medium text-whiteHigh"
                disabled={!isStrong}
              >
                RESET PASSWORD
              </button>
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
        />
      </div>
    </section>
  );
}

export default ResetPassword;
