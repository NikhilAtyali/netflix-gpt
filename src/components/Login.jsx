import { Link } from "react-router-dom";
import Header from "./Header";

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Add Firebase login logic
    console.log("Login form submitted");
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

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-4 my-2 bg-gray-700 text-white rounded-md outline-none focus:bg-gray-600"
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 my-2 bg-gray-700 text-white rounded-md outline-none focus:bg-gray-600"
            required
          />

          {/* Error Message Placeholder */}
          <p className="text-red-600 font-bold text-sm py-2 min-h-[2rem]">
            {/* Error messages will appear here */}
          </p>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full p-4 my-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors"
          >
            Sign In
          </button>

          {/* Remember Me & Help */}
          <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Need help?
            </a>
          </div>

          {/* Sign Up Link */}
          <p className="text-gray-400 mt-8">
            New to Netflix?{" "}
            <Link to="/signup" className="text-white hover:underline">
              Sign up now
            </Link>
          </p>

          {/* Terms */}
          <p className="text-xs text-gray-400 mt-4">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Learn more
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
