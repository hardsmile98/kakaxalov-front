import gameReducer from './slices/game'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    game: gameReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store
