import { createSlice } from '@reduxjs/toolkit'

const gameSlice = createSlice({
  name: 'game',
  initialState: {

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
