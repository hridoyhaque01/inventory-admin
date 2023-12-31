import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";
import { toggleSidebar } from "../../../features/nav/navSlice";
import "./SideNav.css";

const SideNav = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState({});
  const submenuRef = useRef({});
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isShowSidebar } = useSelector((state) => state.nav);

  const handleDropdown = (menu, submenuOpen) => {
    if (!submenuOpen) {
      setIsSubmenuOpen((prev) => ({
        [menu]: !prev[menu],
      }));
    }
  };

  const handleToggle = (value) => {
    dispatch(toggleSidebar());
    handleDropdown(value);
  };

  return (
    <>
      <div
        className={`bg-primaryMainDarkest h-full flex flex-col justify-between pb-4 pt-[66px] lg:pt-0 overflow-auto shrink-0 fixed top-0 bottom-0 left-0 lg:relative ${
          isShowSidebar ? "w-64" : "w-0 lg:w-64"
        }  text-whiteHigh sidebar duration-300 shrink-0 z-[80]`}
      >
        {/* routes */}
        <section className="flex flex-col flex-1 justify-start items-start gap-4 py-4 shrink-0 whitespace-nowrap">
          {/* dashboard  */}
          <div className="w-full overflow-hidden capitalize shrink-0">
            <NavLink
              to="/"
              className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
              onClick={() => handleToggle("dashboard")}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13ZM4 21H10C10.55 21 11 20.55 11 20V16C11 15.45 10.55 15 10 15H4C3.45 15 3 15.45 3 16V20C3 20.55 3.45 21 4 21ZM14 21H20C20.55 21 21 20.55 21 20V12C21 11.45 20.55 11 20 11H14C13.45 11 13 11.45 13 12V20C13 20.55 13.45 21 14 21ZM13 4V8C13 8.55 13.45 9 14 9H20C20.55 9 21 8.55 21 8V4C21 3.45 20.55 3 20 3H14C13.45 3 13 3.45 13 4Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span className={`flex-1 shrink-0`}>
                <span>{t("navigations.dashboard")}</span>
              </span>
            </NavLink>
          </div>

          {/* stores  */}
          <div className="w-full overflow-hidden capitalize shrink-0">
            <div
              className={`flex items-center px-4  py-2 gap-2 cursor-pointer select-none`}
              onClick={() => handleDropdown("stores")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M20.16 7.8C20.07 7.34 19.66 7 19.18 7H4.82C4.34 7 3.93 7.34 3.84 7.8L3 12V13C3 13.55 3.45 14 4 14V19C4 19.55 4.45 20 5 20H13C13.55 20 14 19.55 14 19V14H18V19C18 19.55 18.45 20 19 20C19.55 20 20 19.55 20 19V14C20.55 14 21 13.55 21 13V12L20.16 7.8ZM12 18H6V14H12V18ZM5 6H19C19.55 6 20 5.55 20 5C20 4.45 19.55 4 19 4H5C4.45 4 4 4.45 4 5C4 5.55 4.45 6 5 6Z"
                  fill="white"
                />
              </svg>
              <p className={`flex-1  "hidden"} shrink-0`}>
                <span>{t("tableTitle.store")}</span>
              </p>
              <span
                className={`duration-100 ${
                  isSubmenuOpen["stores"] ? "rotate-180" : "rotate-0"
                }  "hidden"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M13.2292 7.5001L9.99584 10.7334L6.7625 7.5001C6.4375 7.1751 5.9125 7.1751 5.5875 7.5001C5.2625 7.8251 5.2625 8.3501 5.5875 8.6751L9.4125 12.5001C9.7375 12.8251 10.2625 12.8251 10.5875 12.5001L14.4125 8.6751C14.7375 8.3501 14.7375 7.8251 14.4125 7.5001C14.0875 7.18344 13.5542 7.1751 13.2292 7.5001Z"
                    fill="white"
                  />
                </svg>
              </span>
            </div>
            {/* submenu  */}

            <div
              ref={(ref) => (submenuRef.current["stores"] = ref)}
              className={`flex flex-col gap-1 duration-200`}
              style={{
                maxHeight: isSubmenuOpen["stores"]
                  ? `${submenuRef.current["stores"]?.scrollHeight}px`
                  : "0",
              }}
            >
              {/* Submenu items */}
              <NavLink
                to="/stores-settings"
                className="py-3 pl-12"
                onClick={() => dispatch(toggleSidebar())}
              >
                <p>{t("tableTitle.storeSetting")}</p>
              </NavLink>
              <NavLink
                to="/stores-financial"
                className="py-3 pl-12"
                onClick={() => dispatch(toggleSidebar())}
              >
                <p>{t("tableTitle.transactions")}</p>
              </NavLink>
            </div>
          </div>

          {/* product management  */}

          <div className="w-full overflow-hidden capitalize shrink-0">
            <div
              className={`flex items-center px-4 py-2 gap-2 cursor-pointer select-none shrink-0 `}
              onClick={() => handleDropdown("productsManagement")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
              >
                <path
                  d="M22 18.9262V8.27623C22 7.45623 21.5 6.72623 20.74 6.41623L12.74 3.21623C12.26 3.02623 11.73 3.02623 11.25 3.21623L3.25 6.41623C2.5 6.72623 2 7.46623 2 8.27623V18.9262C2 20.0262 2.9 20.9262 4 20.9262H7V11.9262H17V20.9262H20C21.1 20.9262 22 20.0262 22 18.9262ZM11 18.9262H9V20.9262H11V18.9262ZM13 15.9262H11V17.9262H13V15.9262ZM15 18.9262H13V20.9262H15V18.9262Z"
                  fill="white"
                />
              </svg>
              <p className={`flex-1  "hidden"} shrink-0`}>
                <span>{t("navigations.productManagement")}</span>
              </p>
              <span
                className={`duration-100 ${
                  isSubmenuOpen["productsManagement"]
                    ? "rotate-180"
                    : "rotate-0"
                }  "hidden"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M13.2292 7.5001L9.99584 10.7334L6.7625 7.5001C6.4375 7.1751 5.9125 7.1751 5.5875 7.5001C5.2625 7.8251 5.2625 8.3501 5.5875 8.6751L9.4125 12.5001C9.7375 12.8251 10.2625 12.8251 10.5875 12.5001L14.4125 8.6751C14.7375 8.3501 14.7375 7.8251 14.4125 7.5001C14.0875 7.18344 13.5542 7.1751 13.2292 7.5001Z"
                    fill="white"
                  />
                </svg>
              </span>
            </div>
            {/* submenu  */}

            <div
              ref={(ref) => (submenuRef.current["productsManagement"] = ref)}
              className={`flex flex-col gap-1 duration-200`}
              style={{
                maxHeight: isSubmenuOpen["productsManagement"]
                  ? `${submenuRef.current["productsManagement"]?.scrollHeight}px`
                  : "0",
              }}
            >
              {/* Submenu items */}
              <NavLink
                to="/products"
                className="py-3 pl-12"
                onClick={() => dispatch(toggleSidebar())}
              >
                <p>{t("navigations.allProducts")}</p>
              </NavLink>
              <NavLink
                to="/inventory"
                className="py-3 pl-12"
                onClick={() => dispatch(toggleSidebar())}
              >
                <p>{t("navigations.assignProducts")}</p>
              </NavLink>
            </div>
          </div>

          {/* Category  */}
          <div className="w-full overflow-hidden capitalize shrink-0">
            <NavLink
              to="/categories"
              className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
              onClick={() => handleToggle("categories")}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_974_5842)">
                    <path
                      d="M11.1491 3.39992L7.42914 9.47992C7.01914 10.1399 7.49914 10.9999 8.27914 10.9999H15.7091C16.4891 10.9999 16.9691 10.1399 16.5591 9.47992L12.8491 3.39992C12.4591 2.75992 11.5391 2.75992 11.1491 3.39992Z"
                      fill="white"
                    />
                    <path
                      d="M17.5 22C19.9853 22 22 19.9853 22 17.5C22 15.0147 19.9853 13 17.5 13C15.0147 13 13 15.0147 13 17.5C13 19.9853 15.0147 22 17.5 22Z"
                      fill="white"
                    />
                    <path
                      d="M4 21.5H10C10.55 21.5 11 21.05 11 20.5V14.5C11 13.95 10.55 13.5 10 13.5H4C3.45 13.5 3 13.95 3 14.5V20.5C3 21.05 3.45 21.5 4 21.5Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_974_5842">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>
              <span className={`flex-1 shrink-0`}>
                <span>{t("navigations.categories")}</span>
              </span>
            </NavLink>
          </div>
          {/* Unit  */}
          <div className="w-full overflow-hidden capitalize shrink-0">
            <NavLink
              to="/unit"
              className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
              onClick={() => handleToggle("unit")}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M2 22C2 20.15 2.24583 18.5708 2.7375 17.2625C3.22917 15.9542 3.85833 14.8667 4.625 14C5.39167 13.1333 6.25 12.4625 7.2 11.9875C8.15 11.5125 9.08333 11.1833 10 11V8C7.71667 7.71667 5.8125 7.0125 4.2875 5.8875C2.7625 4.7625 2 3.46667 2 2H22C22 3.46667 21.2375 4.7625 19.7125 5.8875C18.1875 7.0125 16.2833 7.71667 14 8V11C14.9167 11.1833 15.85 11.5125 16.8 11.9875C17.75 12.4625 18.6083 13.1333 19.375 14C20.1417 14.8667 20.7708 15.9542 21.2625 17.2625C21.7542 18.5708 22 20.15 22 22H16V20H19.875C19.575 17.4667 18.6292 15.6333 17.0375 14.5C15.4458 13.3667 13.7667 12.8 12 12.8C10.2333 12.8 8.55417 13.3667 6.9625 14.5C5.37083 15.6333 4.425 17.4667 4.125 20H8V22H2ZM12 6.125C13.5167 6.125 14.8667 5.92083 16.05 5.5125C17.2333 5.10417 18.175 4.6 18.875 4H5.125C5.825 4.6 6.76667 5.10417 7.95 5.5125C9.13333 5.92083 10.4833 6.125 12 6.125ZM12 22C11.45 22 10.9792 21.8042 10.5875 21.4125C10.1958 21.0208 10 20.55 10 20C10 19.7167 10.0542 19.4583 10.1625 19.225C10.2708 18.9917 10.4167 18.7833 10.6 18.6C11 18.2 11.675 17.7792 12.625 17.3375C13.575 16.8958 14.7 16.45 16 16C15.5333 17.3 15.0833 18.425 14.65 19.375C14.2167 20.325 13.8 21 13.4 21.4C13.2167 21.5833 13.0083 21.7292 12.775 21.8375C12.5417 21.9458 12.2833 22 12 22Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span className={`flex-1 shrink-0`}>
                <span>{t("placeholders.unit")}</span>
              </span>
            </NavLink>
          </div>

          {/* buy-supplies */}
          <div className="w-full overflow-hidden capitalize shrink-0">
            <NavLink
              to="/supplies"
              className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
              onClick={() => handleToggle("supplies")}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7.99609 18C6.89609 18 6.00609 18.9 6.00609 20C6.00609 21.1 6.89609 22 7.99609 22C9.09609 22 9.99609 21.1 9.99609 20C9.99609 18.9 9.09609 18 7.99609 18ZM1.99609 3C1.99609 3.55 2.44609 4 2.99609 4H3.99609L7.59609 11.59L6.24609 14.03C5.51609 15.37 6.47609 17 7.99609 17H18.9961C19.5461 17 19.9961 16.55 19.9961 16C19.9961 15.45 19.5461 15 18.9961 15H7.99609L9.09609 13H16.5461C17.2961 13 17.9561 12.59 18.2961 11.97L21.8761 5.48C22.2461 4.82 21.7661 4 21.0061 4H6.20609L5.53609 2.57C5.37609 2.22 5.01609 2 4.63609 2H2.99609C2.44609 2 1.99609 2.45 1.99609 3ZM17.9961 18C16.8961 18 16.0061 18.9 16.0061 20C16.0061 21.1 16.8961 22 17.9961 22C19.0961 22 19.9961 21.1 19.9961 20C19.9961 18.9 19.0961 18 17.9961 18Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span className={`flex-1 shrink-0`}>
                <span>{t("navigations.buySup")}</span>
              </span>
            </NavLink>
          </div>

          {/* Sell  */}
          <div className="w-full overflow-hidden capitalize shrink-0">
            <NavLink
              to="/sales"
              className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
              onClick={() => handleToggle("sales")}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21.408 11.4124L12.578 2.58244C12.208 2.21244 11.698 2.00244 11.168 2.00244H3.99805C2.89805 2.00244 1.99805 2.90244 1.99805 4.00244V11.1724C1.99805 11.7024 2.20805 12.2124 2.58805 12.5824L11.418 21.4124C12.198 22.1924 13.468 22.1924 14.248 21.4124L21.418 14.2424C22.198 13.4624 22.198 12.2024 21.408 11.4124ZM6.49805 8.00244C5.66805 8.00244 4.99805 7.33244 4.99805 6.50244C4.99805 5.67244 5.66805 5.00244 6.49805 5.00244C7.32805 5.00244 7.99805 5.67244 7.99805 6.50244C7.99805 7.33244 7.32805 8.00244 6.49805 8.00244Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span className={`flex-1 shrink-0`}>
                <span>{t("navigations.sales")}</span>
              </span>
            </NavLink>
          </div>

          {/* Expenses  */}
          <div className="w-full overflow-hidden capitalize shrink-0">
            <NavLink
              to="/expenses"
              className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
              onClick={() => handleToggle("expenses")}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.5 16V8C9.5 6.9 10.39 6 11.5 6H20.5V5C20.5 3.9 19.6 3 18.5 3H4.5C3.39 3 2.5 3.9 2.5 5V19C2.5 20.1 3.39 21 4.5 21H18.5C19.6 21 20.5 20.1 20.5 19V18H11.5C10.39 18 9.5 17.1 9.5 16ZM12.5 8C11.95 8 11.5 8.45 11.5 9V15C11.5 15.55 11.95 16 12.5 16H21.5V8H12.5ZM15.5 13.5C14.67 13.5 14 12.83 14 12C14 11.17 14.67 10.5 15.5 10.5C16.33 10.5 17 11.17 17 12C17 12.83 16.33 13.5 15.5 13.5Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span className={`flex-1 shrink-0`}>
                <span>{t("navigations.expenses")}</span>
              </span>
            </NavLink>
          </div>

          {/* Money Owed  */}
          <div className="w-full overflow-hidden capitalize shrink-0">
            <NavLink
              to="/moneyOwed"
              className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
              onClick={() => handleToggle("moneyOwed")}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12.88 17.76V18.12C12.88 18.6 12.49 19 12 19C11.52 19 11.12 18.61 11.12 18.12V17.7C10.49 17.55 9.19 17.09 8.43 15.6C8.2 15.16 8.42 14.61 8.88 14.42L8.95 14.39C9.36 14.22 9.82 14.39 10.03 14.78C10.35 15.39 10.98 16.15 12.15 16.15C13.08 16.15 14.13 15.67 14.13 14.54C14.13 13.58 13.43 13.08 11.85 12.51C10.75 12.12 8.5 11.48 8.5 9.2C8.5 9.1 8.51 6.8 11.12 6.24V5.88C11.12 5.39 11.52 5 12 5C12.48 5 12.88 5.39 12.88 5.88V6.25C13.95 6.44 14.63 7.01 15.04 7.55C15.38 7.99 15.2 8.63 14.68 8.85C14.32 9 13.9 8.88 13.66 8.57C13.38 8.19 12.88 7.8 12.06 7.8C11.36 7.8 10.25 8.17 10.25 9.19C10.25 10.14 11.11 10.5 12.89 11.09C15.29 11.92 15.9 13.14 15.9 14.54C15.9 17.17 13.4 17.67 12.88 17.76Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span className={`flex-1 shrink-0`}>
                <span>{t("navigations.owes")}</span>
              </span>
            </NavLink>
          </div>

          {/* customer  */}
          <div className="w-full overflow-hidden capitalize shrink-0">
            <NavLink
              to="/customer"
              className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
              onClick={() => handleToggle("customer")}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 3H10C10.55 3 11 3.45 11 4V10C11 10.55 10.55 11 10 11H4C3.45 11 3 10.55 3 10V4C3 3.45 3.45 3 4 3ZM14 3H20C20.55 3 21 3.45 21 4V10C21 10.55 20.55 11 20 11H14C13.45 11 13 10.55 13 10V4C13 3.45 13.45 3 14 3ZM4 13H10C10.55 13 11 13.45 11 14V20C11 20.55 10.55 21 10 21H4C3.45 21 3 20.55 3 20V14C3 13.45 3.45 13 4 13ZM17 13C16.45 13 16 13.45 16 14V16H14C13.45 16 13 16.45 13 17C13 17.55 13.45 18 14 18H16V20C16 20.55 16.45 21 17 21C17.55 21 18 20.55 18 20V18H20C20.55 18 21 17.55 21 17C21 16.45 20.55 16 20 16H18V14C18 13.45 17.55 13 17 13Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span className={`flex-1 shrink-0`}>
                <span>{t("navigations.customers")}</span>
              </span>
            </NavLink>
          </div>

          {/* suppliers */}
          <div className="w-full overflow-hidden capitalize shrink-0">
            <NavLink
              to="/suppliers"
              className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
              onClick={() => handleToggle("suppliers")}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 12.75C13.63 12.75 15.07 13.14 16.24 13.65C17.32 14.13 18 15.21 18 16.38V17C18 17.55 17.55 18 17 18H7C6.45 18 6 17.55 6 17V16.39C6 15.21 6.68 14.13 7.76 13.66C8.93 13.14 10.37 12.75 12 12.75ZM4 13C5.1 13 6 12.1 6 11C6 9.9 5.1 9 4 9C2.9 9 2 9.9 2 11C2 12.1 2.9 13 4 13ZM5.13 14.1C4.76 14.04 4.39 14 4 14C3.01 14 2.07 14.21 1.22 14.58C0.48 14.9 0 15.62 0 16.43V17C0 17.55 0.45 18 1 18H4.5V16.39C4.5 15.56 4.73 14.78 5.13 14.1ZM20 13C21.1 13 22 12.1 22 11C22 9.9 21.1 9 20 9C18.9 9 18 9.9 18 11C18 12.1 18.9 13 20 13ZM24 16.43C24 15.62 23.52 14.9 22.78 14.58C21.93 14.21 20.99 14 20 14C19.61 14 19.24 14.04 18.87 14.1C19.27 14.78 19.5 15.56 19.5 16.39V18H23C23.55 18 24 17.55 24 17V16.43ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span className={`flex-1 shrink-0`}>
                <span>{t("navigations.suppliers")}</span>
              </span>
            </NavLink>
          </div>
        </section>

        {/* logout */}
        <div className="w-full overflow-hidden capitalize shrink-0">
          <button
            className="inline-flex items-center w-full pl-5 px-4 py-2 gap-2 cursor-pointer select-none"
            onClick={() => dispatch(logout())}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M2.10352 2H8.10352C8.65352 2 9.10352 1.55 9.10352 1C9.10352 0.45 8.65352 0 8.10352 0H2.10352C1.00352 0 0.103516 0.9 0.103516 2V16C0.103516 17.1 1.00352 18 2.10352 18H8.10352C8.65352 18 9.10352 17.55 9.10352 17C9.10352 16.45 8.65352 16 8.10352 16H2.10352V2Z"
                  fill="white"
                />
                <path
                  d="M17.7535 8.65L14.9635 5.86C14.6435 5.54 14.1035 5.76 14.1035 6.21V8H7.10352C6.55352 8 6.10352 8.45 6.10352 9C6.10352 9.55 6.55352 10 7.10352 10H14.1035V11.79C14.1035 12.24 14.6435 12.46 14.9535 12.14L17.7435 9.35C17.9435 9.16 17.9435 8.84 17.7535 8.65Z"
                  fill="white"
                />
              </svg>
            </span>
            <span className={` shrink-0`}>
              <span>{t("navigations.logout")}</span>
            </span>
          </button>
        </div>
      </div>
      <div
        className={`${
          isShowSidebar ? "block" : "hidden lg:hidden"
        } lg:hidden fixed top-0 right-0 bottom-0 left-0 bg-overlay z-10`}
        onClick={() => dispatch(toggleSidebar())}
      ></div>
    </>
  );
};

export default SideNav;
