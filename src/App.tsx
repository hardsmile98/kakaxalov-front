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
  Earn
} from './pages'
import { useTelegram } from 'hooks'
import { useEffect } from 'react'
import { useGetProfileQuery } from './services'
import { PageLoader } from 'components'

function App () {
  const tg = useTelegram()

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { isLoading: isGetProfileLoading } = useGetProfileQuery(undefined)

  const isLoading = isGetProfileLoading

  useEffect(() => {
    tg.expand()
    tg.backgroundColor = '#150801'
    tg.headerColor = '#150801'

    const tgInitData = 'query_id=AAHkvS4sAgAAAOS9LixFYU1F&user=%7B%22id%22%3A5036228068%2C%22first_name%22%3A%22Denis%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22deniskotelev%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1715626450&hash=4bab21f94b38bbfa79692df9fac67f84daf63a66bb66badbf3063675d0f2c4dd'
    window.localStorage.setItem('tgData', tgInitData)
  }, [tg])

  useEffect(() => {
    if (pathname !== '/') {
      tg.BackButton.show()
      tg.BackButton.onClick(() => navigate(-1))
    } else {
      tg.BackButton.hide()
    }
  }, [tg, navigate, pathname])

  if (isLoading) {
    return <PageLoader />
  }

  return <Routes>
    <Route path='/*' element={<Game />} />
    <Route path='/referals' element={<Referals />} />
    <Route path='/leadboard' element={<Leadboard />} />
    <Route path='/boosts' element={<Boosts />} />
    <Route path='/earn' element={<Earn />} />
  </Routes>
}

export default App
