import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    trendingMovies: null,
    movieDetails: null,
    searchResults: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Now Playing Movies
    setNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },

    // Popular Movies
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },

    // Top Rated Movies
    setTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },

    // Upcoming Movies
    setUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },

    // Trending Movies
    setTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },

    // Movie Details
    setMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },

    // Search Results
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },

    // Clear Search Results
    clearSearchResults: (state) => {
      state.searchResults = null;
    },

    // Loading State
    setMoviesLoading: (state, action) => {
      state.loading = action.payload;
    },

    // Error State
    setMoviesError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Clear Error
    clearMoviesError: (state) => {
      state.error = null;
    },

    // Clear all movies (on logout)
    clearAllMovies: (state) => {
      state.nowPlayingMovies = null;
      state.popularMovies = null;
      state.topRatedMovies = null;
      state.upcomingMovies = null;
      state.trendingMovies = null;
      state.movieDetails = null;
      state.searchResults = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setNowPlayingMovies,
  setPopularMovies,
  setTopRatedMovies,
  setUpcomingMovies,
  setTrendingMovies,
  setMovieDetails,
  setSearchResults,
  clearSearchResults,
  setMoviesLoading,
  setMoviesError,
  clearMoviesError,
  clearAllMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer;

