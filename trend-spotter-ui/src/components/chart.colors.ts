export const CHART_COLORS = {
  primary: "#3B82F6",
  secondary: "#EF4444",

  blue: {
    hex: "#3B82F6",
    text: "text-blue-600",
    background: "bg-blue-100",
  },
  red: {
    hex: "#EF4444",
    text: "text-red-600",
    background: "bg-red-100",
  },
} as const;

export const getChartColor = (
  type: "primary" | "secondary" | "blue" | "red",
) => {
  if (type === "primary" || type === "blue") {
    return CHART_COLORS.primary;
  }
  if (type === "secondary" || type === "red") {
    return CHART_COLORS.secondary;
  }
  return CHART_COLORS.primary;
};

export const getColorClasses = (color: "blue" | "red") => {
  return CHART_COLORS[color];
};
