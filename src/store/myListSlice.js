import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadMyListFromStorage = () => {
  try {
    const savedList = localStorage.getItem("myList");
    return savedList ? JSON.parse(savedList) : [];
  } catch (error) {
    console.error("Error loading My List from localStorage:", error);
    return [];
  }
};

// Save to localStorage
const saveMyListToStorage = (list) => {
  try {
    localStorage.setItem("myList", JSON.stringify(list));
  } catch (error) {
    console.error("Error saving My List to localStorage:", error);
  }
};

const myListSlice = createSlice({
  name: "myList",
  initialState: {
    movies: loadMyListFromStorage(),
  },
  reducers: {
    addToMyList: (state, action) => {
      const movie = action.payload;
      // Check if movie already exists
      const exists = state.movies.find((m) => m.id === movie.id);
      
      if (!exists) {
        state.movies.push(movie);
        saveMyListToStorage(state.movies);
      }
    },
    
    removeFromMyList: (state, action) => {
      const movieId = action.payload;
      state.movies = state.movies.filter((movie) => movie.id !== movieId);
      saveMyListToStorage(state.movies);
    },
    
    clearMyList: (state) => {
      state.movies = [];
      saveMyListToStorage([]);
    },
    
    isInMyList: (state, action) => {
      const movieId = action.payload;
      return state.movies.some((movie) => movie.id === movieId);
    },
  },
});

export const { addToMyList, removeFromMyList, clearMyList } = myListSlice.actions;

// Selectors
export const selectMyList = (state) => state.myList.movies;
export const selectIsInMyList = (movieId) => (state) =>
  state.myList.movies.some((movie) => movie.id === movieId);

export default myListSlice.reducer;

