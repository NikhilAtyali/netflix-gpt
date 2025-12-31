import { useSelector } from "react-redux";
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
import { selectTheme } from "../store/themeSlice";

const Browse = () => {
  const theme = useSelector(selectTheme);
  
  return (
    <div className={`${theme === 'dark' ? 'bg-netflix-dark' : 'bg-light-bg'} min-h-screen transition-colors duration-300`}>
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