import React, { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ChartLine = ({ title, data }) => {
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
          {/* <img src={red} alt="" /> */}
          <div className="w-4 h-4 rounded-full bg-warningColor"></div>
          <p>This Year</p>
        </div>
        {/* <div className="flex items-center justify-center gap-2">
          <img src={blue} alt="" />
          <p>Last Year</p>
        </div> */}
      </section>
      <section className="overflow-x-auto overflow-y-hidden flex items-center justify-center">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="gradientLine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFC227" />
                <stop offset="100%" stopColor="rgba(255, 194, 39, 0.29)" />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="gradientLineTwo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#234B4C" />
                <stop offset="100%" stopColor="rgba(84, 173, 170, 0.17)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}

            <Line
              type="monotone"
              dataKey="costs"
              stroke="url(#gradientLine)"
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={false}
            />
            {/* <Line
              type="monotone"
              dataKey="uv"
              stroke="url(#gradientLineTwo)"
              dot={false}
              strokeWidth={2}
            /> */}
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default ChartLine;
