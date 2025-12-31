import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMoviesByGenre } from "../utils/tmdbApi";
import { getImageUrl } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { selectTheme } from "../store/themeSlice";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Popular genres with their IDs from TMDB
const GENRES = {
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
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const GenrePage = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    const fetchGenreMovies = async () => {
      try {
        setLoading(true);
        const data = await getMoviesByGenre(genreId, 1);
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching genre movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreMovies();
    window.scrollTo(0, 0);
  }, [genreId]);

  const genreName = GENRES[genreId] || "Movies";

  const handleCardClick = (movie) => {
    navigate(`/watch/${movie.id}`);
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-netflix-dark' : 'bg-light-bg'} min-h-screen`}>
      <Navbar />

      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Genre Header */}
        <div className="mb-8">
          <h1 className={`text-4xl md:text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
            {genreName} Movies
          </h1>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Explore popular {genreName.toLowerCase()} movies
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} text-xl`}>Loading...</div>
          </div>
        )}

        {/* Empty State */}
        {!loading && movies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
              No movies found
            </h2>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Try selecting a different genre
            </p>
          </div>
        )}

        {/* Movies Grid */}
        {!loading && movies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-20">
            {movies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleCardClick(movie)}
                className="cursor-pointer group"
              >
                <div className="relative aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden mb-2 group-hover:scale-105 transition-transform">
                  <img
                    src={
                      movie.poster_path
                        ? getImageUrl(movie.poster_path, "medium", "poster")
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300x450?text=No+Image";
                    }}
                  />

                  {/* Rating Badge */}
                  {movie.vote_average > 0 && (
                    <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-yellow-400 font-bold flex items-center gap-1">
                      <span>★</span>
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-white font-semibold text-sm line-clamp-2 mb-1">
                  {movie.title}
                </h3>

                {/* Year */}
                {movie.release_date && (
                  <p className="text-gray-400 text-xs">
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default GenrePage;

