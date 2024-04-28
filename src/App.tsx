import {
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom'
import { Game, Referals, Leadboard, Boosts, Trade } from './pages'
import { useTelegram } from 'hooks'
import { useEffect } from 'react'

function App () {
  const tg = useTelegram()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    tg.expand()
    tg.backgroundColor = '#150801'
    tg.headerColor = '#150801'
  }, [])

  useEffect(() => {
    if (pathname !== '/') {
      tg.BackButton.show()
      tg.BackButton.onClick(() => navigate(-1))
    }
  }, [navigate, tg, pathname])

  return <Routes>
    <Route path='/*' element={<Game />} />
    <Route path='/referals' element={<Referals />} />
    <Route path='/leadboard' element={<Leadboard />} />
    <Route path='/boosts' element={<Boosts />} />
    <Route path='/trade' element={<Trade />} />
  </Routes>
}

export default App
