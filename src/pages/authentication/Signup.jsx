import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Swiper core and required modules
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import RequestLoader from "../../components/loaders/RequestLoader";
import PasswordInput from "../../components/shared/ui/PasswordInput";
import { useRegisterMutation } from "../../features/auth/authApi";

function Signup() {
  const [register, { isLoading }] = useRegisterMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowIcon, setIsShowIcon] = useState(false);
  const [isStrong, setIsStrong] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const password = form.password.value;
    const data = {
      firstName,
      lastName,
      email,
      password,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    register(formData)
      .unwrap()
      .then((res) => {
        navigate("/login");
        form.reset();
      })
      .catch((err) => {
        errorNotify("Registration failed");
      });
  };
  return (
    <section className="h-screen w-full text-whiteHigh">
      <div className="flex items-center w-full h-full">
        <div className="w-full max-w-[630px] h-full flex items-center justify-center p-4">
          <div className="w-full max-w-[296px]">
            <div className="mb-10">
              <h2>logo</h2>
              <h2 className="text-blackSemi text-2xl font-bold">
                Welcome Back!
              </h2>
            </div>
            <form action="#" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                {/* first name  */}
                <div className="inline-flex flex-col justify-start items-start gap-4 ">
                  <span className="text-xs text-fadeColor font-medium leading-none">
                    Last Name
                  </span>
                  <input
                    type="text"
                    required
                    name="firstName"
                    placeholder="Enter firstname"
                    className="w-full py-3 px-4 border border-fadeLight outline-none rounded-lg text-black"
                  />
                </div>
                {/* last name  */}
                <div className="inline-flex flex-col justify-start items-start gap-4 ">
                  <span className="text-xs text-fadeColor font-medium leading-none">
                    Last Name
                  </span>
                  <input
                    type="text"
                    required
                    name="lastName"
                    placeholder="Enter lastname"
                    className="w-full py-3 px-4 border border-fadeLight outline-none rounded-lg text-black"
                  />
                </div>
                {/* email  */}
                <div className="inline-flex flex-col justify-start items-start gap-4 ">
                  <span className="text-xs text-fadeColor font-medium leading-none">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    name="email"
                    placeholder="Enter email"
                    className="w-full py-3 px-4 border border-fadeLight outline-none rounded-lg text-black"
                  />
                </div>
                {/* password  */}

                <div className="inline-flex flex-col justify-start items-start gap-4 ">
                  <span className="text-xs text-fadeColor font-medium leading-none">
                    Password
                  </span>
                  <div className="w-full">
                    <PasswordInput
                      isShowPassword={isShowPassword}
                      setIsShowPassword={setIsShowPassword}
                      handleInput={handleInput}
                      isShowIcon={isShowIcon}
                      name="password"
                      placeholder="Enter password"
                    ></PasswordInput>
                    {!isStrong && (
                      <p className="text-[10px] text-fadeColor mt-1">
                        must contain more than 7 character with uppercase,
                        lowercase, symble and number
                      </p>
                    )}
                  </div>
                  {/* <input
                    type="password"
                    required
                    name="password"
                    placeholder="Enter password"
                    className="w-full py-3 px-4 border border-fadeLight outline-none rounded-lg"
                  /> */}
                </div>
                {/* remember  */}
                {/* 
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="remember"
                    className="bg-whiteLow"
                    id="remember"
                  />
                  <label
                    htmlFor="remember"
                    className="text-blackLow font-medium"
                  >
                    Remeber me
                  </label>
                </div> */}

                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full p-4 rounded-full bg-primaryMainLight font-medium text-whiteHigh"
                    disabled={!isStrong}
                  >
                    SIGN UP
                  </button>
                </div>
              </div>
            </form>
            <div className="text-center mt-20 text-blackLow">
              Already have account?{" "}
              <Link to="/login" className="text-primaryMainLight">
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full h-full bg-login bg-cover bg-center object-cover flex items-end pb-24">
          <div className="w-full max-w-[490px] mx-auto">
            <Swiper
              // install Swiper modules
              modules={[Autoplay, Pagination]}
              spaceBetween={50}
              slidesPerView={1}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
            >
              <SwiperSlide>
                <div className="w-full text-center pb-20">
                  <h2 className="text-2xl font-bold">
                    Connect and manage with your team!
                  </h2>
                  <p className="mt-4">
                    Aziest Jordan is one of the biggest superstars to have
                    immerged from the professional designer in world.
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-full text-center pb-20">
                  <h2 className="text-2xl font-bold">
                    Connect and manage with your team!
                  </h2>
                  <p className="mt-4">
                    Aziest Jordan is one of the biggest superstars to have
                    immerged from the professional designer in world.
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-full text-center pb-20">
                  <h2 className="text-2xl font-bold">
                    Connect and manage with your team!
                  </h2>
                  <p className="mt-4">
                    Aziest Jordan is one of the biggest superstars to have
                    immerged from the professional designer in world.
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-full text-center pb-20">
                  <h2 className="text-2xl font-bold">
                    Connect and manage with your team!
                  </h2>
                  <p className="mt-4">
                    Aziest Jordan is one of the biggest superstars to have
                    immerged from the professional designer in world.
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-full text-center pb-20">
                  <h2 className="text-2xl font-bold">
                    Connect and manage with your team!
                  </h2>
                  <p className="mt-4">
                    Aziest Jordan is one of the biggest superstars to have
                    immerged from the professional designer in world.
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
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

export default Signup;
