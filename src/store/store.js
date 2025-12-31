import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import myListReducer from "./myListSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    myList: myListReducer,
    theme: themeReducer,
  },
});

export default store;

