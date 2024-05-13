import { useCallback, useEffect, useRef, useState } from 'react'
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
  setBoost,
  setCoinPosition,
  setIsBomb,
  setPosition
} from 'store/slices/game'

const useGameplay = () => {
  const dispatch = useDispatch()

  const [boostTime, setBoostTime] = useState<null | number>(null)

  const position = useSelector(state => state.game.position)
  const coin = useSelector(state => state.game.coin)
  const coinPosition = useSelector(state => state.game.coinPosition)
  const isBomb = useSelector(state => state.game.isBomb)
  const helths = useSelector(state => state.game.helths)
  const boost = useSelector(state => state.game.boost)
  const isExplosionVisible = useSelector(state => state.game.isExplosionVisible)

  const config = useRef({
    duration: gameSettings.INITIAL_DURATION_ANIMATION_COIN,
    coinPosition,
    position,
    isBomb,
    boost,
    coin
  })

  const coinRef = useRef<null | HTMLImageElement>(null)

  config.current = {
    ...config.current,
    coinPosition,
    position,
    isBomb,
    boost,
    coin
  }

  const timeoutRef = useRef<null | NodeJS.Timeout>(null)

  const hideBombRef = useRef<null | NodeJS.Timeout>(null)

  const boostTimerRef = useRef<null | NodeJS.Timeout>(null)

  const check = useCallback(() => {
    if (config.current.boost !== null) {
      dispatch(incrementCoin())
    } else if (config.current.position === config.current.coinPosition) {
      if (config.current.isBomb) {
        dispatch(caughtBomb())

        hideBombRef.current = setTimeout(() => {
          dispatch(hideExplosion())
        }, gameSettings.DURATION_ANIMATION_EXPLOSION)
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
    let isBomb = false

    if (config.current.boost === null) {
      isBomb = randomInteger(0, 10) < gameSettings.BOMB_DROP_CHANCE * 10
    }

    dispatch(setIsBomb(isBomb))

    config.current = {
      ...config.current,
      duration: randomInteger(
        config.current.boost !== null ? 500 : gameSettings.MIN_DURATION_ANIMATION_COIN - (config.current.coin * 5),
        config.current.boost !== null ? 800 : gameSettings.MAX_DURATION_ANIMATION_COIN - (config.current.coin * 5)
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
          config.current.boost !== null ? 800 : gameSettings.MIN_DELAY_NEW_COIN - (config.current.coin * 15),
          config.current.boost !== null ? 1_000 : gameSettings.MAX_DELAY_NEW_COIN - (config.current.coin * 15)
        )
      )
    }
  }, [generateCoin, coinPosition])

  useEffect(() => {
    if (boost !== null) {
      setBoostTime(30)

      boostTimerRef.current = setInterval(() => setBoostTime((prev) => prev !== null && prev > 0 ? prev - 1 : 0), 1_000)
    }
  }, [boost])

  const disableBoost = useCallback(() => {
    if (boostTimerRef.current !== null) {
      clearInterval(boostTimerRef.current)
    }

    setBoostTime(null)

    dispatch(setBoost(null))
  }, [dispatch])

  useEffect(() => {
    if (boost !== null && boostTime === 0) {
      disableBoost()
    }
  }, [boost, boostTime, disableBoost])

  useEffect(() => {
    if (coinRef.current !== null) {
      coinRef.current.addEventListener('animationend', check, false)
    }

    return () => {
      dispatch(setPosition(Position.initial))
      dispatch(setBoost(null))

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }

      if (hideBombRef.current !== null) {
        clearTimeout(hideBombRef.current)
      }

      if (boostTimerRef.current !== null) {
        clearInterval(boostTimerRef.current)
      }
    }
  }, [dispatch, check])

  const changePosition = (newPosition: Position) => {
    if (helths > 0 && boost === null) {
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
    isExplosionVisible,
    boost,
    boostTime
  }
}

export default useGameplay
