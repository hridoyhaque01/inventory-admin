import React, { useState } from "react";
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
  const [activeChart, setActiveChart] = useState("weekly");
  const handleChart = (value) => {
    setActiveChart(value);
  };

  return (
    <div className="flex flex-col justify-between">
      <section className="flex items-center justify-between">
        <p className="text-2xl text-blackHigh  font-bold">{title}</p>
        {/* <div className="flex items-center gap-2">
          <button
            type="button"
            className={`py-2 px-4 rounded-full text-blackMid text-sm border ${
              activeChart === "weekly"
                ? "bg-primaryMainLight text-whiteHigh border-primaryMainLight"
                : " border-fadeHigh"
            }`}
            onClick={() => handleChart("weekly")}
          >
            Weekly
          </button>
          <button
            type="button"
            className={`py-2 px-4 rounded-full text-blackMid text-sm border ${
              activeChart === "monthly"
                ? "bg-primaryMainLight text-whiteHigh border-primaryMainLight"
                : " border-fadeHigh"
            }`}
            onClick={() => handleChart("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`py-2 px-4 rounded-full text-blackMid text-sm border ${
              activeChart === "half-yearly"
                ? "bg-primaryMainLight text-whiteHigh border-primaryMainLight"
                : " border-fadeHigh"
            }`}
            onClick={() => handleChart("half-yearly")}
          >
            Half yearly
          </button>
          <button
            type="button"
            className={`py-2 px-4 rounded-full text-blackMid text-sm border ${
              activeChart === "yearly"
                ? "bg-primaryMainLight text-whiteHigh border-primaryMainLight"
                : " border-fadeHigh"
            }`}
            onClick={() => handleChart("yearly")}
          >
            Yearly
          </button>
        </div> */}
      </section>
      <section className="flex items-center justify-start gap-6 mt-14 mb-8">
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 rounded-full bg-warningColor"></div>
          {/* <img src={red} alt="" /> */}
          <p>This Year</p>
        </div>
        {/* <div className="flex items-center justify-center gap-2">
          <img src={blue} alt="" />
          <p>Last Year</p>
        </div> */}
      </section>
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="sales"
              fill="url(#gradientColor)"
              stroke="#FFC227"
              strokeWidth={2}
            />
            {/* <Area
              type="monotone"
              dataKey="sales"
              fill="none"
              stroke="#54ADAA"
              strokeWidth={2}
            /> */}
          </ComposedChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default ChartArea;
