import React, { useState } from "react";
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
          navigate("/store");
        })
        .catch((error) => {
          errorNotify("Store register failed");
        });
    }
  };

  return (
    <section className="h-full w-full overflow-auto px-10 py-6">
      <div className="shadow-sm w-full rounded-2xl overflow-hidden">
        <div className="bg-primaryMainDarkest p-4">
          <h4 className=" text-whiteHigh text-2xl font-bold">Store</h4>
        </div>
        <div className="bg-whiteHigh w-full">
          <div className=" w-full max-w-[620px] mx-auto py-6">
            <form action="" onSubmit={handleSubmit}>
              <div className="flex flex-col justify-start gap-6">
                {/* Name: */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Name :
                  </span>
                  <input
                    type="text"
                    placeholder="Enter store name"
                    name="name"
                    required
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow "
                  />
                </div>

                {/* Product Name */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Email Address :
                  </span>
                  <input
                    type="text"
                    placeholder="Enter email address"
                    name="email"
                    required
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow "
                  />
                </div>

                {/* Product Name */}
                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Address :
                  </span>
                  <input
                    type="text"
                    placeholder="Enter store address"
                    name="location"
                    required
                    className="w-full py-3 px-4 border border-whiteLow outline-none rounded text-blackLow "
                  />
                </div>

                {/* NEW PASSWORD  */}

                <div className="">
                  <div className="flex items-center gap-3">
                    <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                      Password :
                    </span>
                    <PasswordInput
                      isShowPassword={isShowPassword}
                      setIsShowPassword={setIsShowPassword}
                      handleInput={handleInput}
                      isShowIcon={isShowIcon}
                      name="password"
                      required
                      placeholder="Enter password"
                    ></PasswordInput>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right"></span>
                    {!isStrong && (
                      <p className="text-[10px] text-fadeColor mt-1">
                        Must contain more than 7 character with uppercase,
                        lowercase, symble and number
                      </p>
                    )}
                  </div>
                </div>
                {/* confirm PASSWORD  */}

                <div className="flex items-center gap-3">
                  <span className="inline-block w-[140px] shrink-0 whitespace-nowrap text-right">
                    Confirm Password :
                  </span>
                  <div className="w-full">
                    <PasswordInput
                      isShowPassword={isShowConfirmPassword}
                      setIsShowPassword={setIsShowConfirmPassword}
                      handleInput={handleInputTwo}
                      isShowIcon={isShowConfirmIcon}
                      name="confirmPassword"
                      required
                      placeholder="Enter confirm password"
                    ></PasswordInput>
                  </div>
                </div>

                {/* edit button */}
                <div className="flex items-center gap-3 mt-4">
                  <span className="w-[140px]"></span>
                  <div className="flex items-center gap-3">
                    <Link
                      to="/store"
                      className="btn h-auto w-[160px] px-4 py-5 bg-transparent hover:bg-transparent hover:border-errorLightColor rounded-full border border-errorLightColor text-errorLightColor font-medium text-center"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      className="btn h-auto w-[160px] px-4 py-5 rounded-full bg-primaryMainLight hover:bg-primaryMainLight font-medium text-whiteHigh text-center"
                      disabled={!isStrong}
                    >
                      Save
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
