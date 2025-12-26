# 🎬 Movie API Setup Guide for Netflix GPT

## 📋 TMDB API Setup Instructions

### Step 1: Create TMDB Account
1. Go to https://www.themoviedb.org/signup
2. Fill in your details and create an account
3. Verify your email address

### Step 2: Get API Key
1. Login to your TMDB account
2. Go to: https://www.themoviedb.org/settings/api
3. Click on "Create" or "Request an API Key"
4. Choose "Developer" option
5. Accept the terms of use
6. Fill in the application details:
   - **Type**: Website
   - **URL**: http://localhost:5173 (or your development URL)
   - **Application Name**: Netflix GPT Clone
   - **Application Summary**: Learning project for movie browsing
7. Submit and get your API key

### Step 3: Add API Key to Project
1. Open `src/utils/constants.js`
2. Replace `YOUR_API_KEY_HERE` with your actual API key:
```javascript
export const TMDB_API_KEY = "your_actual_api_key_here";
```

### Step 4: Test the API
Create a test file or add this to your Browse component:

```javascript
import { getNowPlayingMovies } from '../utils/tmdbApi';

// Inside component
useEffect(() => {
  const fetchMovies = async () => {
    try {
      const data = await getNowPlayingMovies();
      console.log('Movies:', data.results);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  fetchMovies();
}, []);
```

---

## 📚 Available API Functions

### Movies
- `getNowPlayingMovies(page)` - Movies currently in theaters
- `getPopularMovies(page)` - Popular movies
- `getTopRatedMovies(page)` - Top rated movies
- `getUpcomingMovies(page)` - Upcoming releases
- `getTrendingMovies()` - Trending today
- `getMovieDetails(movieId)` - Detailed movie info
- `getMovieVideos(movieId)` - Trailers & videos
- `getMovieCredits(movieId)` - Cast & crew
- `getSimilarMovies(movieId)` - Similar movies

### TV Shows
- `getPopularTVShows(page)` - Popular TV shows
- `getTopRatedTVShows(page)` - Top rated TV shows
- `getTrendingTVShows()` - Trending TV shows

### Search
- `searchMovies(query, page)` - Search movies by title
- `searchMulti(query, page)` - Search movies, TV shows, people

### Discover & Filter
- `discoverMovies(filters)` - Discover with custom filters
- `getMoviesByGenre(genreId, page)` - Movies by genre
- `advancedMovieSearch(options)` - Advanced search with filters

### Genres
- `getMovieGenres()` - Get all movie genres
- `getTVGenres()` - Get all TV genres

---

## 🎨 Image URLs

Use the helper function to get image URLs:

```javascript
import { getImageUrl } from './utils/constants';

// Poster image
const posterUrl = getImageUrl(movie.poster_path, 'medium', 'poster');

// Backdrop image
const backdropUrl = getImageUrl(movie.backdrop_path, 'large', 'backdrop');

// Profile image
const profileUrl = getImageUrl(person.profile_path, 'medium', 'profile');
```

### Available Sizes:
- **Poster**: small (185px), medium (342px), large (500px), original
- **Backdrop**: small (300px), medium (780px), large (1280px), original
- **Profile**: small (45px), medium (185px), large (632px), original

---

## 🔍 Example API Responses

### Movie Object Structure:
```json
{
  "id": 123,
  "title": "Movie Title",
  "overview": "Movie description...",
  "poster_path": "/path/to/poster.jpg",
  "backdrop_path": "/path/to/backdrop.jpg",
  "release_date": "2024-01-01",
  "vote_average": 8.5,
  "vote_count": 1000,
  "genre_ids": [28, 12, 878]
}
```

### Video Object (Trailers):
```json
{
  "key": "YouTube_Video_ID",
  "name": "Official Trailer",
  "site": "YouTube",
  "type": "Trailer"
}
```

---

## 🚀 Usage Examples

### Example 1: Fetch Popular Movies
```javascript
import { getPopularMovies } from './utils/tmdbApi';

const movies = await getPopularMovies(1);
console.log(movies.results); // Array of movie objects
```

### Example 2: Search Movies
```javascript
import { searchMovies } from './utils/tmdbApi';

const results = await searchMovies('Inception');
console.log(results.results); // Matching movies
```

### Example 3: Get Movie with Trailer
```javascript
import { getMovieDetails } from './utils/tmdbApi';

const movie = await getMovieDetails(550); // Fight Club
console.log(movie.videos.results); // Trailers & clips
```

### Example 4: Advanced Search
```javascript
import { advancedMovieSearch } from './utils/tmdbApi';

const movies = await advancedMovieSearch({
  genre: 28, // Action
  year: 2024,
  minRating: 7.0,
  sortBy: 'popularity.desc'
});
```

---

## 🔐 Environment Variables (Recommended)

For better security, use environment variables:

### 1. Create `.env` file:
```bash
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_ACCESS_TOKEN=your_token_here
```

### 2. Update `constants.js`:
```javascript
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
```

### 3. Add `.env` to `.gitignore`:
```
.env
.env.local
```

---

## ⚠️ Rate Limits & Best Practices

- **Rate Limit**: 50 requests per second (very generous)
- **Free Tier**: Unlimited requests
- **Caching**: Consider caching responses to reduce API calls
- **Error Handling**: Always wrap API calls in try-catch blocks
- **Loading States**: Show loading indicators while fetching

---

## 🔗 Useful Links

- **TMDB API Docs**: https://developers.themoviedb.org/3
- **API Reference**: https://developer.themoviedb.org/reference/intro/getting-started
- **API Status**: https://status.themoviedb.org/
- **Image Configuration**: https://developers.themoviedb.org/3/configuration

---

## 🎯 Next Steps

1. ✅ Get your API key
2. ✅ Add it to `constants.js`
3. 📝 Create movie components (MovieCard, MovieList)
4. 🎬 Build Browse page with movie rows
5. 🔍 Add search functionality
6. 🤖 Integrate OpenAI for GPT-powered recommendations

---

## 🆘 Troubleshooting

### "Invalid API Key" Error
- Check if you copied the key correctly
- Make sure there are no extra spaces
- Verify your account is verified

### "401 Unauthorized" Error
- API key not set correctly
- Try regenerating your API key

### CORS Errors
- TMDB API allows cross-origin requests
- If you see CORS errors, you might be using the wrong endpoint

### No Images Loading
- Check if `poster_path` or `backdrop_path` is not null
- Use the `getImageUrl()` helper function
- Verify image size parameter is correct

---

Happy Coding! 🎬🍿

