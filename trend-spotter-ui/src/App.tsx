import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { AnalyticsVisualization } from "./components/AnalyticsVisualization";
import { SearchTermsForm } from "./components/SearchTermsForm";
import { YoutubeIcon } from "./icons/YoutubeIcon";
import type { SearchAnalyticsResponse } from "./types";

export const App = () => {
  const [dataToDisplay, setDataToDisplay] =
    useState<SearchAnalyticsResponse | null>(null);

  return (
    <div className="flex flex-col max-w-7xl mx-auto py-32 px-4">
      <div>
        <h1 className="text-4xl font-bold flex items-center gap-2">
          Trend Spotter <YoutubeIcon className="size-14" />
        </h1>
        <p className="text-muted-foreground mb-8">
          Enter two search terms to compare the popularity of two search terms
          on YouTube.
        </p>
      </div>

      <SearchTermsForm onDataChange={(data) => setDataToDisplay(data)} />

      <AnimatePresence mode="wait">
        {dataToDisplay && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="mt-12"
          >
            <AnalyticsVisualization {...dataToDisplay} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
