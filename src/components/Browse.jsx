import Navbar from "./Navbar";
import Footer from "./Footer";
import HeroBanner from "./HeroBanner";
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
      
      {/* Hero Banner Section */}
      <HeroBanner />

      {/* Movie Rows Section */}
      <div className="relative -mt-32 z-10">
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