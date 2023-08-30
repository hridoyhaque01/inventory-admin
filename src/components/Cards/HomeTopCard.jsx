import React from "react";
import { useTranslation } from "react-i18next";

const HomeTopCard = ({ data }) => {
  const { t } = useTranslation();

  return (
    <section
      className={`flex  items-center gap-4 px-4 w-full py-12 xl:py-14 rounded-xl relative overflow-hidden ${data?.color}`}
    >
      <div className="p-4 bg-whiteHigh bg-opacity-30 rounded-full ">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.385 1.385C18.815 0.815 18.05 0.5 17.255 0.5H3.5C1.85 0.5 0.515 1.85 0.515 3.5L0.5 24.5C0.5 26.15 1.835 27.5 3.485 27.5H24.5C26.15 27.5 27.5 26.15 27.5 24.5V10.745C27.5 9.95 27.185 9.185 26.615 8.63L19.385 1.385ZM8 21.5C7.175 21.5 6.5 20.825 6.5 20C6.5 19.175 7.175 18.5 8 18.5C8.825 18.5 9.5 19.175 9.5 20C9.5 20.825 8.825 21.5 8 21.5ZM8 15.5C7.175 15.5 6.5 14.825 6.5 14C6.5 13.175 7.175 12.5 8 12.5C8.825 12.5 9.5 13.175 9.5 14C9.5 14.825 8.825 15.5 8 15.5ZM8 9.5C7.175 9.5 6.5 8.825 6.5 8C6.5 7.175 7.175 6.5 8 6.5C8.825 6.5 9.5 7.175 9.5 8C9.5 8.825 8.825 9.5 8 9.5ZM17 9.5V2.75L25.25 11H18.5C17.675 11 17 10.325 17 9.5Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="text-black ">
        <p>{t(data?.title)}</p>
        <p className="text-xl xl:text-2xl font-bold">{data?.number}</p>
      </div>
      <div
        className="w-24 h-36 bg-gradient-primary absolute -top-6 -right-2.5 rounded-2xl"
        style={{ transform: "matrix(0.63, 0.78, -0.65, 0.76, 0, 0)" }}
      ></div>
    </section>
  );
};

export default HomeTopCard;
