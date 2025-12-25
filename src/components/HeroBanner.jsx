import { useState, useEffect } from "react";
import { getNowPlayingMovies } from "../utils/tmdbApi";
import { getImageUrl } from "../utils/constants";

const HeroBanner = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const data = await getNowPlayingMovies();
        // Get a random movie from the first 5 results for variety
        const randomIndex = Math.floor(Math.random() * Math.min(5, data.results.length));
        setFeaturedMovie(data.results[randomIndex]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching featured movie:", error);
        setLoading(false);
      }
    };

    fetchFeaturedMovie();
  }, []);

  // Truncate long descriptions
  const truncateText = (text, maxLength = 200) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <div className="relative h-[80vh] bg-gray-900 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>
    );
  }

  if (!featuredMovie) {
    return null;
  }

  return (
    <div className="relative h-[80vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={getImageUrl(featuredMovie.backdrop_path, "original", "backdrop")}
          alt={featuredMovie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/1920x1080?text=Netflix+GPT";
          }}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center px-8 md:px-16 lg:px-20">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            {featuredMovie.title || featuredMovie.name}
          </h1>

          {/* Movie Info */}
          <div className="flex items-center space-x-4 text-sm md:text-base">
            {featuredMovie.vote_average && (
              <div className="flex items-center space-x-1">
                <span className="text-green-400 font-bold">
                  {featuredMovie.vote_average.toFixed(1)}
                </span>
                <span className="text-yellow-400">★</span>
              </div>
            )}
            {featuredMovie.release_date && (
              <span className="text-gray-300">
                {new Date(featuredMovie.release_date).getFullYear()}
              </span>
            )}
            {featuredMovie.adult !== undefined && (
              <span className="px-2 py-0.5 border border-gray-400 text-gray-300 text-xs rounded">
                {featuredMovie.adult ? "18+" : "PG-13"}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-200 leading-relaxed drop-shadow-md">
            {truncateText(featuredMovie.overview, 200)}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Play Button */}
            <button className="flex items-center space-x-2 px-8 py-3 bg-white hover:bg-gray-200 text-black font-semibold rounded transition-colors shadow-lg">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Play</span>
            </button>

            {/* More Info Button */}
            <button className="flex items-center space-x-2 px-8 py-3 bg-gray-500/70 hover:bg-gray-500/50 text-white font-semibold rounded transition-colors backdrop-blur-sm">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>More Info</span>
            </button>
          </div>

          {/* Genres (Optional) */}
          {featuredMovie.genre_ids && featuredMovie.genre_ids.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-gray-400 text-sm">Genres:</span>
              {/* You can map genre IDs to names here if you have genre data */}
              <span className="text-gray-300 text-sm">
                Action • Adventure • Thriller
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Age Rating Badge (Bottom Right) */}
      <div className="absolute bottom-8 right-8 px-3 py-1 border-l-4 border-white bg-black/70 backdrop-blur-sm">
        <span className="text-white text-xs font-bold">
          {featuredMovie.adult ? "18+" : "13+"}
        </span>
      </div>

      {/* Mute Button (for future trailer auto-play) */}
      <button className="absolute bottom-8 right-24 p-2 bg-black/50 hover:bg-black/70 rounded-full border border-white/50 transition-colors">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
      </button>
    </div>
  );
};

export default HeroBanner;

