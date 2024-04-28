import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { Game, Referals, Leadboard, Boosts, Trade } from './pages'
import { useTelegram } from 'hooks'

const router = createBrowserRouter([
  {
    path: '/*',
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
  },
  {
    path: '/trade',
    element: <Trade />
  }
])

function App () {
  useTelegram()

  return <RouterProvider router={router} />
}

export default App
