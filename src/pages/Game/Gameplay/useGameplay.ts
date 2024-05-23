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
  decrementTimer,
  hideExplosion,
  incrementCoin,
  setCoinPosition,
  setIsBomb,
  setPosition,
  startGame
} from 'store/slices/game'
import { useGetProfileQuery } from 'services/api'

const useGameplay = () => {
  const dispatch = useDispatch()

  const { data } = useGetProfileQuery(undefined)

  const isGameAvailable = data?.user.amountEnergy !== 0
  const gameTime = data?.user.gameTime

  const isGame = useSelector(state => state.game.isGame)
  const gameTimer = useSelector(state => state.game.gameTimer)
  const position = useSelector(state => state.game.position)
  const coin = useSelector(state => state.game.coin)
  const coinPosition = useSelector(state => state.game.coinPosition)
  const isBomb = useSelector(state => state.game.isBomb)
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

  const gameTimerRef = useRef<null | NodeJS.Timeout>(null)

  const hideBombRef = useRef<null | NodeJS.Timeout>(null)

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
        config.current.boost !== null ? 500 : gameSettings.MIN_DURATION_ANIMATION_COIN - (config.current.coin * 20),
        config.current.boost !== null ? 800 : gameSettings.MAX_DURATION_ANIMATION_COIN - (config.current.coin * 20)
      )
    }

    const randomIndex = randomInteger(0, positionArray.length - 1)

    dispatch(setCoinPosition(positionArray[randomIndex]))
  }, [dispatch])

  useEffect(() => {
    if (timeoutRef.current === null && coinPosition === null && isGame) {
      timeoutRef.current = setTimeout(
        () => generateCoin(),
        randomInteger(
          config.current.boost !== null ? 800 : gameSettings.MIN_DELAY_NEW_COIN - (config.current.coin * 75),
          config.current.boost !== null ? 1_000 : gameSettings.MAX_DELAY_NEW_COIN - (config.current.coin * 75)
        )
      )
    }
  }, [generateCoin, isGame, coinPosition])

  useEffect(() => {
    if (isGame && gameTimerRef.current === null) {
      gameTimerRef.current = setInterval(() => {
        dispatch(decrementTimer())
      }, 1_000)
    }
  }, [dispatch, isGame])

  useEffect(() => {
    if (gameTimer <= 0 && gameTimerRef.current !== null) {
      clearInterval(gameTimerRef.current)
      // end game
    }
  }, [gameTimer])

  useEffect(() => {
    if (coinRef.current !== null) {
      coinRef.current.addEventListener('animationend', check, false)
    }

    return () => {
      dispatch(setPosition(Position.initial))

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }

      if (hideBombRef.current !== null) {
        clearTimeout(hideBombRef.current)
      }

      if (gameTimerRef.current !== null) {
        clearInterval(gameTimerRef.current)
      }
    }
  }, [dispatch, check])

  const changePosition = (newPosition: Position) => {
    if (isGame) {
      dispatch(setPosition(newPosition))
    }
  }

  const start = () => dispatch(startGame(gameTime))

  return {
    config,
    coinPosition,
    coinRef,
    position,
    changePosition,
    start,
    coin,
    isBomb,
    isExplosionVisible,
    boost,

    isGame,
    isGameAvailable
  }
}

export default useGameplay
