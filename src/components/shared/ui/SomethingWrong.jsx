import React from "react";
import { useTranslation } from "react-i18next";
import { wrong } from "../../../assets/getAssets";

function SomethingWrong() {
  const handleReloadClick = () => {
    window.location.reload();
  };
  const { t } = useTranslation();
  return (
    <section className="w-full h-full flex items-center justify-center">
      <div>
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-10">
          <div className="w-full max-w-[640px] mx-auto">
            <img src={wrong} alt="" className="w-full" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">
            {t("somethingWrong")}
          </h2>
          <button
            type="button"
            className="btn rounded-full bg-primaryMainLight hover:bg-primaryMainLight border-secondaryColor hover:border-primaryMainLight text-whiteHigh w-full max-w-max normal-case font-normal"
            onClick={handleReloadClick}
          >
            {t("reload")}
          </button>
        </div>
      </div>
    </section>
  );
}

export default SomethingWrong;
