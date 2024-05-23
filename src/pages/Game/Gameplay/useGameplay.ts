import { useRef } from 'react'
import {
  gameSettings,
  type Position,
  GameStatuses
} from 'constants/index'
import { useDispatch, useSelector } from 'store'
import {
  setPosition
} from 'store/slices/game'
import { useGetProfileQuery } from 'services/api'

const useGameplay = () => {
  const dispatch = useDispatch()

  const { data } = useGetProfileQuery(undefined)

  const isGameAvailable = data?.user.amountEnergy !== 0

  const gameStatus = useSelector(state => state.game.gameStatus)
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

  const changePosition = (newPosition: Position) => {
    if (gameStatus === GameStatuses.runing) {
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
    gameStatus,
    isGameAvailable,
    gameTimer
  }
}

export default useGameplay
