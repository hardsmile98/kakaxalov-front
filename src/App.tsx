import {
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom'
import {
  Game,
  Referals,
  Leadboard,
  Boosts,
  Trade,
  OpenOnMobile
} from './pages'
import { useTelegram } from 'hooks'
import { useEffect } from 'react'

function App () {
  const tg = useTelegram()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  console.log(tg.ready())

  useEffect(() => {
    tg.expand()
    tg.backgroundColor = '#150801'
    tg.headerColor = '#150801'
  }, [tg])

  useEffect(() => {
    if (pathname !== '/') {
      tg.BackButton.show()
      tg.BackButton.onClick(() => navigate(-1))
    } else {
      tg.BackButton.hide()
    }
  }, [tg, navigate, pathname])

  if (tg.ready() === undefined) {
    return <OpenOnMobile />
  }

  return <Routes>
    <Route path='/*' element={<Game />} />
    <Route path='/referals' element={<Referals />} />
    <Route path='/leadboard' element={<Leadboard />} />
    <Route path='/boosts' element={<Boosts />} />
    <Route path='/trade' element={<Trade />} />
  </Routes>
}

export default App
