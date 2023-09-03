import React from "react";
import { useTranslation } from "react-i18next";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ChartArea = ({ title, data }) => {
  // console.log(chartData);

  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <p className="text-base smtext-lg lg:text-2xl text-blackHigh font-bold">
          {t(title)}
        </p>
        <span className="inline-block px-4 py-2 bg-primaryMainLight text-whiteHigh text-xs sm:text-sm rounded-full">
          {t("navigations.monthly")}
        </span>
      </div>
      <div className="flex items-center justify-start gap-6 mt-8 mb-10 text-xs sm:text-base">
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-full bg-primaryMainLight"></div>
          <p>{t("navigations.sales")}</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-full bg-secondaryMain"></div>
          <p>{t("navigations.revenue")}</p>
        </div>
      </div>
      <section className="overflow-x-auto overflow-y-hidden flex items-center justify-center">
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              bottom: 5,
              left: 5,
            }}
          >
            <defs>
              <linearGradient id="gradientColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#FFC227" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#F3BDB6" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#E8E8E8" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="Revenue"
              fill="url(#gradientColor)"
              stroke="#FFC227"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="Sales"
              fill="none"
              stroke="#54ADAA"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default ChartArea;
