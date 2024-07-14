import { createSlice } from '@reduxjs/toolkit';

interface IState {
  laguage: 'ru' | 'en'
  isWelcomeModalOpened: boolean
}

const initialState = {
  laguage: window.localStorage.getItem('lang') || 'ru',
  isWelcomeModalOpened: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState as IState,
  reducers: {
    setLaguage: (state, action) => {
      state.laguage = action.payload;
      window.localStorage.setItem('lang', action.payload);
    },

    setWelcomeModalOpened: (state, action) => {
      state.isWelcomeModalOpened = action.payload;
    },
  },
});

export default settingsSlice.reducer;

export const {
  setLaguage,
  setWelcomeModalOpened,
} = settingsSlice.actions;
