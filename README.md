# YouTube Trend Spotter

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116.1-green.svg)](https://fastapi.tiangolo.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org)

## Description

**YouTube Trend Spotter** is a full-stack application that enables users to compare YouTube search trends and analyze video popularity over time. Built with modern web technologies, it provides real-time insights into how different search terms perform on YouTube through interactive visualizations and detailed analytics.

### Key Features

- **🔍 Search Comparison**: Compare two YouTube search terms side by side with comprehensive metrics
- **📊 Interactive Analytics**: View total and average views/likes for each search term with visual comparisons
- **📈 Time-based Visualization**: Interactive line charts showing video popularity trends over time
- **⚡ Real-time Data**: Fetches live data from the [YouTube Data API v3](https://developers.google.com/youtube/v3)
- **🎨 Modern UI**: Clean, responsive interface with smooth animations and modern design
- **📱 Mobile Responsive**: Optimized for all device sizes and screen resolutions

## Installation

### Prerequisites

- **Python 3.8+** - [Download Python](https://python.org/downloads/)
- **Node.js 18+** - [Download Node.js](https://nodejs.org/)
- **pnpm** (recommended) or npm - [Install pnpm](https://pnpm.io/installation)
- **YouTube Data API Key** - [Get API Key](https://developers.google.com/youtube/v3/getting-started)

### Requirements

#### Backend Dependencies
- FastAPI 0.116.1
- Python-dotenv 1.1.1
- Requests 2.32.5
- Pydantic 2.11.9
- Uvicorn 0.35.0

#### Frontend Dependencies
- React 19.1.1
- TypeScript 5.8.3
- Chart.js 4.5.0
- Tailwind CSS 4.1.13
- Motion (Framer Motion) 12.23.13

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/NotVadusha/trend-spotter-test-task
   cd opal-data-test-task
   ```

2. **Navigate to the backend directory**:
   ```bash
   cd trend-spotter-api
   ```

3. **Create and activate a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables**:
   Create a `.env` file in the `trend-spotter-api` directory:
   ```env
   YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

6. **Start the backend server**:
   ```bash
   fastapi dev main.py
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd trend-spotter-ui
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Create .env file with following content**:
   ```bash
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. **Start the development server**:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## Usage

### Basic Usage

1. **Open the application** in your browser at `http://localhost:5173`
2. **Enter two search terms** you want to compare (e.g., "python tutorial" and "machine learning")
3. **Click "Compare Trends"** to analyze the data
4. **View the results** including:
   - Total number of videos for each search term
   - Average view and like counts
   - Interactive popularity over time chart
   - Visual comparison with winner highlighting

### Example Search Terms

Try comparing these popular search terms:
- "python tutorial" vs "javascript tutorial"
- "machine learning" vs "artificial intelligence"
- "cooking recipes" vs "baking tips"
- "fitness workout" vs "yoga practice"

### API Endpoints

The backend provides the following REST API endpoints:

- `GET /analytics/search?search_term_1={term1}&search_term_2={term2}` - Compare two search terms
- `GET /analytics/video/{video_id}` - Get analytics for a single video
- `GET /docs` - Interactive API documentation (Swagger UI)
- `GET /` - Health check endpoint

### Expected Output

The application returns comprehensive analytics including:
- **Search Statistics**: Total results and videos analyzed
- **Engagement Metrics**: Total and average view/like counts
- **Temporal Analysis**: Video release dates vs popularity
- **Visual Comparisons**: Side-by-side metrics with winner indicators


## Visuals

### Main Interface
The application features a clean, modern interface with:
- Intuitive search form for entering comparison terms
- Real-time loading states with smooth animations
- Comprehensive analytics dashboard with visual comparisons
- Interactive charts with hover tooltips and detailed information

### Analytics Dashboard
- **Statistics Cards**: Display total videos, view counts, and engagement metrics
- **Winner Highlighting**: Visual indicators showing which search term performs better
- **Interactive Charts**: Line graphs showing popularity trends over time with logarithmic scaling
- **Responsive Design**: Adapts seamlessly to different screen sizes
  
## Common Issues

#### YouTube API Quota
- The YouTube Data API has daily quota limits
- Monitor your usage in the [Google Cloud Console](https://console.cloud.google.com/)

