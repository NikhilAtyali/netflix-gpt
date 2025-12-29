import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInAnonymously } from "firebase/auth";
import { auth } from "../utils/firebase";
import { validateLoginForm, getFirebaseErrorMessage } from "../utils/validation";
import Header from "./Header";

// Guest credentials (demo account)
const GUEST_EMAIL = "guest@netflixgpt.com";
const GUEST_PASSWORD = "Guest@123";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateLoginForm(email, password);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Sign in with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      
      // Navigate to browse page (useAuth will handle Redux)
      navigate("/browse");
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: getFirebaseErrorMessage(error.code) });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrors({});

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/browse");
    } catch (error) {
      console.error("Google sign-in error:", error);
      setErrors({ general: getFirebaseErrorMessage(error.code) });
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    setErrors({});

    try {
      // Directly use anonymous sign-in for guest access
      await signInAnonymously(auth);
      navigate("/browse");
    } catch (error) {
      // Provide specific error messages
      let errorMessage = "Unable to login as guest. ";
      if (error.code === 'auth/operation-not-allowed' || error.code === 'auth/admin-restricted-operation') {
        errorMessage += "Anonymous authentication is not enabled. Please enable it in Firebase Console.";
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage += "Network error. Please check your connection.";
      } else {
        errorMessage += error.message || 'Please try again.';
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen">
      <Header />
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/aa9edac4-a0e6-4f12-896e-32c518daec62/web/IN-en-20241223-TRIFECTA-perspective_1502c512-be5f-4f14-b21a-e3d75fe159ab_large.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-opacity-60" style={{ backgroundColor: 'rgb(9 12 19)' }} />
      </div>

      {/* Login Form */}
      <div className="relative flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md mx-4 p-12 bg-netflix-dark bg-opacity-95 rounded-md backdrop-blur-sm"
        >
          <h1 className="text-white font-bold text-3xl mb-6">Sign In</h1>

          {/* General Error */}
          {errors.general && (
            <div className="bg-red-600 text-white p-3 rounded mb-4 text-sm">
              {errors.general}
            </div>
          )}

          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-4 bg-gray-700 text-white rounded-md outline-none focus:bg-gray-600 ${
                errors.email ? "border-2 border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-4 bg-gray-700 text-white rounded-md outline-none focus:bg-gray-600 ${
                errors.password ? "border-2 border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-4 my-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={`w-full p-4 bg-white text-gray-800 rounded-md font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>

          {/* Guest Login */}
          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={loading}
            className={`w-full p-4 mt-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-md transition-colors flex items-center justify-center gap-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Continue as Guest
          </button>

          {/* Sign Up Link */}
          <div className="text-gray-400 mt-6">
            New to Netflix?{" "}
            <Link to="/signup" className="text-white hover:underline">
              Sign up now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
