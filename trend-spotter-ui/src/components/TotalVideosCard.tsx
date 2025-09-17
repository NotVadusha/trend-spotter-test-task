import { motion } from "motion/react";
import { getColorClasses } from "./chart.colors";

interface TotalVideosCardProps {
  title: string;
  value: number;
  subtitle: string;
  color: "blue" | "red";
  icon: string;
  delay?: number;
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

export const TotalVideosCard = ({
  title,
  value,
  subtitle,
  color,
  icon,
  delay = 0,
}: TotalVideosCardProps) => {
  const colorClass = getColorClasses(color);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      transition={{ delay }}
      className="bg-white rounded-lg p-6 border border-gray-200"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className={`text-3xl font-bold ${colorClass.text}`}>{value}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div
          className={`w-16 h-16 ${colorClass.background} rounded-full flex items-center justify-center`}
        >
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </motion.div>
  );
};
