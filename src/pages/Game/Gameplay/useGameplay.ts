import { useCallback, useEffect, useRef, useState } from 'react'
import { Position, positionArray } from 'constants/index'
import { randomInteger } from 'helpers/index'

const COIN_LS = 'coin'

const useGameplay = () => {
  const [position, setPosition] = useState(Position.initial)
  const [coin, setCoin] = useState(localStorage.getItem(COIN_LS) ?? 0)
  const [coinPosition, setCoinPosition] = useState<null | Position>(null)
  const [isBomb, setIsBomb] = useState(false)

  const config = useRef({
    duration: 2,
    coinPosition,
    position,
    isBomb
  })

  const coinRef = useRef<null | HTMLImageElement>(null)

  config.current = {
    ...config.current,
    coinPosition,
    position,
    isBomb
  }

  const timeoutRef = useRef<null | NodeJS.Timeout>(null)

  useEffect(() => {
    localStorage.setItem(COIN_LS, String(coin))
  }, [coin])

  const check = () => {
    if (config.current.position === config.current.coinPosition) {
      if (config.current.isBomb) {
        console.log('BOMB!')
      } else {
        setCoin(prev => +prev + 1)
      }
    }

    setCoinPosition(null)

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const generateCoin = useCallback(() => {
    config.current = {
      ...config.current,
      duration: randomInteger(1_000, 1_800)
    }

    setIsBomb(randomInteger(0, 10) < 3)

    const randomIndex = randomInteger(0, positionArray.length - 1)

    setCoinPosition(positionArray[randomIndex])
  }, [])

  useEffect(() => {
    if (timeoutRef.current === null && coinPosition === null) {
      timeoutRef.current = setTimeout(
        () => generateCoin(),
        randomInteger(1_500, 4_000)
      )
    }
  }, [generateCoin, coinPosition])

  useEffect(() => {
    if (coinRef.current !== null) {
      coinRef.current.addEventListener('animationend', check, false)
    }

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    config,
    coinPosition,
    coinRef,
    position,
    setPosition,
    coin,
    isBomb
  }
}

export default useGameplay
