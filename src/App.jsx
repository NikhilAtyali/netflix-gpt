import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Browse from './components/Browse';
import MovieDetail from './components/MovieDetail';

function App() {
const appRouter = createBrowserRouter([
      {
        path : '/',
        element : <Browse />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/watch/:movieId',
        element: <MovieDetail />
      }
])

  return (
    <>
     <RouterProvider router={appRouter} />
    </>
  )
}

export default App
