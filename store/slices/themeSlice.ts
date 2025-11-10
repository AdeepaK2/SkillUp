import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeMode, ThemeState } from '../../types';

const initialState: ThemeState = {
  mode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      // Persist theme
      AsyncStorage.setItem('theme', action.payload);
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      // Persist theme
      AsyncStorage.setItem('theme', state.mode);
    },
    restoreTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { setTheme, toggleTheme, restoreTheme } = themeSlice.actions;

export default themeSlice.reducer;
