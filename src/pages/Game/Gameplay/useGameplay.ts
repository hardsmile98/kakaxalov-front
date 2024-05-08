import { useCallback, useEffect, useRef } from 'react'
import {
  positionArray,
  gameSettings,
  Position
} from 'constants/index'
import { randomInteger } from 'helpers/index'
import { useDispatch, useSelector } from 'store'
import {
  caughtBomb,
  hideExplosion,
  incrementCoin,
  setCoinPosition,
  setIsBomb,
  setPosition
} from 'store/slices/game'

const useGameplay = () => {
  const dispatch = useDispatch()

  const position = useSelector(state => state.game.position)
  const coin = useSelector(state => state.game.coin)
  const coinPosition = useSelector(state => state.game.coinPosition)
  const isBomb = useSelector(state => state.game.isBomb)
  const helths = useSelector(state => state.game.helths)
  const isExplosionVisible = useSelector(state => state.game.isExplosionVisible)

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

  const check = useCallback(() => {
    if (config.current.position === config.current.coinPosition) {
      if (config.current.isBomb) {
        dispatch(caughtBomb())

        setTimeout(() =>
          dispatch(hideExplosion()),
        gameSettings.DURATION_ANIMATION_EXPLOSION)
      } else {
        dispatch(incrementCoin())
      }
    }

    dispatch(setCoinPosition(null))

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [dispatch])

  const generateCoin = useCallback(() => {
    const isBomb = randomInteger(0, 10) < gameSettings.BOMB_DROP_CHANCE * 10

    dispatch(setIsBomb(isBomb))

    config.current = {
      ...config.current,
      duration: randomInteger(
        gameSettings.MIN_DURATION_ANIMATION_COIN,
        gameSettings.MAX_DURATION_ANIMATION_COIN
      )
    }

    const randomIndex = randomInteger(0, positionArray.length - 1)

    dispatch(setCoinPosition(positionArray[randomIndex]))
  }, [dispatch])

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
  }, [check])

  useEffect(() => {
    if (helths === 0) {
      dispatch(setPosition(Position.initial))
    }
  }, [dispatch, helths])

  const changePosition = (newPosition: Position) => {
    if (helths > 0) {
      dispatch(setPosition(newPosition))
    }
  }

  return {
    config,
    coinPosition,
    coinRef,
    position,
    changePosition,
    coin,
    isBomb,
    isExplosionVisible
  }
}

export default useGameplay
