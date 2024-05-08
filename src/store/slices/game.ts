import { createSlice } from '@reduxjs/toolkit'
import { Position, gameSettings } from 'constants/index'

const COIN_LS = 'coin'
const HELTHS_LS = 'helths'
const SCORE_LS = 'score'

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    helths: localStorage.getItem(HELTHS_LS) !== null
      ? Number(localStorage.getItem(HELTHS_LS))
      : 3,
    score: localStorage.getItem(SCORE_LS) !== null
      ? Number(localStorage.getItem(SCORE_LS))
      : 0,
    position: Position.initial,
    coin: localStorage.getItem(COIN_LS) !== null
      ? Number(localStorage.getItem(COIN_LS))
      : 0,
    coinPosition: null,
    isBomb: false,
    isExplosionVisible: false
  },
  reducers: {
    setIsBomb: (state, action) => {
      state.isBomb = action.payload
    },
    incrementCoin: (state) => {
      state.coin = state.coin + 1
      localStorage.setItem(COIN_LS, String(state.coin))

      if (state.coin === gameSettings.LIMIT_COLLECTION) {
        state.score = state.score + state.coin
        state.coin = 0

        localStorage.setItem(COIN_LS, String(state.coin))
        localStorage.setItem(SCORE_LS, String(state.score))
      }
    },
    setCoinPosition: (state, action) => {
      state.coinPosition = action.payload
    },
    caughtBomb: (state) => {
      state.isExplosionVisible = true
      state.coin = 0
      state.helths = state.helths - 1
      localStorage.setItem(HELTHS_LS, String(state.helths))
    },
    hideExplosion: (state) => {
      state.isExplosionVisible = false
    },
    setPosition: (state, action) => {
      state.position = action.payload
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
  hideExplosion
} = gameSlice.actions
