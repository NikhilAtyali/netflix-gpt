import { useSelector } from "react-redux";
import { selectMyList } from "../store/myListSlice";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/constants";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MovieCard from "./MovieCard";

const MyList = () => {
  const myList = useSelector(selectMyList);
  const navigate = useNavigate();

  return (
    <div className="bg-netflix-dark min-h-screen">
      <Navbar />

      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            My List
          </h1>
          <p className="text-gray-400">
            {myList.length} {myList.length === 1 ? "movie" : "movies"} in your list
          </p>
        </div>

        {/* Empty State */}
        {myList.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <svg
              className="w-24 h-24 text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <h2 className="text-2xl font-bold text-white mb-2">
              Your list is empty
            </h2>
            <p className="text-gray-400 text-center max-w-md mb-6">
              Browse movies and add them to your list to watch later
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition-colors font-semibold"
            >
              Browse Movies
            </button>
          </div>
        )}

        {/* Movies Grid */}
        {myList.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-20">
            {myList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyList;

