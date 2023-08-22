import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";
import "./SideNav.css";

const SideNav = () => {
  const dispatch = useDispatch();
  return (
    <div
      className={`w-52 bg-primaryMainDarkest flex flex-col gap-1 h-full sideNav pb-24 overflow-auto text-whiteHigh shrink-0`}
    >
      {/* routes */}
      <section className="flex flex-col flex-1 justify-start items-start gap-4 py-4">
        {/* dashboard  */}
        <div className="w-full overflow-hidden capitalize">
          <NavLink
            to="/"
            className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
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
              <span>dashboard</span>
            </span>
          </NavLink>
        </div>

        {/* Products  */}
        <div className="w-full overflow-hidden capitalize">
          <NavLink
            to="/products"
            className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
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
                  d="M22 18.9262V8.27623C22 7.45623 21.5 6.72623 20.74 6.41623L12.74 3.21623C12.26 3.02623 11.73 3.02623 11.25 3.21623L3.25 6.41623C2.5 6.72623 2 7.46623 2 8.27623V18.9262C2 20.0262 2.9 20.9262 4 20.9262H7V11.9262H17V20.9262H20C21.1 20.9262 22 20.0262 22 18.9262ZM11 18.9262H9V20.9262H11V18.9262ZM13 15.9262H11V17.9262H13V15.9262ZM15 18.9262H13V20.9262H15V18.9262Z"
                  fill="white"
                />
              </svg>
            </span>
            <span className={`flex-1 shrink-0`}>
              <span>Products</span>
            </span>
          </NavLink>
        </div>
        {/* Inventory  */}
        <div className="w-full overflow-hidden capitalize">
          <NavLink
            to="/inventory"
            className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
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
                  d="M4.47266 6H6.47266V7C6.47266 8.1 7.37266 9 8.47266 9H14.4727C15.5727 9 16.4727 8.1 16.4727 7V6H18.4727V11H20.4727V6C20.4727 4.9 19.5727 4 18.4727 4H14.2927C13.8727 2.84 12.7727 2 11.4727 2C10.1727 2 9.07266 2.84 8.65266 4H4.47266C3.37266 4 2.47266 4.9 2.47266 6V20C2.47266 21.1 3.37266 22 4.47266 22H10.4727V20H4.47266V6ZM11.4727 4C12.0227 4 12.4727 4.45 12.4727 5C12.4727 5.55 12.0227 6 11.4727 6C10.9227 6 10.4727 5.55 10.4727 5C10.4727 4.45 10.9227 4 11.4727 4Z"
                  fill="white"
                />
                <path
                  d="M21.2227 13.25C20.8127 12.84 20.1327 12.84 19.7227 13.25L14.9827 18L12.7227 15.75C12.3127 15.34 11.6427 15.34 11.2227 15.75C10.8127 16.16 10.8127 16.84 11.2227 17.25L14.2727 20.29C14.6627 20.68 15.2927 20.68 15.6827 20.29L21.2127 14.75C21.6327 14.34 21.6327 13.66 21.2227 13.25Z"
                  fill="white"
                />
              </svg>
            </span>
            <span className={`flex-1 shrink-0`}>
              <span>Inventory</span>
            </span>
          </NavLink>
        </div>

        {/* Sell  */}
        <div className="w-full overflow-hidden capitalize">
          <NavLink
            to="/sales"
            className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
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
              <span>Sales</span>
            </span>
          </NavLink>
        </div>

        {/* customer  */}
        <div className="w-full overflow-hidden capitalize">
          <NavLink
            to="/customer"
            className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
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
              <span>Customer</span>
            </span>
          </NavLink>
        </div>

        {/* Expenses  */}
        <div className="w-full overflow-hidden capitalize">
          <NavLink
            to="/expenses"
            className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
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
              <span>My Expenses</span>
            </span>
          </NavLink>
        </div>

        {/* Money Owed  */}
        <div className="w-full overflow-hidden capitalize">
          <NavLink
            to="/moneyOwed"
            className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
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
              <span>Money Owed</span>
            </span>
          </NavLink>
        </div>

        {/* suppliers */}
        <div className="w-full overflow-hidden capitalize">
          <NavLink
            to="/suppliers"
            className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
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
              <span>Suppliers</span>
            </span>
          </NavLink>
        </div>

        {/* buy-supplies */}
        <div className="w-full overflow-hidden capitalize">
          <NavLink
            to="/buy-supplies"
            className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
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
              <span>Buy Supplies</span>
            </span>
          </NavLink>
        </div>

        {/* Store */}
        <div className="w-full overflow-hidden capitalize">
          <NavLink
            to="/store"
            className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
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
                  d="M20.16 7.8C20.07 7.34 19.66 7 19.18 7H4.82C4.34 7 3.93 7.34 3.84 7.8L3 12V13C3 13.55 3.45 14 4 14V19C4 19.55 4.45 20 5 20H13C13.55 20 14 19.55 14 19V14H18V19C18 19.55 18.45 20 19 20C19.55 20 20 19.55 20 19V14C20.55 14 21 13.55 21 13V12L20.16 7.8ZM12 18H6V14H12V18ZM5 6H19C19.55 6 20 5.55 20 5C20 4.45 19.55 4 19 4H5C4.45 4 4 4.45 4 5C4 5.55 4.45 6 5 6Z"
                  fill="white"
                />
              </svg>
            </span>
            <span className={`flex-1 shrink-0`}>
              <span>Store</span>
            </span>
          </NavLink>
        </div>

        {/* logout */}
        <div className="w-full overflow-hidden capitalize">
          <button
            className="flex items-center px-4 py-2 gap-2 cursor-pointer select-none"
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
                  d="M12.5417 11.832L15.375 8.9987M15.375 8.9987L12.5417 6.16536M15.375 8.9987L5.45833 8.9987M9.70833 11.832V12.5404C9.70833 13.714 8.75694 14.6654 7.58333 14.6654H4.75C3.5764 14.6654 2.625 13.714 2.625 12.5404V5.45703C2.625 4.28343 3.5764 3.33203 4.75 3.33203H7.58333C8.75694 3.33203 9.70833 4.28343 9.70833 5.45703V6.16536"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className={`flex-1 shrink-0`}>
              <span>Logout</span>
            </span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default SideNav;
