import i18next from "i18next";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { avatar, logo } from "../../../assets/getAssets";
import { logout } from "../../../features/auth/authSlice";

const TopNav = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const currentLanguage = Cookies.get("i18next");
  const [lang, setLang] = useState(currentLanguage);

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
    <div className="navbar bg-primaryMainDarkest px-6 py-2">
      {/* top nav left */}
      <div className="flex-1 text-whiteHigh">
        <h1 className="text-2xl">
          <Link to="/">
            <img src={logo} alt="" className="w-10 h-10" />
          </Link>
        </h1>
      </div>
      {/* top nav right */}
      <div className="flex-none">
        <div className="inline-flex flex-row items-center gap-2 text-whiteHigh  mr-6">
          <span>BN</span>
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              className="toggle toggle-accent"
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
                Profile
                {/* <span className="badge">New</span> */}
              </Link>
            </li>
            <li>
              <button
                onClick={() => dispatch(logout())}
                className="active:bg-primaryMain text-errorLightColor hover:text-errorLightColor"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
