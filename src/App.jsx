import { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Login = lazy(()=> import('./components/Login'))
const Signup = lazy(()=> import('./components/Signup'))
const Browse = lazy(()=> import('./components/Browse'))
const MovieDetail = lazy(()=> import('./components/MovieDetail'))
const SearchResults = lazy(()=> import('./components/SearchResults'))
const GenrePage = lazy(()=> import('./components/GenrePage'))
const MyList = lazy(()=> import('./components/MyList'))
const ProtectedRoute = lazy(()=> import('./components/ProtectedRoute'))
import useAuth from './hooks/useAuth';
import { selectUser } from './store/userSlice';
import { selectTheme } from './store/themeSlice';

// Loading component
const PageLoader = () => {
  const theme = useSelector(selectTheme);
  return (
    <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-netflix-dark' : 'bg-light-bg'}`}>
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );
};

function App() {
  // Initialize auth listener (listens to Firebase auth changes)
  useAuth();
  
  // Get user and theme from Redux store
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);

  // Apply theme class to document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

const appRouter = createBrowserRouter([
      {
        path : '/',
        element : user ? <Navigate to="/browse" replace /> : <Navigate to="/login" replace />
      },
      {
        path: '/login',
        element: user ? <Navigate to="/browse" replace /> : <Login />
      },
      {
        path: '/signup',
        element: user ? <Navigate to="/browse" replace /> : <Signup />
      },
      {
        path: '/browse',
        element: <ProtectedRoute><Browse /></ProtectedRoute>
      },
      {
        path: '/watch/:movieId',
        element: <ProtectedRoute><MovieDetail /></ProtectedRoute>
      },
      {
        path: '/search',
        element: <ProtectedRoute><SearchResults /></ProtectedRoute>
      },
      {
        path: '/genre/:genreId',
        element: <ProtectedRoute><GenrePage /></ProtectedRoute>
      },
      {
        path: '/mylist',
        element: <ProtectedRoute><MyList /></ProtectedRoute>
      }
])

  return (
    <Suspense fallback={<PageLoader />}>
     <RouterProvider router={appRouter} />
    </Suspense>
  )
}

export default App
