import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card, { CardHeader } from "../../components/Card";

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg px-4 py-3 min-w-[120px] border border-gray-100">
      <p className="text-xs font-medium text-gray-400 mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#9BB8AD]" />
        <span className="text-sm font-semibold text-gray-900">
          {payload[0].value} requests
        </span>
      </div>
    </div>
  );
};

export default function ServiceOverview({ daysData, loading, className = "" }) {
  const chartData = (daysData && daysData.length > 0)
    ? daysData.map((d) => ({
        name: d.day,
        value: d.requests,
      }))
    : [
        { name: "Mon", value: 0 },
        { name: "Tue", value: 0 },
        { name: "Wed", value: 0 },
        { name: "Thu", value: 0 },
        { name: "Fri", value: 0 },
        { name: "Sat", value: 0 },
        { name: "Sun", value: 0 },
      ];

  return (
    <Card className={`flex flex-col ${className}`}>
      <CardHeader
        title="Service overview"
        subtitle="Requests submitted this week"
      />
      <div className="p-4 sm:p-5 flex-1 min-h-[250px]">
        {loading ? (
          <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
            Loading service data...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F2F1" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#8A9491" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#8A9491" }}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F7F9F8" }} />
              <Bar dataKey="value" fill="#9BB8AD" radius={[6, 6, 0, 0]} maxBarSize={45} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
