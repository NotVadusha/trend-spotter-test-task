import { useCompareSearchTerms } from "@/services/youtube/useCompareSearchTerms";
import type { SearchAnalyticsResponse } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  RippleButton,
  RippleButtonRipples,
} from "./animate-ui/components/buttons/ripple";
import { AnimateIcon } from "./animate-ui/icons/icon";
import { LoaderCircle } from "./animate-ui/icons/loader-circle";
import { Input } from "./ui/input";

interface SearchTermsFormProps {
  onDataChange: (data: SearchAnalyticsResponse | null) => void;
}

export const SearchTermsForm = ({ onDataChange }: SearchTermsFormProps) => {
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");

  const [confirmedSearches, setConfirmedSearches] = useState<
    [string, string] | [null, null]
  >([null, null]);

  const { data, isLoading } = useCompareSearchTerms(
    confirmedSearches?.[0],
    confirmedSearches?.[1],
    onDataChange,
  );

  const hasSearchTermsChanged = () => {
    if (!confirmedSearches[0] || !confirmedSearches[1]) {
      return true;
    }

    const currentTerm1 = searchTerm1.trim();
    const currentTerm2 = searchTerm2.trim();

    return (
      currentTerm1 !== confirmedSearches[0] ||
      currentTerm2 !== confirmedSearches[1]
    );
  };

  const isSubmitDisabled = () => {
    const hasValidInput =
      searchTerm1.trim().length > 0 && searchTerm2.trim().length > 0;
    const hasChanged = hasSearchTermsChanged();

    return !hasValidInput || (!hasChanged && !!data);
  };

  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Input
          value={searchTerm1}
          onChange={(e) => setSearchTerm1(e.target.value)}
          placeholder="Search Term 1"
        />
        <Input
          value={searchTerm2}
          onChange={(e) => setSearchTerm2(e.target.value)}
          placeholder="Search Term 2"
        />
      </div>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <AnimateIcon animateOnView loop>
              <LoaderCircle className="size-12" />
            </AnimateIcon>
          </motion.div>
        ) : (
          <motion.div
            key="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <RippleButton
              variant="default"
              type="submit"
              disabled={isSubmitDisabled()}
              onClick={(e) => {
                // With form we need to prevent the default behavior
                // So that the page won't be refreshed
                e.preventDefault();
                e.stopPropagation();

                if (
                  searchTerm1.trim().length > 0 &&
                  searchTerm2.trim().length > 0 &&
                  hasSearchTermsChanged()
                ) {
                  setConfirmedSearches([
                    searchTerm1.trim(),
                    searchTerm2.trim(),
                  ]);
                }
              }}
            >
              {
                // I don't like this construction, but in JS it's the best way to do it
                !hasSearchTermsChanged() && data
                  ? "No changes to search"
                  : data
                  ? "Try again"
                  : "Compare"
              }

              <RippleButtonRipples />
            </RippleButton>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};
