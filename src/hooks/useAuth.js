import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { setUser, clearUser } from "../store/userSlice";

/**
 * Custom hook to listen for authentication state changes
 * This hook should be called once in the App component
 * It automatically updates Redux store when user logs in/out
 */
const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Listen for auth state changes
    // This fires whenever user logs in, logs out, or on page refresh
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
        };
        
        console.log("User authenticated:", userData);
        dispatch(setUser(userData));
      } else {
        // User is signed out
        console.log("User logged out");
        dispatch(clearUser());
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuth;

