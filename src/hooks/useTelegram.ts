import { useEffect } from 'react'

const tg = window.Telegram.WebApp

const useTelegram = () => {
  useEffect(() => {
    tg.BackButton.isVisible = true
  }, [])

  return {
    tg
  }
}

export default useTelegram
