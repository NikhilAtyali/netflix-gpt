import { useState, useEffect } from "react";
import { getImageUrl } from "../utils/constants";

const MovieRow = ({ title, fetchFunction }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchFunction();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [fetchFunction, title]);

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-white text-2xl font-bold mb-4 px-8">{title}</h2>
      
      <div className="overflow-x-scroll scrollbar-hide">
        <div className="flex gap-2 px-8">
          {movies.slice(0, 10).map((movie) => (
            <div
              key={movie.id}
              className="min-w-[200px] cursor-pointer transition-transform hover:scale-110"
            >
              <img
                src={getImageUrl(movie.poster_path, "medium", "poster")}
                alt={movie.title || movie.name}
                className="w-full rounded-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/200x300?text=No+Image";
                }}
              />
              <p className="text-white text-sm mt-2 truncate">
                {movie.title || movie.name}
              </p>
              <p className="text-gray-400 text-xs">
                ⭐ {movie.vote_average.toFixed(1)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;

