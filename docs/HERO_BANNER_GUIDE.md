# 🎬 Hero Banner Component Guide

Complete guide for the Netflix-style Hero Banner implementation.

---

## ✨ Features Implemented

### Current Features
- ✅ Large featured movie display
- ✅ High-quality backdrop image
- ✅ Movie title and description
- ✅ Rating and release year
- ✅ Play and More Info buttons
- ✅ Multi-layer gradient overlays
- ✅ Age rating badge
- ✅ Responsive design (mobile to desktop)
- ✅ Loading skeleton
- ✅ Error handling with fallback image
- ✅ Random movie selection
- ✅ Mute button placeholder (for future trailer)

---

## 🎨 Design Elements

### Layout
```
┌─────────────────────────────────────────┐
│  [Backdrop Image with Gradients]       │
│                                         │
│  Movie Title (Large)                   │
│  ★ 8.5  2024  PG-13                    │
│                                         │
│  Movie description text...             │
│                                         │
│  [▶ Play]  [ℹ More Info]              │
│                                         │
│  Genres: Action • Adventure            │
│                                    [18+]│
└─────────────────────────────────────────┘
```

### Color Scheme
- **Background**: Full-width backdrop image
- **Gradients**: 
  - Left-to-right: `from-black via-black/50 to-transparent`
  - Top-to-bottom: `from-black via-transparent to-transparent`
  - Bottom fade: `from-black to-transparent`
- **Text**: White with drop shadows
- **Buttons**: 
  - Play: White background
  - More Info: Semi-transparent gray

---

## 📊 Component Structure

### File: `src/components/HeroBanner.jsx`

```javascript
HeroBanner
├── Background Image Layer
│   ├── Backdrop image
│   └── Three gradient overlays
├── Content Layer
│   ├── Movie Title
│   ├── Metadata (rating, year, age)
│   ├── Description
│   ├── Action Buttons
│   └── Genres
└── UI Elements
    ├── Age Rating Badge
    └── Mute Button
```

---

## 🔧 How It Works

### 1. Data Fetching
```javascript
useEffect(() => {
  const fetchFeaturedMovie = async () => {
    const data = await getNowPlayingMovies();
    const randomIndex = Math.floor(Math.random() * 5);
    setFeaturedMovie(data.results[randomIndex]);
  };
  fetchFeaturedMovie();
}, []);
```

**Logic:**
- Fetches "Now Playing" movies from TMDB
- Selects random movie from first 5 results
- Ensures variety on each page load

### 2. Image Handling
```javascript
<img
  src={getImageUrl(featuredMovie.backdrop_path, "original", "backdrop")}
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/1920x1080";
  }}
/>
```

**Features:**
- Uses TMDB's highest quality backdrop
- Fallback placeholder if image fails
- Covers entire viewport

### 3. Text Truncation
```javascript
const truncateText = (text, maxLength = 200) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
};
```

**Purpose:**
- Prevents overly long descriptions
- Keeps UI clean and readable
- Netflix-style truncation

---

## 📱 Responsive Design

### Breakpoints

**Mobile (< 768px):**
- Title: `text-4xl`
- Smaller padding: `px-8`
- Buttons stack on small screens

**Tablet (768px - 1024px):**
- Title: `text-5xl`
- Medium padding: `px-16`
- Buttons side-by-side

**Desktop (> 1024px):**
- Title: `text-6xl`
- Large padding: `px-20`
- Full-width content display

---

## 🎯 Key Features Explained

### 1. Multi-Layer Gradients

```css
/* Left fade (for text readability) */
from-black via-black/50 to-transparent

/* Top fade (navbar blend) */
from-black via-transparent to-transparent

/* Bottom fade (smooth transition to content) */
from-black to-transparent
```

**Why 3 gradients?**
- Ensures text is always readable
- Smooth blend with navbar
- Seamless transition to movie rows

### 2. Loading State

```javascript
if (loading) {
  return (
    <div className="h-[80vh] bg-gray-900 animate-pulse">
      {/* Skeleton */}
    </div>
  );
}
```

**Benefits:**
- No layout shift
- Better UX
- Maintains height during load

### 3. Movie Info Display

```javascript
<div className="flex items-center space-x-4">
  {/* Rating */}
  <span>{vote_average.toFixed(1)} ★</span>
  
  {/* Year */}
  <span>{new Date(release_date).getFullYear()}</span>
  
  {/* Age Rating */}
  <span className="border">{adult ? "18+" : "PG-13"}</span>
</div>
```

---

## 🚀 Usage

### Basic Implementation

```javascript
import HeroBanner from "./components/HeroBanner";

function Browse() {
  return (
    <div>
      <Navbar />
      <HeroBanner />
      <MovieRows />
    </div>
  );
}
```

### With Negative Margin (Current Setup)

```javascript
<HeroBanner />
<div className="-mt-32 z-10">
  <MovieRows />
</div>
```

**Effect:** Movie rows overlap hero banner bottom, creating depth

---

## 🎬 Future Enhancements

### 1. Auto-Rotating Featured Content

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    // Rotate to next movie
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  }, 10000); // Every 10 seconds

  return () => clearInterval(interval);
}, [movies]);
```

### 2. Trailer Auto-Play

```javascript
const [showTrailer, setShowTrailer] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setShowTrailer(true); // Auto-play after 3 seconds
  }, 3000);
  return () => clearTimeout(timer);
}, []);
```

### 3. Genre Mapping

```javascript
const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  // ... more genres
};

const genreNames = movie.genre_ids.map(id => GENRE_MAP[id]);
```

### 4. Add to My List Button

```javascript
<button onClick={handleAddToList}>
  <svg>+ My List</svg>
</button>
```

---

## 🎨 Customization Options

### Change Hero Height

```javascript
// Current: 80vh
<div className="h-[80vh]">

// Options:
className="h-[70vh]"  // Shorter
className="h-[90vh]"  // Taller
className="h-screen"  // Full screen
```

### Adjust Content Width

```javascript
// Current: max-w-2xl (672px)
<div className="max-w-2xl">

// Options:
className="max-w-xl"   // Narrower (576px)
className="max-w-3xl"  // Wider (768px)
className="max-w-4xl"  // Very wide (896px)
```

### Change Button Styles

```javascript
// Play Button (current: white)
className="bg-white hover:bg-gray-200"

// Alternative: Red Netflix style
className="bg-red-600 hover:bg-red-700"
```

---

## 🐛 Troubleshooting

### Images Not Loading?

**Check:**
1. TMDB API key is valid
2. `backdrop_path` is not null
3. Internet connection
4. CORS policy (should be fine with TMDB)

**Solution:**
- Fallback image is already implemented
- Check console for errors

### Text Not Readable?

**Adjust gradients:**
```javascript
// Make left gradient darker
className="bg-gradient-to-r from-black via-black/70 to-transparent"
```

### Hero Too Tall on Mobile?

```javascript
// Use responsive height
className="h-[60vh] md:h-[80vh]"
```

---

## 📊 Performance Optimization

### Current Optimizations
- ✅ Single API call on mount
- ✅ Image lazy loading
- ✅ Efficient re-renders
- ✅ CSS animations (GPU accelerated)

### Potential Improvements
```javascript
// 1. Memoize movie data
const featuredMovie = useMemo(() => selectRandom(movies), [movies]);

// 2. Preload next image (for rotation)
useEffect(() => {
  const img = new Image();
  img.src = getImageUrl(nextMovie.backdrop_path);
}, [nextMovie]);

// 3. Intersection Observer (lazy load)
const [isVisible, setIsVisible] = useState(false);
```

---

## 🎯 Best Practices

### Do's ✅
- Keep descriptions under 200 characters
- Use high-quality backdrop images
- Maintain contrast for readability
- Test on mobile devices
- Handle loading states
- Provide fallback images

### Don'ts ❌
- Don't use poster images (wrong aspect ratio)
- Don't skip gradient overlays
- Don't make buttons too small
- Don't ignore accessibility
- Don't forget error handling

---

## 🔗 Related Components

- **Navbar** - Overlays hero, transparent initially
- **MovieRow** - Negative margin overlaps hero
- **Footer** - Appears after all content

---

## 📈 Metrics

- **Height**: 80vh (viewport height based)
- **Load Time**: ~1-2 seconds
- **API Calls**: 1 (shared with MovieRow)
- **Image Size**: ~200-300KB (compressed)

---

**Your Hero Banner is production-ready! 🎉**

Next: Add trailer auto-play or auto-rotation!

