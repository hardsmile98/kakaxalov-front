import { createSlice } from '@reduxjs/toolkit'
import { Position, GameStatuses } from 'constants/index'

const initialState = {
  gameTimer: 0,
  gameStatus: GameStatuses.notRuning,
  boost: null,
  position: Position.initial,
  coin: 0,
  coinPosition: null,
  isBomb: false,
  isExplosionVisible: false
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setInitial: () => initialState,
    setGameStatus: (state, action) => {
      state.gameStatus = action.payload
    },
    setPosition: (state, action) => {
      state.position = action.payload
    },
    setTimer: (state, action) => {
      state.gameTimer = action.payload
    },
    decrementTimer: (state) => {
      state.gameTimer = state.gameTimer > 0
        ? state.gameTimer - 1
        : 0
    },
    setIsBomb: (state, action) => {
      state.isBomb = action.payload
    },
    setCoinPosition: (state, action) => {
      state.coinPosition = action.payload
    },
    incrementCoin: (state) => {
      state.coin = state.coin + 1
    },
    hideExplosion: (state) => {
      state.isExplosionVisible = false
    },
    caughtBomb: (state) => {
      state.isExplosionVisible = true
    }
  }
})

export default gameSlice.reducer

export const {
  setInitial,
  setGameStatus,
  setPosition,
  setTimer,
  decrementTimer,
  setIsBomb,
  setCoinPosition,
  incrementCoin,
  hideExplosion,
  caughtBomb
} = gameSlice.actions
