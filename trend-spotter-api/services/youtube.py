import requests
from typing import Dict, List, Any, Optional
import logging
from pydantic import BaseModel, Field
from helpers.config import config

logger = logging.getLogger(__name__)
YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3"

class YoutubeSearchItemId(BaseModel):
    kind: str
    videoId: str

class YoutubeSearchItem(BaseModel):
    kind: str
    etag: str
    id: YoutubeSearchItemId

class YoutubeSearchPageInfo(BaseModel):
    totalResults: int
    resultsPerPage: int

class YoutubeSearchResults(BaseModel):
    kind: str
    etag: str
    nextPageToken: Optional[str] = None
    regionCode: Optional[str] = None
    pageInfo: YoutubeSearchPageInfo
    items: List[YoutubeSearchItem]

    def get_video_ids(self) -> List[str]:
        return [item.id.videoId for item in self.items if hasattr(item.id, "videoId")]

def search_youtube_videos(search_term: str, max_results: int = 50) -> YoutubeSearchResults:
    """
    Search for YouTube videos using the search.list endpoint.
    Returns the search results as a YoutubeSearchResults model.
    """
    try:
        url = f"{YOUTUBE_API_URL}/search"
        params = {
            'part': 'id',
            'q': search_term,
            'type': 'video',
            'maxResults': max_results,
            'key': config["YOUTUBE_API_KEY"]
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()

        return YoutubeSearchResults(**response.json())
    except requests.exceptions.RequestException as e:
        logger.error(f"Error searching YouTube videos: {e}")
        raise Exception(f"Failed to search YouTube videos: {str(e)}")

class YoutubeVideoDetails(BaseModel):
    kind: str
    etag: str
    items: List[Dict[str, Any]]

def get_youtube_video_details(video_ids: List[str]) -> YoutubeVideoDetails:
    """
    Get detailed information for YouTube videos using the videos.list endpoint.
    Returns statistics and snippet data for the provided video IDs.
    """
    try:
        url = f"{YOUTUBE_API_URL}/videos"
        params = {
            'part': 'statistics,snippet',
            'id': ','.join(video_ids),
            'key': config["YOUTUBE_API_KEY"]
        }
        
        response = requests.get(url, params=params)
        response.raise_for_status()
        return YoutubeVideoDetails(**response.json())
    except requests.exceptions.RequestException as e:
        logger.error(f"Error getting YouTube video details: {e}")
        raise Exception(f"Failed to get YouTube video details: {str(e)}")
