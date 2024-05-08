import { createSlice } from '@reduxjs/toolkit'
import { Position } from 'constants/index'

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    helths: 3,
    score: 0,
    position: Position.initial,
    coin: 0,
    coinPosition: null,
    isBomb: false
  },
  reducers: {
    setCoin: (state, action) => {
    }
  }
})

export default gameSlice.reducer

export const {
  setCoin
} = gameSlice.actions
