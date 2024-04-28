import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { Game, Referals, Leadboard, Boosts, Trade } from './pages'
import { useTelegram } from 'hooks'
import { useEffect } from 'react'

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
  const tg = useTelegram()

  useEffect(() => {
    tg.expand()
    tg.backgroundColor = '#150801'
    tg.headerColor = '#150801'
  }, [])

  return <RouterProvider router={router} />
}

export default App
