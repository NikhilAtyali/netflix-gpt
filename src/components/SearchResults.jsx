import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { searchMulti } from "../utils/tmdbApi";
import { getImageUrl } from "../utils/constants";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      try {
        setLoading(true);
        const data = await searchMulti(query, 1);
        setResults(data.results || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleCardClick = (item) => {
    if (item.media_type === "movie" || item.media_type === "tv") {
      navigate(`/watch/${item.id}`);
    }
  };

  return (
    <div className="bg-netflix-dark min-h-screen">
      <Navbar />
      
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Search Results for &quot;{query}&quot;
          </h1>
          <p className="text-gray-400">
            {results.length} {results.length === 1 ? "result" : "results"} found
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-white text-xl">Searching...</div>
          </div>
        )}

        {/* Empty State */}
        {!loading && results.length === 0 && (
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-white mb-2">No results found</h2>
            <p className="text-gray-400 text-center max-w-md">
              We couldn&apos;t find any matches for &quot;{query}&quot;. Try different keywords.
            </p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-20">
            {results.map((item) => (
              <div
                key={`${item.id}-${item.media_type}`}
                onClick={() => handleCardClick(item)}
                className="cursor-pointer group"
              >
                <div className="relative aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden mb-2 group-hover:scale-105 transition-transform">
                  <img
                    src={
                      item.poster_path || item.profile_path
                        ? getImageUrl(
                            item.poster_path || item.profile_path,
                            "medium",
                            item.media_type === "person" ? "profile" : "poster"
                          )
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={item.title || item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
                    }}
                  />
                  
                  {/* Media Type Badge */}
                  <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded text-xs text-white capitalize">
                    {item.media_type}
                  </div>

                  {/* Rating Badge */}
                  {item.vote_average > 0 && item.media_type !== "person" && (
                    <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-yellow-400 font-bold flex items-center gap-1">
                      <span>★</span>
                      <span>{item.vote_average.toFixed(1)}</span>
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
                  {item.title || item.name}
                </h3>

                {/* Meta Info */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  {(item.release_date || item.first_air_date) && (
                    <span>
                      {new Date(item.release_date || item.first_air_date).getFullYear()}
                    </span>
                  )}
                  {item.known_for_department && (
                    <span>{item.known_for_department}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;

