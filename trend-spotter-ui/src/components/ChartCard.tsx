import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART_COLORS } from "./chart.colors";

interface ChartCardProps {
  title: string;
  icon: string;
  searchTerm1: string;
  searchTerm2: string;
  value1: number;
  value2: number;
  metric: string;
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

export const ChartCard = ({
  title,
  icon,
  searchTerm1,
  searchTerm2,
  value1,
  value2,
  metric,
  delay = 0,
  formatNumber,
}: ChartCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ delay }}
      className="bg-white rounded-lg  p-6 border border-gray-200"
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

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={[
            {
              metric,
              [searchTerm1]: value1,
              [searchTerm2]: value2,
            },
          ]}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metric" />
          <YAxis tickFormatter={formatNumber} />
          <Tooltip formatter={(value) => formatNumber(Number(value))} />
          <Legend />
          <Bar
            dataKey={searchTerm1}
            fill={CHART_COLORS.primary}
            name={searchTerm1}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey={searchTerm2}
            fill={CHART_COLORS.secondary}
            name={searchTerm2}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
