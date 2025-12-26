import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Browse from './components/Browse';
import MovieDetail from './components/MovieDetail';
import SearchResults from './components/SearchResults';
import GenrePage from './components/GenrePage';
import MyList from './components/MyList';

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
      },
      {
        path: '/search',
        element: <SearchResults />
      },
      {
        path: '/genre/:genreId',
        element: <GenrePage />
      },
      {
        path: '/mylist',
        element: <MyList />
      }
])

  return (
    <>
     <RouterProvider router={appRouter} />
    </>
  )
}

export default App
