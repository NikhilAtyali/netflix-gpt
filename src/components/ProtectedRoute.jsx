import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectLoading } from "../store/userSlice";

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);

  // Show loading screen while checking authentication status
  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoute;

