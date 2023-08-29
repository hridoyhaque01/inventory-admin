import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ChartBarLoan = ({ title, data }) => {
  const [activeChart, setActiveChart] = useState("weekly");
  const handleChart = (value) => {
    setActiveChart(value);
  };

  return (
    <div className="flex flex-col justify-between ">
      <section className="flex items-center justify-between">
        <p className="text-2xl text-blackHigh  font-bold">{title}</p>
      </section>
      <section className="flex items-center justify-start gap-6 mt-14 mb-8">
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-full bg-primaryMainLight"></div>
          <p>This Month</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-full bg-secondaryMain"></div>
          <p>Last Month</p>
        </div>
      </section>
      <section className="overflow-x-auto overflow-y-hidden flex items-center justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="gradientLoan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#54ADAA" />
                <stop offset="100%" stopColor="rgba(84, 173, 170, 0.40)" />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="gradientLoanTwo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FD5D5D" />
                <stop offset="100%" stopColor="rgba(253, 93, 93, 0.40)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Bar
              dataKey="pv"
              fill="url(#gradientLoanTwo)"
              radius={[24, 24, 0, 0]}
            />
            <Bar
              dataKey="uv"
              fill="url(#gradientLoan)"
              radius={[24, 24, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default ChartBarLoan;
