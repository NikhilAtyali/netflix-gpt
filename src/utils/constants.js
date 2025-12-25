// TMDB API Configuration
// Get your API key from: https://www.themoviedb.org/settings/api

export const TMDB_API_KEY = "365da6be2b76ca445d413e76396f1568";
export const TMDB_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjVkYTZiZTJiNzZjYTQ0NWQ0MTNlNzYzOTZmMTU2OCIsIm5iZiI6MTc2NjY2NDA3NS43OTIsInN1YiI6IjY5NGQyNzhiY2ZlYTRiNTUyMTgxMThhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oBQGmCJQIFPJsPYlS0QfyjM2zyWwgEVce8n3-ux3c-s";

// Base URLs
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

// Image Sizes
export const POSTER_SIZES = {
  small: "w185",
  medium: "w342",
  large: "w500",
  original: "original",
};

export const BACKDROP_SIZES = {
  small: "w300",
  medium: "w780",
  large: "w1280",
  original: "original",
};

export const PROFILE_SIZES = {
  small: "w45",
  medium: "w185",
  large: "h632",
  original: "original",
};

// API Endpoints
export const API_ENDPOINTS = {
  // Movies
  nowPlayingMovies: `${TMDB_BASE_URL}/movie/now_playing`,
  popularMovies: `${TMDB_BASE_URL}/movie/popular`,
  topRatedMovies: `${TMDB_BASE_URL}/movie/top_rated`,
  upcomingMovies: `${TMDB_BASE_URL}/movie/upcoming`,
  trendingMovies: `${TMDB_BASE_URL}/trending/movie/day`,
  movieDetails: (movieId) => `${TMDB_BASE_URL}/movie/${movieId}`,
  movieVideos: (movieId) => `${TMDB_BASE_URL}/movie/${movieId}/videos`,
  movieCredits: (movieId) => `${TMDB_BASE_URL}/movie/${movieId}/credits`,
  similarMovies: (movieId) => `${TMDB_BASE_URL}/movie/${movieId}/similar`,
  
  // TV Shows
  popularTVShows: `${TMDB_BASE_URL}/tv/popular`,
  topRatedTVShows: `${TMDB_BASE_URL}/tv/top_rated`,
  trendingTVShows: `${TMDB_BASE_URL}/trending/tv/day`,
  
  // Search
  searchMovies: `${TMDB_BASE_URL}/search/movie`,
  searchMulti: `${TMDB_BASE_URL}/search/multi`,
  
  // Discover (with filters)
  discoverMovies: `${TMDB_BASE_URL}/discover/movie`,
  discoverTV: `${TMDB_BASE_URL}/discover/tv`,
  
  // Genres
  movieGenres: `${TMDB_BASE_URL}/genre/movie/list`,
  tvGenres: `${TMDB_BASE_URL}/genre/tv/list`,
};

// Helper function to build image URL
export const getImageUrl = (path, size = "original", type = "poster") => {
  if (!path) return null;
  
  let sizeValue = size;
  if (type === "poster") {
    sizeValue = POSTER_SIZES[size] || size;
  } else if (type === "backdrop") {
    sizeValue = BACKDROP_SIZES[size] || size;
  } else if (type === "profile") {
    sizeValue = PROFILE_SIZES[size] || size;
  }
  
  return `${TMDB_IMAGE_BASE_URL}${sizeValue}${path}`;
};

// Default API options
export const getApiOptions = (apiKey = TMDB_API_KEY) => ({
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`, // Use if you have access token
  },
  params: {
    api_key: apiKey,
    language: "en-US",
  },
});

