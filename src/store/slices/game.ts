import { createSlice } from '@reduxjs/toolkit'
import { Position } from 'constants/index'

const initialState = {
  gameTimer: 0,
  isGame: false,
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
    setIsBomb: (state, action) => {
      state.isBomb = action.payload
    },
    incrementCoin: (state) => {
      state.coin = state.coin + 1
    },
    decrementTimer: (state) => {
      state.gameTimer = state.gameTimer - 1
    },
    setCoinPosition: (state, action) => {
      state.coinPosition = action.payload
    },
    caughtBomb: (state) => {
      state.isExplosionVisible = true
    },
    hideExplosion: (state) => {
      state.isExplosionVisible = false
    },
    setPosition: (state, action) => {
      state.position = action.payload
    },
    setBoost: (state, action) => {
      state.boost = action.payload
    },
    startGame: (state, action) => {
      state.isGame = true
      state.gameTimer = action.payload
    }
  }
})

export default gameSlice.reducer

export const {
  setIsBomb,
  caughtBomb,
  incrementCoin,
  setPosition,
  setCoinPosition,
  hideExplosion,
  setBoost,
  startGame,
  decrementTimer
} = gameSlice.actions
