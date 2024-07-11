import { createSlice } from '@reduxjs/toolkit';

interface IState {
  laguage: 'ru' | 'en'
}

const initialState = {
  laguage: window.localStorage.getItem('lang') || 'ru',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState as IState,
  reducers: {
    setLaguage: (state, action) => {
      state.laguage = action.payload;
      window.localStorage.setItem('lang', action.payload);
    },
  },
});

export default settingsSlice.reducer;

export const {
  setLaguage,
} = settingsSlice.actions;
