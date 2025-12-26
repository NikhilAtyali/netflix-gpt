import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { getImageUrl } from "../utils/constants";
import { addToMyList, removeFromMyList, selectIsInMyList } from "../store/myListSlice";

const MovieCard = ({ movie }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isInMyList = useSelector(selectIsInMyList(movie.id));

  const handleCardClick = () => {
    navigate(`/watch/${movie.id}`);
  };

  const handleMyListToggle = (e) => {
    e.stopPropagation();
    if (isInMyList) {
      dispatch(removeFromMyList(movie.id));
    } else {
      dispatch(addToMyList(movie));
    }
  };

  return (
    <div 
      className="relative flex-shrink-0 w-[250px] md:w-[300px] cursor-pointer group/card transition-all duration-300 hover:scale-110 hover:z-50 z-10"
      onClick={handleCardClick}
    >
      {/* Main Card */}
      <div className="relative rounded-md overflow-hidden shadow-lg group-hover/card:shadow-2xl">
        {/* Movie Image */}
        <div className="relative aspect-video bg-gray-800">
          <img
            src={getImageUrl(movie.backdrop_path, "medium", "backdrop")}
            alt={movie.title || movie.name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x169?text=No+Image";
              setImageLoaded(true);
            }}
          />
          
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse" />
          )}

          {/* Gradient overlay - Always visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Default Info - Always visible */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col">
            {/* Title - Always visible */}
            <h3 className="text-white font-bold text-sm mb-2 line-clamp-2">
              {movie.title || movie.name}
            </h3>

            {/* Quick Info - Always visible */}
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 font-bold">
                  ★ {movie.vote_average.toFixed(1)}
                </span>
                {movie.release_date && (
                  <span className="text-gray-300">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                )}
              </div>
              <span className="text-gray-400 border border-gray-500 px-1.5 py-0.5 rounded text-xs">
                {movie.adult ? "18+" : "PG-13"}
              </span>
            </div>

            {/* Action Buttons - Only visible on hover */}
            <div className="flex items-center gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
              {/* Play Button */}
              <button
                className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Play"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Play movie:", movie.id);
                }}
              >
                <svg className="w-3 h-3 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>

              {/* Add to List / Remove from List */}
              <button
                className={`w-7 h-7 border-2 border-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors ${
                  isInMyList ? "bg-white" : ""
                }`}
                aria-label={isInMyList ? "Remove from list" : "Add to list"}
                onClick={handleMyListToggle}
                title={isInMyList ? "Remove from My List" : "Add to My List"}
              >
                {isInMyList ? (
                  <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                )}
              </button>

              {/* Like */}
              <button
                className="w-7 h-7 border-2 border-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Like"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Like movie:", movie.id);
                }}
              >
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </button>

              {/* More Info */}
              <button
                className="ml-auto w-7 h-7 border-2 border-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="More info"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/watch/${movie.id}`);
                }}
              >
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    backdrop_path: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    adult: PropTypes.bool,
  }).isRequired,
};

export default MovieCard;

