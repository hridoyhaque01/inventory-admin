import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoWhite } from "../../assets/getAssets";
import RequestLoader from "../../components/loaders/RequestLoader";
import { useSendResetPasswordEmailMutation } from "../../features/auth/authApi";
function ForgetPassword() {
  const [sendResetPasswordEmail, { isLoading }] =
    useSendResetPasswordEmailMutation();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const formData = new FormData();
    const data = {
      email,
    };
    formData.append("data", JSON.stringify(data));
    sendResetPasswordEmail(formData)
      .unwrap()
      .then((res) => {
        infoNotify("Request send successfully");
      })
      .catch((error) => {
        console.log(error);
        errorNotify("Request send failed");
      });
  };
  return (
    <section className="h-screen w-full bg-transparent md:bg-reset bg-cover bg-center object-cover flex items-center justify-center overflow-auto">
      <div className="w-full max-w-[760px] h-full md:h-auto bg-whiteHigh px-4 py-8 relative overflow-auto">
        <div className="absolute top-6 left-6">
          <Link to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M11.9993 25.3332L13.8793 23.4532L7.77268 17.3332H29.3327V14.6665H7.77268L13.8927 8.5465L11.9993 6.6665L2.66602 15.9998L11.9993 25.3332Z"
                fill="#424242"
              />
            </svg>
          </Link>
        </div>
        <div className="w-full max-w-[400px] mx-auto mt-8 md:mt-0">
          <div className="text-center">
            <div className="text-center lg:text-left mb-6">
              <img src={logoWhite} alt="" className="w-1/2 mx-auto" />
            </div>
            <h2 className="text-blackSemi text-lg lg:text-2xl text-center  font-bold">
              {t("buttons.reset")}
            </h2>
            <p className="text-fadeColor text-sm md:text-base mt-4 md:mt-6 lg:mt-10">
              {t("resetDesc")}
            </p>
          </div>

          <form action="" className="w-full mt-10" onSubmit={handleSubmit}>
            {/* email  */}

            <div className="w-full inline-flex  flex-col justify-start items-start gap-4 ">
              <span className="text-xs text-fadeColor font-medium leading-none">
                {t("forms.email")}
              </span>
              <input
                type="email"
                required
                name="email"
                placeholder={t("placeholders.enterEmail")}
                className="w-full py-3 px-4 border border-fadeLight outline-none rounded-lg"
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full p-4 rounded-full bg-primaryMainLight font-medium text-whiteHigh uppercase"
              >
                {t("buttons.send")}
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

export default ForgetPassword;
