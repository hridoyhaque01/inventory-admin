import React from "react";
import { useTranslation } from "react-i18next";
import { noData } from "../../../assets/getAssets";

function NoData() {
  const { t } = useTranslation();
  return (
    <div className="w-full py-10 h-full flex items-center justify-center">
      <div>
        <div className="mb-6">
          <img src={noData} alt="" className="w-48" />
        </div>
        <h2 className="text-center text-lg">{t("noData")}</h2>
      </div>
    </div>
  );
}

export default NoData;
