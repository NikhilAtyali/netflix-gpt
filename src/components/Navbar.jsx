import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { selectUser } from "../store/userSlice";
import { selectTheme, toggleTheme } from "../store/themeSlice";
import useDebounce from "../hooks/useDebounce";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  useEffect(() => {
    if (debouncedSearch.length >= 3) {
      // Only navigate if query is different from current
      const currentQuery = new URLSearchParams(window.location.search).get('q');
      if (currentQuery !== debouncedSearch) {
        navigate(`/search?q=${encodeURIComponent(debouncedSearch)}`);
      }
    }
  }, [debouncedSearch, navigate])
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
    // Allow immediate search on Enter key (bypasses debounce)
    if (searchQuery.trim() && searchQuery.length >= 3) {
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

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-sm" : "bg-gradient-to-b to-transparent"
      } ${theme === 'dark' ? '' : 'dark:bg-transparent'}`}
      style={{
        backgroundColor: isScrolled 
          ? (theme === 'dark' ? 'rgba(9, 12, 19, 0.95)' : 'rgba(248, 250, 252, 0.95)') 
          : undefined,
        backgroundImage: !isScrolled 
          ? (theme === 'dark' 
            ? 'linear-gradient(to bottom, rgb(9 12 19), transparent)' 
            : 'linear-gradient(to bottom, rgb(248 250 252), transparent)')
          : undefined
      }}
    >
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Left Section - Logo & Navigation */}
        <div className="flex items-center space-x-8">
          {/* Netflix Logo */}
          <Link to="/">
            <img
              src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png"
              alt="NetflixGPT"
              className="h-[5.5rem] w-auto cursor-pointer hover:scale-105 transition-transform duration-200"
              style={{ height: '5.5rem' }}
              onError={(e) => {
                e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg';
              }}
            />
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-6 text-sm">
            <li>
              <Link
                to="/"
                className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} transition-colors`}
              >
                Home
              </Link>
            </li>
            
            {/* Genres Dropdown */}
            <li className="relative group">
              <button className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} transition-colors flex items-center gap-1`}>
                Genres
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="hidden group-hover:block absolute top-full left-0 pt-2 z-50">
                <div className={`${theme === 'dark' ? 'bg-netflix-dark-card' : 'bg-white'} bg-opacity-98 border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded-md py-2 w-48 shadow-xl`}>
                <Link to="/genre/28" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}`}>
                  Action
                </Link>
                <Link to="/genre/35" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}`}>
                  Comedy
                </Link>
                <Link to="/genre/18" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}`}>
                  Drama
                </Link>
                <Link to="/genre/27" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}`}>
                  Horror
                </Link>
                <Link to="/genre/10749" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}`}>
                  Romance
                </Link>
                <Link to="/genre/878" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}`}>
                  Sci-Fi
                </Link>
                <Link to="/genre/53" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}`}>
                  Thriller
                </Link>
                <Link to="/genre/16" className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}`}>
                  Animation
                </Link>
                </div>
              </div>
            </li>
            
            <li>
              <Link
                to="/new"
                className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} transition-colors`}
              >
                New & Popular
              </Link>
            </li>
            <li>
              <Link
                to="/mylist"
                className={`${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} transition-colors`}
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
              searchOpen 
                ? `w-64 ${theme === 'dark' ? 'bg-netflix-dark-lighter border-gray-600' : 'bg-white border-gray-300'} border` 
                : "w-auto"
            }`}>
              {searchOpen && (
                <form onSubmit={handleSearch} className="flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies, TV shows..."
                    className={`w-full bg-transparent ${theme === 'dark' ? 'text-white' : 'text-gray-800'} px-4 py-2 outline-none text-sm`}
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
                className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} p-2`}
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

          {/* Theme Toggle Button */}
          <button
            onClick={handleThemeToggle}
            className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} transition-colors p-2 rounded-full hover:bg-gray-700 hover:bg-opacity-20`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              // Sun icon for light mode
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              // Moon icon for dark mode
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Kids Link */}
          <Link
            to="/kids"
            className={`hidden md:block ${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} text-sm`}
          >
            Kids
          </Link>

          {/* Notification Bell */}
          <button className={`${theme === 'dark' ? 'text-white hover:text-gray-300' : 'text-gray-800 hover:text-gray-600'} relative`}>
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
            <div className={`hidden group-hover:block absolute top-[52px] right-8 ${theme === 'dark' ? 'bg-black' : 'bg-white'} bg-opacity-90 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} rounded-sm py-2 w-48`}>
              {/* User Info */}
              {user && (
                <>
                  <div className="px-4 py-2 text-sm">
                    <p className={`${theme === 'dark' ? 'text-white' : 'text-gray-800'} font-semibold`}>{user.displayName || "User"}</p>
                    <p className="text-gray-400 text-xs truncate">{user.email}</p>
                  </div>
                  <hr className={`${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} my-2`} />
                </>
              )}
              <Link
                to="/account"
                className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-800'} hover:underline`}
              >
                Account
              </Link>
              <Link
                to="/settings"
                className={`block px-4 py-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-800'} hover:underline`}
              >
                Settings
              </Link>
              <hr className={`${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} my-2`} />
              <button
                onClick={handleLogout}
                className={`block w-full text-left px-4 py-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-800'} hover:underline`}
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

