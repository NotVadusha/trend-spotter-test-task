import type { SearchAnalyticsResponse } from "@/types";
import { motion } from "motion/react";
import { ChartCard } from "./ChartCard";
import { LineChartCard } from "./LineChartCard";
import { TotalVideosCard } from "./TotalVideosCard";

interface AnalyticsVisualizationProps {
  search_term_1: SearchAnalyticsResponse["search_term_1"];
  search_term_2: SearchAnalyticsResponse["search_term_2"];
}

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const AnalyticsVisualization = ({
  search_term_1,
  search_term_2,
}: AnalyticsVisualizationProps) => {
  const allDates = new Set([
    ...search_term_1.popularity_over_time.map((item) => item.release_date),
    ...search_term_2.popularity_over_time.map((item) => item.release_date),
  ]);

  const timeData = Array.from(allDates)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map((date) => {
      const term1Data = search_term_1.popularity_over_time.find(
        (item) => item.release_date === date,
      );
      const term2Data = search_term_2.popularity_over_time.find(
        (item) => item.release_date === date,
      );

      return {
        date: formatDate(date),
        [search_term_1.search_term]: term1Data ? term1Data.view_count : 0,
        [search_term_2.search_term]: term2Data ? term2Data.view_count : 0,
        release_date: date,
      };
    });

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Analytics Comparison</h2>
        <p className="text-gray-600">
          Comparing{" "}
          <span className="font-semibold text-blue-600">
            {search_term_1.search_term}
          </span>{" "}
          vs{" "}
          <span className="font-semibold text-red-600">
            {search_term_2.search_term}
          </span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TotalVideosCard
          title="Total Videos"
          value={search_term_1.total_results}
          subtitle={search_term_1.search_term}
          color="blue"
          icon="📹"
        />

        <TotalVideosCard
          title="Total Videos"
          value={search_term_2.total_results}
          subtitle={search_term_2.search_term}
          color="red"
          icon="📹"
          delay={0.1}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Total Views"
          icon="👀"
          searchTerm1={search_term_1.search_term}
          searchTerm2={search_term_2.search_term}
          value1={search_term_1.total_view_count}
          value2={search_term_2.total_view_count}
          metric="Total Views"
          delay={0.1}
          formatNumber={formatNumber}
        />

        <ChartCard
          title="Average Views"
          icon=""
          searchTerm1={search_term_1.search_term}
          searchTerm2={search_term_2.search_term}
          value1={search_term_1.average_view_count}
          value2={search_term_2.average_view_count}
          metric="Average Views"
          delay={0.2}
          formatNumber={formatNumber}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Total Likes"
          icon="👍"
          searchTerm1={search_term_1.search_term}
          searchTerm2={search_term_2.search_term}
          value1={search_term_1.total_like_count}
          value2={search_term_2.total_like_count}
          metric="Total Likes"
          delay={0.3}
          formatNumber={formatNumber}
        />

        <ChartCard
          title="Average Likes"
          icon=""
          searchTerm1={search_term_1.search_term}
          searchTerm2={search_term_2.search_term}
          value1={search_term_1.average_like_count}
          value2={search_term_2.average_like_count}
          metric="Average Likes"
          delay={0.4}
          formatNumber={formatNumber}
        />
      </div>

      <LineChartCard
        title="Popularity Over Time"
        icon="📈"
        data={timeData}
        searchTerm1={search_term_1.search_term}
        searchTerm2={search_term_2.search_term}
        delay={0.5}
        formatNumber={formatNumber}
      />
    </div>
  );
};
