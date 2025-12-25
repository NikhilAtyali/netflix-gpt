import Navbar from "./Navbar";
import Footer from "./Footer";
import MovieRow from "./MovieRow";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "../utils/tmdbApi";

const Browse = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section - Can add a featured movie banner here later */}
        <div className="h-[60vh] bg-gradient-to-b from-gray-900 to-black flex items-center justify-center mb-8">
          <div className="text-center">
            <h1 className="text-white text-5xl font-bold mb-4">
              Welcome to Netflix GPT
            </h1>
            <p className="text-gray-400 text-xl">
              Discover movies powered by AI
            </p>
          </div>
        </div>

        {/* Movie Rows */}
        <MovieRow title="Now Playing" fetchFunction={getNowPlayingMovies} />
        <MovieRow title="Trending Today" fetchFunction={getTrendingMovies} />
        <MovieRow title="Popular Movies" fetchFunction={getPopularMovies} />
        <MovieRow title="Top Rated" fetchFunction={getTopRatedMovies} />
      </div>

      <Footer />
    </div>
  );
};

export default Browse;