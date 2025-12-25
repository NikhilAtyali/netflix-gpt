import { useState, useEffect } from "react";
import { getNowPlayingMovies } from "../utils/tmdbApi";
import { getImageUrl } from "../utils/constants";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getNowPlayingMovies(1);
        setMovies(data.results);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-white text-2xl">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">
          Error: {error}
          <p className="text-sm mt-2">
            Make sure you added your TMDB API key in src/utils/constants.js
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen p-8">
      <h1 className="text-white text-4xl font-bold mb-8">Now Playing</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="group cursor-pointer transition-transform hover:scale-105"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={getImageUrl(movie.poster_path, "medium", "poster")}
                alt={movie.title}
                className="w-full h-auto"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/342x513?text=No+Image";
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity p-4">
                  <h3 className="font-bold text-sm mb-2">{movie.title}</h3>
                  <p className="text-xs">⭐ {movie.vote_average.toFixed(1)}</p>
                  <p className="text-xs mt-1">{movie.release_date?.split("-")[0]}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;

