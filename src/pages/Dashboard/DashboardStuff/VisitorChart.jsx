import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const VisitorChart = ({ data = [] }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
      <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">
        Weekly Visitors
      </h2>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" className="opacity-20" />

            <XAxis dataKey="day" />

            <YAxis allowDecimals={false} />

            <Tooltip />

              <Area
                type="monotone"
                dataKey="views"
                stroke="#4f46e5"
                strokeWidth={4}
                fill="url(#visitorGradient)"
              />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[320px] flex items-center justify-center text-gray-500 dark:text-gray-400">
          No visitor data available
        </div>
      )}
    </div>
  );
};

export default VisitorChart;
