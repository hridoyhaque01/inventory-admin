import i18next from "i18next";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { avatar, logo } from "../../../assets/getAssets";
import { logout } from "../../../features/auth/authSlice";
import { toggleSidebar } from "../../../features/nav/navSlice";

const TopNav = ({ isShowButton }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const currentLanguage = Cookies.get("i18next");
  const [lang, setLang] = useState(currentLanguage);
  const { t } = useTranslation();

  const handleLanguage = (e) => {
    if (e.target.checked) {
      setLang("en");
      i18next.changeLanguage("en");
    } else {
      setLang("bn");
      i18next.changeLanguage("bn");
    }
  };

  return (
    <div className="navbar bg-primaryMainDarkest px-6 py-2 relative z-[9999]">
      {/* top nav left */}
      <div className="flex-1 text-whiteHigh">
        <button
          type="button"
          className={`${isShowButton ? "" : "hidden"} lg:hidden`}
          onClick={() => dispatch(toggleSidebar())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            viewBox="0 0 24 24"
            id="menu-bar"
            className="h-8 w-8 fill-whiteHigh"
          >
            <rect width="24" height="24" fill="none"></rect>
            <path
              d="M18.2,12.7H5.8C5.3,12.7,5,12.4,5,12s0.3-0.7,0.7-0.7h12.5c0.4,0,0.7,0.3,0.7,0.7S18.7,12.7,18.2,12.7z M19,7.8
		C19,7.3,18.7,7,18.3,7H5.8C5.3,7,5,7.4,5,7.8s0.3,0.7,0.7,0.7h12.5C18.7,8.5,19,8.2,19,7.8z M19,16.2c0-0.4-0.3-0.7-0.7-0.7H5.8
		c-0.4,0-0.7,0.3-0.7,0.7C5,16.6,5.4,17,5.8,17h12.5C18.7,17,19,16.7,19,16.2z"
            ></path>
          </svg>
        </button>
        <div>
          <Link to="/">
            <img src={logo} alt="" className="w-full h-10" />
          </Link>
        </div>
      </div>
      {/* top nav right */}
      <div className="flex-none">
        <div className="inline-flex flex-row items-center gap-2 text-whiteHigh  mr-6">
          <span>BN</span>
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              className="toggle toggle-success"
              checked={lang === "en" ? true : false}
              onChange={(e) => handleLanguage(e)}
            />
          </label>
          <span>EN</span>
        </div>
        {/* user avater */}
        <div className="dropdown dropdown-end ">
          <label
            tabIndex={3}
            className="btn btn-ghost btn-circle outline-none border-none avatar"
          >
            <div className="w-10 h-10 rounded-full">
              <img
                src={user?.fileUrl || avatar}
                alt=""
                className="w-full rounded-full bg-cover bg-center object-cover"
              />
            </div>
          </label>

          <ul
            tabIndex={3}
            className="menu menu-compact dropdown-content  items-center mt-3 shadow bg-whiteHigh rounded-box w-28 z-50 divide-y divide-whiteLow "
          >
            <li className="">
              <Link to="/profile" className=" active:bg-primaryMain">
                {t("profile")}
                {/* <span className="badge">New</span> */}
              </Link>
            </li>
            <li>
              <button
                onClick={() => dispatch(logout())}
                className="active:bg-primaryMain text-errorLightColor hover:text-errorLightColor inline-flex gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M2.10352 2H8.10352C8.65352 2 9.10352 1.55 9.10352 1C9.10352 0.45 8.65352 0 8.10352 0H2.10352C1.00352 0 0.103516 0.9 0.103516 2V16C0.103516 17.1 1.00352 18 2.10352 18H8.10352C8.65352 18 9.10352 17.55 9.10352 17C9.10352 16.45 8.65352 16 8.10352 16H2.10352V2Z"
                    fill="#FD5D5D"
                  />
                  <path
                    d="M17.7535 8.65L14.9635 5.86C14.6435 5.54 14.1035 5.76 14.1035 6.21V8H7.10352C6.55352 8 6.10352 8.45 6.10352 9C6.10352 9.55 6.55352 10 7.10352 10H14.1035V11.79C14.1035 12.24 14.6435 12.46 14.9535 12.14L17.7435 9.35C17.9435 9.16 17.9435 8.84 17.7535 8.65Z"
                    fill="#FD5D5D"
                  />
                </svg>
                <span>{t("navigations.logout")}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
