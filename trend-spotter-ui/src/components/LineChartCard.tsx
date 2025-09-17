import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART_COLORS } from "./chart.colors";

interface LineChartCardProps {
  title: string;
  icon: string;
  data: {
    [x: string]: string | number;
    date: string;
    release_date: string;
  }[];
  searchTerm1: string;
  searchTerm2: string;
  delay?: number;
  formatNumber: (num: number) => string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
    },
  },
};

export const LineChartCard = ({
  title,
  icon,
  data,
  searchTerm1,
  searchTerm2,
  delay = 0,
  formatNumber,
}: LineChartCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ delay }}
      className="rounded-lg p-6 border"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            icon.trim() !== "" && "bg-muted",
          )}
        >
          <span className="text-white text-lg">{icon}</span>
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tickFormatter={formatNumber} />
          <Tooltip
            formatter={(value) => [formatNumber(Number(value)), "Views"]}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={searchTerm1}
            stroke={CHART_COLORS.primary}
            strokeWidth={3}
            dot={{ fill: CHART_COLORS.primary, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: CHART_COLORS.primary, strokeWidth: 2 }}
            name={searchTerm1}
          />
          <Line
            type="monotone"
            dataKey={searchTerm2}
            stroke={CHART_COLORS.secondary}
            strokeWidth={3}
            dot={{ fill: CHART_COLORS.secondary, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: CHART_COLORS.secondary, strokeWidth: 2 }}
            name={searchTerm2}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
