import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../utils/tmdbApi";
import { getImageUrl } from "../utils/constants";
import MovieList from "./MovieList";

const MovieDetail = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // overview, videos, similar

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch movie details with videos, credits, and similar movies
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [movieId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">{error || "Movie not found"}</div>
      </div>
    );
  }

  // Helper functions
  const getRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getReleaseYear = (date) => {
    return date ? new Date(date).getFullYear() : "N/A";
  };

  const getMaturityRating = (adult) => {
    return adult ? "18+" : "PG-13";
  };

  // Get trailer video
  const trailer = movie.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  ) || movie.videos?.results?.[0];

  // Get director
  const director = movie.credits?.crew?.find(
    (person) => person.job === "Director"
  );

  // Get top cast (first 10)
  const cast = movie.credits?.cast?.slice(0, 10) || [];

  // Get writers
  const writers = movie.credits?.crew?.filter(
    (person) => person.job === "Writer" || person.job === "Screenplay"
  ) || [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all"
        aria-label="Go back"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Hero Section with Backdrop */}
      <div className="relative h-[70vh] md:h-[85vh]">
        {/* Backdrop Image */}
        <div className="absolute inset-0">
          <img
            src={getImageUrl(movie.backdrop_path, "original", "backdrop")}
            alt={movie.title || movie.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/1920x1080?text=No+Image";
            }}
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-20">
          <div className="w-full md:w-2/3">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {movie.title || movie.name}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base mb-6">
              <span className="text-green-400 font-bold text-lg">
                {Math.round(movie.vote_average * 10)}% Match
              </span>
              <span>{getReleaseYear(movie.release_date || movie.first_air_date)}</span>
              {movie.runtime && <span>{getRuntime(movie.runtime)}</span>}
              <span className="border border-gray-400 px-2 py-0.5">
                {getMaturityRating(movie.adult)}
              </span>
              {movie.original_language && (
                <span className="uppercase">{movie.original_language}</span>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-800/80 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Play Button */}
              <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-md hover:bg-gray-200 transition-colors font-bold text-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </button>

              {/* Add to List */}
              <button className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>

              {/* Like */}
              <button className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </button>

              {/* Share */}
              <button className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-8 mb-8 border-b border-gray-800">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-4 font-semibold transition-colors ${
              activeTab === "overview"
                ? "text-white border-b-4 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Overview
          </button>
          {trailer && (
            <button
              onClick={() => setActiveTab("videos")}
              className={`pb-4 font-semibold transition-colors ${
                activeTab === "videos"
                  ? "text-white border-b-4 border-red-600"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Trailers & More
            </button>
          )}
          <button
            onClick={() => setActiveTab("similar")}
            className={`pb-4 font-semibold transition-colors ${
              activeTab === "similar"
                ? "text-white border-b-4 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            More Like This
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="md:col-span-2 space-y-8">
              {/* Plot Synopsis */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                <p className="text-gray-300 leading-relaxed">
                  {showFullOverview || movie.overview.length < 300
                    ? movie.overview
                    : `${movie.overview.substring(0, 300)}...`}
                </p>
                {movie.overview.length > 300 && (
                  <button
                    onClick={() => setShowFullOverview(!showFullOverview)}
                    className="text-red-600 hover:text-red-500 mt-2 font-semibold"
                  >
                    {showFullOverview ? "Show Less" : "Read More"}
                  </button>
                )}
              </div>

              {/* Cast */}
              {cast.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Cast</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {cast.map((actor) => (
                      <div key={actor.id} className="text-center">
                        <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden mb-2">
                          <img
                            src={
                              actor.profile_path
                                ? getImageUrl(actor.profile_path, "medium", "profile")
                                : "https://via.placeholder.com/200x300?text=No+Photo"
                            }
                            alt={actor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="font-semibold text-sm">{actor.name}</p>
                        <p className="text-gray-400 text-xs">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Additional Info */}
            <div className="space-y-6">
              {/* Stats */}
              <div className="bg-gray-900/50 rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="text-gray-400 text-sm mb-1">Rating</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-2xl">★</span>
                    <span className="text-2xl font-bold">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="text-gray-400">/ 10</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    {movie.vote_count.toLocaleString()} votes
                  </p>
                </div>

                {movie.budget > 0 && (
                  <div>
                    <h3 className="text-gray-400 text-sm mb-1">Budget</h3>
                    <p className="text-lg">
                      ${(movie.budget / 1000000).toFixed(1)}M
                    </p>
                  </div>
                )}

                {movie.revenue > 0 && (
                  <div>
                    <h3 className="text-gray-400 text-sm mb-1">Revenue</h3>
                    <p className="text-lg">
                      ${(movie.revenue / 1000000).toFixed(1)}M
                    </p>
                  </div>
                )}

                {movie.status && (
                  <div>
                    <h3 className="text-gray-400 text-sm mb-1">Status</h3>
                    <p className="text-lg">{movie.status}</p>
                  </div>
                )}
              </div>

              {/* Director */}
              {director && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-2">Director</h3>
                  <p className="text-lg font-semibold">{director.name}</p>
                </div>
              )}

              {/* Writers */}
              {writers.length > 0 && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-2">Writers</h3>
                  <p className="text-lg">
                    {writers.map((w) => w.name).join(", ")}
                  </p>
                </div>
              )}

              {/* Production Companies */}
              {movie.production_companies?.length > 0 && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-2">Production</h3>
                  <div className="space-y-2">
                    {movie.production_companies.slice(0, 3).map((company) => (
                      <p key={company.id} className="text-sm">
                        {company.name}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {movie.spoken_languages?.length > 0 && (
                <div>
                  <h3 className="text-gray-400 text-sm mb-2">Available Languages</h3>
                  <p className="text-sm">
                    {movie.spoken_languages.map((lang) => lang.english_name).join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === "videos" && trailer && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Official Trailer</h2>
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0`}
                  title={trailer.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Other Videos */}
            {movie.videos?.results?.length > 1 && (
              <div>
                <h3 className="text-xl font-bold mb-4">More Videos</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {movie.videos.results
                    .filter((v) => v.key !== trailer.key)
                    .slice(0, 6)
                    .map((video) => (
                      <div
                        key={video.id}
                        className="aspect-video bg-black rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                      >
                        <img
                          src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                          alt={video.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Similar Movies Tab */}
        {activeTab === "similar" && movie.similar?.results?.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">More Like This</h2>
            <MovieList movies={movie.similar.results} />
          </div>
        )}

        {activeTab === "similar" && movie.similar?.results?.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No similar movies found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;

