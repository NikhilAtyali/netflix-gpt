// TMDB API Service Functions
import { TMDB_API_KEY, API_ENDPOINTS } from "./constants";

// Base fetch function with error handling
const fetchFromTMDB = async (url, params = {}) => {
  try {
    const queryParams = new URLSearchParams({
      api_key: TMDB_API_KEY,
      language: "en-US",
      ...params,
    });

    const response = await fetch(`${url}?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching from TMDB:", error);
    throw error;
  }
};

// Movie APIs
export const getNowPlayingMovies = async (page = 1) => {
  return fetchFromTMDB(API_ENDPOINTS.nowPlayingMovies, { page });
};

export const getPopularMovies = async (page = 1) => {
  return fetchFromTMDB(API_ENDPOINTS.popularMovies, { page });
};

export const getTopRatedMovies = async (page = 1) => {
  return fetchFromTMDB(API_ENDPOINTS.topRatedMovies, { page });
};

export const getUpcomingMovies = async (page = 1) => {
  return fetchFromTMDB(API_ENDPOINTS.upcomingMovies, { page });
};

export const getTrendingMovies = async () => {
  return fetchFromTMDB(API_ENDPOINTS.trendingMovies);
};

export const getMovieDetails = async (movieId) => {
  return fetchFromTMDB(API_ENDPOINTS.movieDetails(movieId), {
    append_to_response: "videos,credits,similar",
  });
};

export const getMovieVideos = async (movieId) => {
  return fetchFromTMDB(API_ENDPOINTS.movieVideos(movieId));
};

export const getMovieCredits = async (movieId) => {
  return fetchFromTMDB(API_ENDPOINTS.movieCredits(movieId));
};

export const getSimilarMovies = async (movieId) => {
  return fetchFromTMDB(API_ENDPOINTS.similarMovies(movieId));
};

// TV Show APIs
export const getPopularTVShows = async (page = 1) => {
  return fetchFromTMDB(API_ENDPOINTS.popularTVShows, { page });
};

export const getTopRatedTVShows = async (page = 1) => {
  return fetchFromTMDB(API_ENDPOINTS.topRatedTVShows, { page });
};

export const getTrendingTVShows = async () => {
  return fetchFromTMDB(API_ENDPOINTS.trendingTVShows);
};

// Search APIs
export const searchMovies = async (query, page = 1) => {
  return fetchFromTMDB(API_ENDPOINTS.searchMovies, { query, page });
};

export const searchMulti = async (query, page = 1) => {
  return fetchFromTMDB(API_ENDPOINTS.searchMulti, { query, page });
};

// Discover APIs (with filters)
export const discoverMovies = async (filters = {}) => {
  return fetchFromTMDB(API_ENDPOINTS.discoverMovies, filters);
};

export const discoverTV = async (filters = {}) => {
  return fetchFromTMDB(API_ENDPOINTS.discoverTV, filters);
};

// Genre APIs
export const getMovieGenres = async () => {
  return fetchFromTMDB(API_ENDPOINTS.movieGenres);
};

export const getTVGenres = async () => {
  return fetchFromTMDB(API_ENDPOINTS.tvGenres);
};

// Get movies by genre
export const getMoviesByGenre = async (genreId, page = 1) => {
  return fetchFromTMDB(API_ENDPOINTS.discoverMovies, {
    with_genres: genreId,
    page,
    sort_by: "popularity.desc",
  });
};

// Advanced search with multiple filters
export const advancedMovieSearch = async ({
  genre,
  year,
  minRating,
  sortBy = "popularity.desc",
  page = 1,
}) => {
  const filters = {
    page,
    sort_by: sortBy,
  };

  if (genre) filters.with_genres = genre;
  if (year) filters.primary_release_year = year;
  if (minRating) filters["vote_average.gte"] = minRating;

  return fetchFromTMDB(API_ENDPOINTS.discoverMovies, filters);
};

