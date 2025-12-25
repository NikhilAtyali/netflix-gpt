import { Link } from "react-router-dom";
import Header from "./Header";

const Signup = () => {
  const handleSignup = (e) => {
    e.preventDefault();
    // TODO: Add Firebase signup logic
    console.log("Signup form submitted");
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
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      {/* Signup Form */}
      <div className="relative flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleSignup}
          className="w-full max-w-md mx-4 p-12 bg-black bg-opacity-75 rounded-md"
        >
          <h1 className="text-white font-bold text-3xl mb-6">Sign Up</h1>

          {/* Full Name Input */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-4 my-2 bg-gray-700 text-white rounded-md outline-none focus:bg-gray-600"
            required
          />

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
            minLength={6}
          />

          {/* Confirm Password Input */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-4 my-2 bg-gray-700 text-white rounded-md outline-none focus:bg-gray-600"
            required
            minLength={6}
          />

          {/* Error Message Placeholder */}
          <p className="text-red-600 font-bold text-sm py-2 min-h-[2rem]">
            {/* Error messages will appear here */}
          </p>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full p-4 my-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors"
          >
            Sign Up
          </button>

          {/* Terms & Conditions */}
          <p className="text-xs text-gray-400 mb-4">
            By signing up, you agree to our{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
            .
          </p>

          {/* Login Link */}
          <p className="text-gray-400 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-white hover:underline">
              Sign in now
            </Link>
          </p>

          {/* reCAPTCHA Notice */}
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

export default Signup;

