export interface PopularityOverTime {
  release_date: string;
  view_count: number;
}

export interface SearchTermAnalytics {
  search_term: string;
  total_results: number;
  videos_analyzed: number;
  total_view_count: number;
  average_view_count: number;
  total_like_count: number;
  average_like_count: number;
  popularity_over_time: PopularityOverTime[];
}

export interface SearchAnalyticsResponse {
  search_term_1: SearchTermAnalytics;
  search_term_2: SearchTermAnalytics;
}

export interface ChartDataPoint {
  x: string;
  y: number;
}

