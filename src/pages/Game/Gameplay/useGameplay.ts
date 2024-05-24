import { useEffect, useRef } from 'react'
import {
  gameSettings,
  type Position,
  GameStatuses
} from 'constants/index'
import { useDispatch, useSelector } from 'store'
import {
  decrementTimer,
  setGameStatus,
  setPosition,
  setTimer
} from 'store/slices/game'
import { useEndGameMutation, useGetProfileQuery, useStartGameMutation } from 'services/api'

const useGameplay = () => {
  const dispatch = useDispatch()

  const { data } = useGetProfileQuery(undefined)

  const isGameAvailable = data?.user.amountEnergy !== 0
  const gameTime = data?.user.gameTime

  const game = useSelector(state => state.game)

  const config = useRef({
    duration: gameSettings.DURATION_ANIMATION_COIN_INITIAL
  })

  const coinRef = useRef<null | HTMLImageElement>(null)

  const timerRef = useRef<null | NodeJS.Timeout>(null)

  const changePosition = (newPosition: Position) => {
    if (game.gameStatus === GameStatuses.runing) {
      dispatch(setPosition(newPosition))
    }
  }

  const [startGame, {
    data: gameData,
    isSuccess: isGameStarted,
    isLoading: isGameStarting
  }] = useStartGameMutation()

  const runGame = () => dispatch(setGameStatus(GameStatuses.started))

  useEffect(() => {
    if (game.gameStatus === GameStatuses.started) {
      void startGame(undefined)
    }
  }, [startGame, game.gameStatus])

  useEffect(() => {
    if (isGameStarted && game.gameStatus === GameStatuses.started) {
      dispatch(setTimer(gameTime))
      dispatch(setGameStatus(GameStatuses.runing))
    }
  }, [dispatch, gameTime, game.gameStatus, isGameStarted])

  // Таймер
  useEffect(() => {
    if (timerRef.current === null && game.gameStatus === GameStatuses.runing) {
      timerRef.current = setInterval(() => dispatch(decrementTimer()), 1_000)
    }
  }, [dispatch, game.gameStatus])

  // Завершать игру при окончании таймера
  useEffect(() => {
    if (game.gameTimer === 0 && game.gameStatus === GameStatuses.runing) {
      dispatch(setGameStatus(GameStatuses.finishing))

      if (timerRef.current !== null) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [dispatch, game.gameTimer, game.gameStatus])

  const [endGame, {
    isSuccess: isGameEnded
  }] = useEndGameMutation()

  useEffect(() => {
    if (isGameEnded && game.gameStatus === GameStatuses.finishing) {
      dispatch(setGameStatus(GameStatuses.notRuning))
    }
  }, [dispatch, game.gameStatus, isGameEnded])

  useEffect(() => {
    if (game.gameStatus === GameStatuses.finishing) {
      void endGame({
        id: gameData.game.id,
        hash: gameData.game.hash,
        score: 10
      })
    }
  }, [endGame, gameData, game.gameStatus])

  const isButtonLoading = isGameStarting

  return {
    game,
    config,
    isGameAvailable,

    coinRef,

    isButtonLoading,

    changePosition,
    runGame
  }
}

export default useGameplay
