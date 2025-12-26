# 🚀 Quick Start Guide - Netflix GPT

## ⚡ Get Started in 5 Minutes!

### Step 1: Get TMDB API Key (2 minutes)

1. Go to: **https://www.themoviedb.org/signup**
2. Create account (use any email)
3. Verify your email
4. Go to: **https://www.themoviedb.org/settings/api**
5. Click **"Request API Key"** → Choose **"Developer"**
6. Fill the form:
   - Application Name: `Netflix GPT`
   - Application URL: `http://localhost:5173`
   - Description: `Learning project`
7. Copy your API Key

---

### Step 2: Add API Key to Project (30 seconds)

Open this file and replace YOUR_API_KEY_HERE with your actual key:

**File:** `src/utils/constants.js`

```javascript
export const TMDB_API_KEY = "paste_your_api_key_here";
```

---

### Step 3: Install & Run (1 minute)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

---

### Step 4: Test It! (30 seconds)

1. Open browser: **http://localhost:5173**
2. Login page should appear
3. Click "Sign Up" or "Sign In" button
4. Navigate to: **http://localhost:5173/browse**
5. You should see movie rows loading!

---

## 🎬 What You Get

✅ **Now Playing** - Movies currently in theaters  
✅ **Trending Today** - What's hot right now  
✅ **Popular Movies** - All-time favorites  
✅ **Top Rated** - Highest rated movies  

---

## 🔧 Troubleshooting

### "Invalid API Key" Error
- Check if you copied the entire key (no spaces)
- Make sure you replaced YOUR_API_KEY_HERE in constants.js
- Verify your email on TMDB

### Movies Not Loading
- Open browser console (F12)
- Check for error messages
- Verify API key is correct

### CORS Errors
- TMDB allows CORS by default
- If you see CORS errors, restart your dev server

---

## 📝 Available API Functions

I've created all these functions for you in `src/utils/tmdbApi.js`:

```javascript
// Import any of these:
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getTrendingMovies,
  getMovieDetails,
  searchMovies,
  getMoviesByGenre,
} from './utils/tmdbApi';

// Use them:
const movies = await getNowPlayingMovies();
const results = await searchMovies('Inception');
const details = await getMovieDetails(550);
```

---

## 🎨 Example: Add a Search Feature

```javascript
import { useState } from 'react';
import { searchMovies } from '../utils/tmdbApi';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const data = await searchMovies(query);
    setResults(data.results);
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />
      <button onClick={handleSearch}>Search</button>
      
      {results.map(movie => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
}
```

---

## 📚 What's Next?

1. ✅ Basic movie browsing (DONE!)
2. 🔜 Add Firebase authentication
3. 🔜 Create movie detail pages
4. 🔜 Add GPT-powered search
5. 🔜 Build recommendation system
6. 🔜 Add watchlist feature

---

## 🆘 Need Help?

Check the detailed guide: `API_SETUP_GUIDE.md`

---

**That's it! You're ready to build! 🎉**

