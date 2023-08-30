import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import { logoWhite } from "../../assets/getAssets";
import RequestLoader from "../../components/loaders/RequestLoader";
import PasswordInput from "../../components/shared/ui/PasswordInput";
import { useLoginMutation } from "../../features/auth/authApi";

function Login() {
  const { accessToken } = useSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowIcon, setIsShowIcon] = useState(false);
  const navigate = useNavigate();
  const handleInput = (event) => {
    setIsShowIcon(event.target.value.trim().length > 0);
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const data = {
      email,
      password,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    login(formData)
      .unwrap()
      .then((res) => navigate("/"))
      .catch((error) => {
        errorNotify("Invalid credentials!");
      });
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  return (
    <section className="min-h-screen md:h-screen w-full text-whiteHigh overflow-auto">
      <div className="flex items-center w-full h-full">
        <div className="w-full max-w-[630px] mx-auto h-full flex items-center justify-center py-8 px-4">
          <div className="w-full max-w-[296px]">
            <div className="mb-10">
              <div className="flex justify-center lg:justify-start mb-6">
                <img src={logoWhite} alt="" className="w-1/2 sm:w-full" />
              </div>
              <h2 className="text-blackSemi text-lg lg:text-2xl text-center lg:text-left font-bold">
                {t("welcome")}
              </h2>
            </div>
            <form action="#" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                {/* email  */}
                <div className="inline-flex flex-col justify-start items-start gap-4 ">
                  <span className="text-xs text-fadeColor font-medium leading-none">
                    {t("forms.email")}
                  </span>
                  <input
                    type="email"
                    required
                    name="email"
                    placeholder={t("placeholders.enterEmail")}
                    className="w-full py-3 px-4 border border-fadeLight outline-none rounded-lg text-black text-sm sm:text-base"
                  />
                </div>
                {/* password  */}

                <div className="inline-flex flex-col justify-start items-start gap-4 ">
                  <span className="text-xs text-fadeColor font-medium leading-none">
                    {t("forms.password")}
                  </span>
                  <PasswordInput
                    isShowPassword={isShowPassword}
                    setIsShowPassword={setIsShowPassword}
                    handleInput={handleInput}
                    isShowIcon={isShowIcon}
                    required
                    name="password"
                    placeholder={t("placeholders.enterPass")}
                  ></PasswordInput>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full p-4 rounded-full bg-primaryMainLight font-medium text-whiteHigh uppercase"
                  >
                    {t("buttons.signIn")}
                  </button>
                </div>
              </div>
            </form>

            <div className="text-center mt-4 sm:mt-6">
              <Link to="/forget-password" className="text-navyDark">
                {t("buttons.forgetPass")}?
              </Link>
            </div>
            <div className="text-center mt-10 md:mt-20 text-blackLow">
              {t("buttons.noAcc")}{" "}
              <Link to="/signup" className="text-primaryMainLight">
                {t("buttons.signUp")}.
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden w-full h-full bg-login bg-cover bg-center object-cover lg:flex items-end pb-24">
          {/* <div className="w-full max-w-[490px] mx-auto">
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
          </div> */}
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

export default Login;
