from fastapi import APIRouter, HTTPException
from services.youtube import search_youtube_videos, get_youtube_video_details
from typing import List, Any, Dict
import logging
from pydantic import BaseModel

router = APIRouter()
logger = logging.getLogger(__name__)


class PopularityOverTime(BaseModel):
    release_date: str
    view_count: int

class Analytics(BaseModel):
    search_term: str 
    total_results: int 
    videos_analyzed: int 
    total_view_count: int
    average_view_count: float
    total_like_count: int
    average_like_count: float
    popularity_over_time: List[PopularityOverTime]


def calculate_analytics(videos_data: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Calculate analytics from video data including view counts, like counts, and release dates.
    """
    if not videos_data:
        return dict(
            total_view_count=0,
            average_view_count=0,
            total_like_count=0,
            average_like_count=0,
            popularity_over_time=[]
        )

    total_view_count = 0
    total_like_count = 0
    popularity_over_time = []

    for video in videos_data:
        statistics = video.get("statistics", {})
        snippet = video.get("snippet", {})

        view_count = int(statistics.get("viewCount", 0))
        total_view_count += view_count

        like_count = int(statistics.get("likeCount", 0))
        total_like_count += like_count

        published_at = snippet.get("publishedAt")
        if published_at:
            popularity_over_time.append(PopularityOverTime(
                release_date=published_at,
                view_count=view_count
            ))

    popularity_over_time.sort(key=lambda x: x.release_date)

    return dict(
        total_view_count=total_view_count,
        average_view_count=total_view_count / len(videos_data) if videos_data else 0,
        total_like_count=total_like_count,
        average_like_count=total_like_count / len(videos_data) if videos_data else 0,
        popularity_over_time=popularity_over_time
    )


def process_search_term(search_term: str) -> Analytics:
    """
    Process a single search term and return analytics data.
    """
    try:
        search_results = search_youtube_videos(search_term, max_results=50)

        video_ids = []
        if hasattr(search_results, "items") and search_results.items:
            video_ids = [item.id.videoId for item in search_results.items if hasattr(item.id, "videoId")]

        total_results = getattr(search_results.pageInfo, "totalResults", 0)

        videos_data = []
        if video_ids:
            video_details = get_youtube_video_details(video_ids)
            videos_data = video_details.items

        analytics_data = calculate_analytics(videos_data)

        return Analytics(
            search_term=search_term,
            total_results=total_results,
            videos_analyzed=len(videos_data),
            **analytics_data
        )

    except Exception as e:
        logger.error(f"Error processing search term '{search_term}': {e}")
        raise HTTPException(status_code=500, detail=f"Failed to process search term '{search_term}': {str(e)}")


class AnalyticsResponse(BaseModel):
    search_term_1: Analytics
    search_term_2: Analytics

@router.get("/analytics/search")
def get_search_analytics(search_term_1: str, search_term_2: str):
    """
    Get analytics for two search terms.
    Returns aggregated statistics for both search terms.
    """
    try:
        analytics_1 = process_search_term(search_term_1)
        analytics_2 = process_search_term(search_term_2)
        
        return AnalyticsResponse(
            search_term_1=analytics_1,
            search_term_2=analytics_2
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting search analytics: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to get search analytics: {str(e)}")