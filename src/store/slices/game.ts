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
    setInitial: (state) => {
      state = initialState
    },
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
    }
  }
})

export default gameSlice.reducer

export const {
  setInitial,
  setGameStatus,
  setPosition,
  setTimer,
  decrementTimer
} = gameSlice.actions
