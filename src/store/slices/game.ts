import { createSlice } from '@reduxjs/toolkit';
import { Position, GameStatuses } from 'constants/index';

const initialState = {
  gameTimer: 0,
  gameTime: 0,
  gameStatus: GameStatuses.notRuning,
  boost: null,
  boostId: null,
  position: Position.initial,
  coin: 0,
  coinPosition: null,
  isBomb: false,
  isExplosionVisible: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setInitial: () => initialState,
    setGameStatus: (state, action) => {
      state.gameStatus = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
    setTimer: (state, action) => {
      state.gameTime = action.payload;
      state.gameTimer = action.payload;
    },
    decrementTimer: (state) => {
      state.gameTimer = state.gameTimer > 0
        ? state.gameTimer - 1
        : 0;
    },
    setIsBomb: (state, action) => {
      state.isBomb = action.payload;
    },
    setCoinPosition: (state, action) => {
      state.coinPosition = action.payload;
    },
    incrementCoin: (state, action) => {
      state.coin = state.coin + 1 + action.payload.bonus;
    },
    hideExplosion: (state) => {
      state.isExplosionVisible = false;
    },
    caughtBomb: (state) => {
      state.isExplosionVisible = true;
    },
    startBoost: (state, action) => {
      state.boost = action.payload.slug;
      state.boostId = action.payload.id;
      state.gameStatus = GameStatuses.started;
    },
  },
});

export default gameSlice.reducer;

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
  caughtBomb,
  startBoost,
} = gameSlice.actions;
