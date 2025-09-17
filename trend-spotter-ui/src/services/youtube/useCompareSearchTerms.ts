import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import type { SearchAnalyticsResponse } from "../../types";
import { api } from "../api";

export const compareSearchTerms = async (
  searchTerm1: string,
  searchTerm2: string,
): Promise<SearchAnalyticsResponse> => {
  console.info("[INFO]: Performing search for", searchTerm1, searchTerm2);

  try {
    const response = await api.get("/analytics/search", {
      params: {
        search_term_1: searchTerm1,
        search_term_2: searchTerm2,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.detail || error.message;
      throw new Error(`API Error: ${message}`);
    }
    throw new Error("An unexpected error occurred");
  }
};

const QUERY_KEY = "compare-search-terms";

export const useCompareSearchTerms = (
  searchTerm1: string | null,
  searchTerm2: string | null,
  onComplete: (data: SearchAnalyticsResponse | null) => void,
) => {
  const query = useQuery({
    queryKey: [QUERY_KEY, searchTerm1, searchTerm2],
    queryFn: () =>
      searchTerm1 && searchTerm2
        ? compareSearchTerms(searchTerm1, searchTerm2)
        : null,
    enabled:
      !!searchTerm1 &&
      searchTerm1.trim().length > 0 &&
      !!searchTerm2 &&
      searchTerm2.trim().length > 0,
  });

  useEffect(() => {
    if (query.data) {
      onComplete(query.data);
    } else if (query.error) {
      onComplete(null);
    }
  }, [query.data, query.error, onComplete]);

  return query;
};
