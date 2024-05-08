import { useCallback, useEffect, useRef, useState } from 'react'
import { Position, positionArray, gameSettings } from 'constants/index'
import { randomInteger } from 'helpers/index'

const useGameplay = () => {
  const [position, setPosition] = useState(Position.initial)
  const [coin, setCoin] = useState(0)
  const [coinPosition, setCoinPosition] = useState<null | Position>(null)
  const [isBomb, setIsBomb] = useState(false)

  const config = useRef({
    duration: gameSettings.INITIAL_DURATION_ANIMATION_COIN,
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
      duration: randomInteger(
        gameSettings.MIN_DURATION_ANIMATION_COIN,
        gameSettings.MAX_DURATION_ANIMATION_COIN
      )
    }

    setIsBomb(randomInteger(0, 10) < gameSettings.BOMB_DROP_CHANCE * 10)

    const randomIndex = randomInteger(0, positionArray.length - 1)

    setCoinPosition(positionArray[randomIndex])
  }, [])

  useEffect(() => {
    if (timeoutRef.current === null && coinPosition === null) {
      timeoutRef.current = setTimeout(
        () => generateCoin(),
        randomInteger(
          gameSettings.MIN_DELAY_NEW_COIN,
          gameSettings.MAX_DELAY_NEW_COIN
        )
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
