import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logo } from "../../assets/getAssets";
import RequestLoader from "../../components/loaders/RequestLoader";
import { useSendResetPasswordEmailMutation } from "../../features/auth/authApi";
function ForgetPassword() {
  const [sendResetPasswordEmail, { isLoading }] =
    useSendResetPasswordEmailMutation();

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
    <section className="h-screen w-full bg-reset bg-cover bg-center object-cover flex items-center justify-center">
      <div className="w-full max-w-[760px] bg-whiteHigh px-6 py-14 relative">
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
        <div className="w-full max-w-[400px] mx-auto">
          <div className="text-center">
            <div className="text-center lg:text-left mb-6">
              <img src={logo} alt="" className="w-20 h-20" />
            </div>
            <h2 className="text-2xl text-blackSemi font-bold mt-2">
              Reset Password
            </h2>
            <p className="text-fadeColor mt-10">
              Enter your username, or the email address you used to register. We
              will send you an email containing your username and a link to
              reset your password.
            </p>
          </div>

          <form action="" className="w-full mt-10" onSubmit={handleSubmit}>
            {/* email  */}

            <div className="w-full inline-flex  flex-col justify-start items-start gap-4 ">
              <span className="text-xs text-fadeColor font-medium leading-none">
                Your Email
              </span>
              <input
                type="email"
                required
                name="email"
                placeholder="Enter email"
                className="w-full py-3 px-4 border border-fadeLight outline-none rounded-lg"
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full p-4 rounded-full bg-primaryMainLight font-medium text-whiteHigh"
              >
                SEND
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
