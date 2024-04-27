import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { Referals, Leadboard, Boosts, Trade } from './pages'

const router = createBrowserRouter([
  {
    path: '/*',
    element: <Leadboard />
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
  },
  {
    path: '/trade',
    element: <Trade />
  }
])

function App () {
  return <RouterProvider router={router} />
}

export default App
