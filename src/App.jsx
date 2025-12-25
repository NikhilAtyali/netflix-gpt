import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Login from './components/Login';
import Browse from './components/Browse';

function App() {
const appRouter = createBrowserRouter([
      {
        path : '/',
        element : <Browse />
      },
      // Login disabled for now
      // {
      //   path: '/login',
      //   element: <Login/>
      // }
])

  return (
    <>
     <RouterProvider router={appRouter} />
    </>
  )
}

export default App
