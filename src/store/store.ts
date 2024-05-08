import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './slices/game'

const store = configureStore({
  reducer: {
    game: gameReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store
