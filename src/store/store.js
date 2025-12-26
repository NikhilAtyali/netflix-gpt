import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import myListReducer from "./myListSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    myList: myListReducer,
  },
});

export default store;

