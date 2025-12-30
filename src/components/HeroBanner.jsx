import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTrendingMovies } from "../utils/tmdbApi";
import { getImageUrl } from "../utils/constants";
import { Play, Info } from "lucide-react";

const HeroBanner = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedMovie();
  }, []);

  const fetchFeaturedMovie = async () => {
    try {
      setLoading(true);
      const data = await getTrendingMovies();
      
      if (data?.results && data.results.length > 0) {
        // Pick a random movie from the first 5 trending movies
        const randomIndex = Math.floor(Math.random() * Math.min(5, data.results.length));
        setFeaturedMovie(data.results[randomIndex]);
      }
    } catch (error) {
      console.error("Error fetching featured movie:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlay = () => {
    if (featuredMovie) {
      navigate(`/watch/${featuredMovie.id}`);
    }
  };

  const handleMoreInfo = () => {
    if (featuredMovie) {
      navigate(`/watch/${featuredMovie.id}`);
    }
  };

  // Truncate overview to a specific length
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + "...";
  };

  if (loading || !featuredMovie) {
    return (
      <div className="relative h-[80vh] bg-netflix-dark animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative h-[80vh] w-full pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 top-0">
        <img
          src={getImageUrl(featuredMovie.backdrop_path, "original", "backdrop")}
          alt={featuredMovie.title || featuredMovie.name}
          className="w-full h-full object-cover"
          loading="eager"
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-netflix-dark via-netflix-dark/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-dark via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-netflix-dark to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center px-4 md:px-12 lg:px-20">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
            {featuredMovie.title || featuredMovie.name}
          </h1>

          {/* Metadata */}
          <div className="flex items-center space-x-4 text-sm md:text-base">
            {featuredMovie.vote_average > 0 && (
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="text-white font-semibold">
                  {featuredMovie.vote_average.toFixed(1)}
                </span>
              </div>
            )}
            {featuredMovie.release_date && (
              <span className="text-gray-300">
                {new Date(featuredMovie.release_date).getFullYear()}
              </span>
            )}
            {featuredMovie.adult !== undefined && (
              <span className="border border-gray-400 text-gray-300 px-2 py-0.5 text-xs">
                {featuredMovie.adult ? "18+" : "PG-13"}
              </span>
            )}
          </div>

          {/* Overview */}
          <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed drop-shadow-md max-w-xl">
            {truncateText(featuredMovie.overview, 200)}
          </p>

          {/* Buttons */}
          <div className="flex items-center space-x-3 pt-2">
            {/* Play Button */}
            <button
              onClick={handlePlay}
              className="flex items-center space-x-2 bg-white text-black px-6 py-2.5 md:px-8 md:py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors shadow-lg"
            >
              <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" />
              <span className="text-sm md:text-base">Play</span>
            </button>

            {/* More Info Button */}
            <button
              onClick={handleMoreInfo}
              className="flex items-center space-x-2 bg-gray-600/80 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-md font-semibold hover:bg-gray-600/60 transition-colors backdrop-blur-sm shadow-lg"
            >
              <Info className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-sm md:text-base">More Info</span>
            </button>
          </div>

          {/* Genres (if available) */}
          {featuredMovie.genre_ids && featuredMovie.genre_ids.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {featuredMovie.genre_ids.slice(0, 3).map((genreId) => {
                const genreNames = {
                  28: "Action",
                  12: "Adventure",
                  16: "Animation",
                  35: "Comedy",
                  80: "Crime",
                  99: "Documentary",
                  18: "Drama",
                  10751: "Family",
                  14: "Fantasy",
                  36: "History",
                  27: "Horror",
                  10402: "Music",
                  9648: "Mystery",
                  10749: "Romance",
                  878: "Sci-Fi",
                  10770: "TV Movie",
                  53: "Thriller",
                  10752: "War",
                  37: "Western",
                };
                
                return (
                  <span
                    key={genreId}
                    className="text-xs md:text-sm text-gray-300 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm"
                  >
                    {genreNames[genreId] || "Other"}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Fade to Content Below */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-netflix-dark to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroBanner;
