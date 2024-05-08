import {
  type TypedUseSelectorHook,
  useDispatch as useDispatchTyped,
  useSelector as useSelectorTyped
} from 'react-redux'
import gameReducer from './slices/game'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    game: gameReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

const useDispatch: () => AppDispatch = useDispatchTyped
const useSelector: TypedUseSelectorHook<RootState> = useSelectorTyped

export {
  useDispatch,
  useSelector
}
