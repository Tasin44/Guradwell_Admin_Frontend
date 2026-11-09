import { useState } from "react";
import { ChevronDown } from "lucide-react";
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

// Sample data sets
const weeklyData = [
  { name: "Mon", value: 8 },
  { name: "Tue", value: 11 },
  { name: "Wed", value: 7 },
  { name: "Thu", value: 15 },
  { name: "Fri", value: 13 },
  { name: "Sat", value: 19 },
  { name: "Sun", value: 12 },
];

const monthlyData = [
  { name: "Week 1", value: 42 },
  { name: "Week 2", value: 58 },
  { name: "Week 3", value: 35 },
  { name: "Week 4", value: 67 },
];

const ninetyDaysData = [
  { name: "Jan", value: 120 },
  { name: "Feb", value: 98 },
  { name: "Mar", value: 145 },
];

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

export default function ServiceOverview({ className = "" }) {
  const [range, setRange] = useState("7");

  const data =
    range === "30" ? monthlyData : range === "90" ? ninetyDaysData : weeklyData;

  const subtitle =
    range === "30"
      ? "Requests submitted this month"
      : range === "90"
      ? "Requests submitted in last 90 days"
      : "Requests submitted this week";

  return (
    <Card className={`flex flex-col ${className}`}>
      <CardHeader
        title="Service overview"
        subtitle={subtitle}
        action={
          <div className="relative">
            <select
              aria-label="Time range"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="appearance-none rounded-lg border border-[#EAEDEB] bg-white py-2 pl-3 pr-8 text-[11px] text-ink/80 outline-none"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2"
            />
          </div>
        }
      />

      <div className="w-full h-56 sm:h-64 lg:h-70 px-2 sm:px-4 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 16, right: 8, left: -10, bottom: 0 }}
            barCategoryGap="25%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              width={36}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "#f9fafb" }}
            />
            <Bar
              dataKey="value"
              fill="#9BB8AD"
              radius={[4, 4, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}