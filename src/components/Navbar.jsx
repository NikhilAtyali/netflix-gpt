import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { selectUser } from "../store/userSlice";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-sm" : "bg-gradient-to-b to-transparent"
      }`}
      style={{
        backgroundColor: isScrolled ? 'rgba(9, 12, 19, 0.95)' : undefined,
        backgroundImage: !isScrolled ? 'linear-gradient(to bottom, rgb(9 12 19), transparent)' : undefined
      }}
    >
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left Section - Logo & Navigation */}
        <div className="flex items-center space-x-8">
          {/* Netflix Logo */}
          <Link to="/">
            <img
              src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
              alt="Netflix"
              className="h-8 w-auto cursor-pointer"
            />
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-6 text-sm">
            <li>
              <Link
                to="/"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Home
              </Link>
            </li>
            
            {/* Genres Dropdown */}
            <li className="relative group">
              <button className="text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-1">
                Genres
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="hidden group-hover:block absolute top-full left-0 pt-2 z-50">
                <div className="bg-netflix-dark-card bg-opacity-98 border border-gray-600 rounded-md py-2 w-48 shadow-xl">
                <Link to="/genre/28" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                  Action
                </Link>
                <Link to="/genre/35" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                  Comedy
                </Link>
                <Link to="/genre/18" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                  Drama
                </Link>
                <Link to="/genre/27" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                  Horror
                </Link>
                <Link to="/genre/10749" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                  Romance
                </Link>
                <Link to="/genre/878" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                  Sci-Fi
                </Link>
                <Link to="/genre/53" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                  Thriller
                </Link>
                <Link to="/genre/16" className="block px-4 py-2 text-sm text-white hover:bg-gray-700">
                  Animation
                </Link>
                </div>
              </div>
            </li>
            
            <li>
              <Link
                to="/new"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                New & Popular
              </Link>
            </li>
            <li>
              <Link
                to="/mylist"
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                My List
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section - Search, Notifications, Profile */}
        <div className="flex items-center space-x-6">
          {/* Search */}
          <div className="relative">
            <div className={`flex items-center transition-all duration-300 ${
              searchOpen ? "w-64 bg-netflix-dark-lighter border border-gray-600" : "w-auto"
            }`}>
              {searchOpen && (
                <form onSubmit={handleSearch} className="flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies, TV shows..."
                    className="w-full bg-transparent text-white px-4 py-2 outline-none text-sm"
                    autoFocus
                  />
                </form>
              )}
              <button
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  if (searchOpen) {
                    setSearchQuery("");
                  }
                }}
                className="text-white hover:text-gray-300 p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={searchOpen ? "M6 18L18 6M6 6l12 12" : "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"}
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Kids Link */}
          <Link
            to="/kids"
            className="hidden md:block text-white hover:text-gray-300 text-sm"
          >
            Kids
          </Link>

          {/* Notification Bell */}
          <button className="text-white hover:text-gray-300 relative">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {/* Notification Dot */}
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2 cursor-pointer group">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
              alt="Profile"
              className="w-8 h-8 rounded"
            />
            <svg
              className="w-4 h-4 text-white group-hover:rotate-180 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>

            {/* Dropdown Menu (Hidden by default) */}
            <div className="hidden group-hover:block absolute top-[52px] right-8 bg-black bg-opacity-90 border border-gray-700 rounded-sm py-2 w-48">
              {/* User Info */}
              {user && (
                <>
                  <div className="px-4 py-2 text-sm">
                    <p className="text-white font-semibold">{user.displayName || "User"}</p>
                    <p className="text-gray-400 text-xs truncate">{user.email}</p>
                  </div>
                  <hr className="border-gray-700 my-2" />
                </>
              )}
              <Link
                to="/account"
                className="block px-4 py-2 text-sm text-white hover:underline"
              >
                Account
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-white hover:underline"
              >
                Settings
              </Link>
              <hr className="border-gray-700 my-2" />
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-white hover:underline"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

