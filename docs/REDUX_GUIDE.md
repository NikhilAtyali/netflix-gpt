# 🔴 Redux Toolkit Setup Guide

Complete guide for Redux state management in Netflix GPT.

---

## 📦 Installed Packages

```bash
npm install @reduxjs/toolkit react-redux
```

---

## 🏗️ Project Structure

```
src/
├── store/
│   ├── store.js          # Redux store configuration
│   ├── userSlice.js      # User authentication state
│   └── moviesSlice.js    # Movies data state
├── main.jsx              # Provider setup
└── ...
```

---

## 🔧 Store Configuration

**File:** `src/store/store.js`

```javascript
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
  },
});

export default store;
```

---

## 👤 User Slice (Authentication)

**File:** `src/store/userSlice.js`

### State Structure
```javascript
{
  currentUser: null,      // User object from Firebase
  isAuthenticated: false, // Boolean flag
  loading: false,         // Loading state
  error: null            // Error message
}
```

### Available Actions
- `setUser(payload)` - Set user after login/signup
- `removeUser()` - Clear user on logout
- `setLoading(boolean)` - Set loading state
- `setError(message)` - Set error message
- `clearError()` - Clear error

### Usage Example

```javascript
import { useDispatch, useSelector } from "react-redux";
import { setUser, removeUser } from "../store/userSlice";

function MyComponent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // After successful login
  dispatch(setUser({ uid: "123", email: "user@example.com", name: "John" }));

  // On logout
  dispatch(removeUser());
}
```

---

## 🎬 Movies Slice

**File:** `src/store/moviesSlice.js`

### State Structure
```javascript
{
  nowPlayingMovies: null,
  popularMovies: null,
  topRatedMovies: null,
  upcomingMovies: null,
  trendingMovies: null,
  movieDetails: null,
  searchResults: null,
  loading: false,
  error: null
}
```

### Available Actions

**Set Movie Data:**
- `setNowPlayingMovies(movies)`
- `setPopularMovies(movies)`
- `setTopRatedMovies(movies)`
- `setUpcomingMovies(movies)`
- `setTrendingMovies(movies)`
- `setMovieDetails(movie)`
- `setSearchResults(results)`

**Clear Data:**
- `clearSearchResults()`
- `clearAllMovies()` - Clear everything (on logout)

**Loading & Errors:**
- `setMoviesLoading(boolean)`
- `setMoviesError(message)`
- `clearMoviesError()`

### Usage Example

```javascript
import { useDispatch, useSelector } from "react-redux";
import { setNowPlayingMovies } from "../store/moviesSlice";
import { getNowPlayingMovies } from "../utils/tmdbApi";

function Browse() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.nowPlayingMovies);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getNowPlayingMovies();
      dispatch(setNowPlayingMovies(data.results));
    };
    fetchMovies();
  }, [dispatch]);

  return <div>{/* Render movies */}</div>;
}
```

---

## 🚀 Quick Start Examples

### 1. Login Flow

```javascript
// Login.jsx
import { useDispatch } from "react-redux";
import { setUser, setLoading, setError } from "../store/userSlice";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = async (email, password) => {
    dispatch(setLoading(true));
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      }));
      navigate("/");
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
```

### 2. Protected Route

```javascript
// ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};
```

### 3. Navbar with User Info

```javascript
// Navbar.jsx
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../store/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    // Logout from Firebase
    signOut(auth);
    // Clear Redux state
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <nav>
      {user && <p>Welcome, {user.displayName}</p>}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};
```

### 4. Fetch & Store Movies

```javascript
// Browse.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNowPlayingMovies,
  setPopularMovies,
  setMoviesLoading,
} from "../store/moviesSlice";
import { getNowPlayingMovies, getPopularMovies } from "../utils/tmdbApi";

const Browse = () => {
  const dispatch = useDispatch();
  const nowPlaying = useSelector((state) => state.movies.nowPlayingMovies);

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch(setMoviesLoading(true));
      
      const nowPlayingData = await getNowPlayingMovies();
      dispatch(setNowPlayingMovies(nowPlayingData.results));
      
      const popularData = await getPopularMovies();
      dispatch(setPopularMovies(popularData.results));
      
      dispatch(setMoviesLoading(false));
    };

    fetchMovies();
  }, [dispatch]);

  return <div>{/* Render movies */}</div>;
};
```

---

## 🎯 Best Practices

### 1. Use Selectors
```javascript
// ✅ Good - Memoized selector
const user = useSelector((state) => state.user.currentUser);

// ❌ Bad - Creates new reference every render
const user = useSelector((state) => ({ ...state.user.currentUser }));
```

### 2. Dispatch in useEffect
```javascript
useEffect(() => {
  dispatch(fetchMovies());
}, [dispatch]); // Include dispatch in dependencies
```

### 3. Error Handling
```javascript
try {
  // API call
  dispatch(setMovies(data));
} catch (error) {
  dispatch(setError(error.message));
} finally {
  dispatch(setLoading(false));
}
```

### 4. Clear State on Logout
```javascript
const handleLogout = () => {
  dispatch(removeUser());
  dispatch(clearAllMovies()); // Clear all movie data
  navigate("/login");
};
```

---

## 🔍 Redux DevTools

Install the Redux DevTools browser extension:
- **Chrome**: [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- **Firefox**: [Redux DevTools](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

This allows you to:
- ✅ Inspect state in real-time
- ✅ Time-travel debugging
- ✅ Track actions
- ✅ See state diffs

---

## 📊 State Management Strategy

### When to Use Redux vs Local State?

**Use Redux for:**
- ✅ User authentication state
- ✅ Movie data (shared across components)
- ✅ Search results
- ✅ My List / Watchlist
- ✅ App-wide settings

**Use Local State (useState) for:**
- ✅ Form inputs
- ✅ Modal open/close
- ✅ Temporary UI state
- ✅ Component-specific state

---

## 🚧 Next Steps

1. ✅ Redux Toolkit installed
2. ✅ Store configured
3. ✅ User slice created
4. ✅ Movies slice created
5. ✅ Provider added to app
6. ⏳ Implement Firebase with Redux (next)
7. ⏳ Update components to use Redux

---

## 📚 Additional Resources

- **Redux Toolkit Docs**: https://redux-toolkit.js.org/
- **React-Redux Hooks**: https://react-redux.js.org/api/hooks
- **Redux DevTools**: https://github.com/reduxjs/redux-devtools

---

**Your Redux setup is complete! 🎉**

