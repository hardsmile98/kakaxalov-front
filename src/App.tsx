import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { Game, Referals, Leadboard, Boosts } from './pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Game />
  },
  {
    path: '/referals',
    element: <Referals />
  },
  {
    path: '/boosts',
    element: <Boosts />
  },
  {
    path: '/leadboard',
    element: <Leadboard />
  }
])

function App () {
  return <RouterProvider router={router} />
}

export default App
