import { useEffect } from 'react'

const tg = window.Telegram.WebApp

const useTelegram = () => {
  useEffect(() => {
    tg.backgroundColor = '#150801'
    tg.headerColor = '#150801'
  }, [])

  return {
    tg
  }
}

export default useTelegram
