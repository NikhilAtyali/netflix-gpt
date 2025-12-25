import { useState, useEffect, useRef } from "react";
import { getImageUrl } from "../utils/constants";
import MovieCard from "./MovieCard";

const MovieRow = ({ title, fetchFunction }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const rowRef = useRef(null);

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

  const scroll = (direction) => {
    const container = rowRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of visible width
    const newPosition =
      direction === "left"
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });

    setScrollPosition(newPosition);
  };

  if (loading) {
    return (
      <div className="mb-12 px-8">
        <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>
        <div className="flex gap-2 overflow-hidden">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="min-w-[250px] md:min-w-[300px] h-[140px] md:h-[170px] bg-gray-800 animate-pulse rounded-md"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 group/row">
      {/* Title */}
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4 px-8">
        {title}
      </h2>

      {/* Row Container */}
      <div className="relative">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-black/50 hover:bg-black/80 text-white opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          aria-label="Scroll left"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Movies Container */}
        <div
          ref={rowRef}
          className="flex gap-2 px-8 py-2 overflow-x-scroll scrollbar-hide"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-black/50 hover:bg-black/80 text-white opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          aria-label="Scroll right"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MovieRow;

