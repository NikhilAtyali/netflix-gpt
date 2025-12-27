import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './components/Login';
import Signup from './components/Signup';
import Browse from './components/Browse';
import MovieDetail from './components/MovieDetail';
import SearchResults from './components/SearchResults';
import GenrePage from './components/GenrePage';
import MyList from './components/MyList';
import ProtectedRoute from './components/ProtectedRoute';
import useAuth from './hooks/useAuth';
import { selectUser } from './store/userSlice';

function App() {
  // Initialize auth listener (listens to Firebase auth changes)
  useAuth();
  
  // Get user from Redux store
  const user = useSelector(selectUser);

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
    <>
     <RouterProvider router={appRouter} />
    </>
  )
}

export default App
