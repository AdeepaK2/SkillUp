import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavouritesState } from '../../types';

const initialState: FavouritesState = {
  items: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
        // Persist favourites
        AsyncStorage.setItem('favourites', JSON.stringify(state.items));
      }
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(id => id !== action.payload);
      // Persist favourites
      AsyncStorage.setItem('favourites', JSON.stringify(state.items));
    },
    toggleFavourite: (state, action: PayloadAction<string>) => {
      const index = state.items.indexOf(action.payload);
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      // Persist favourites
      AsyncStorage.setItem('favourites', JSON.stringify(state.items));
    },
    restoreFavourites: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  addFavourite,
  removeFavourite,
  toggleFavourite,
  restoreFavourites,
} = favouritesSlice.actions;

export default favouritesSlice.reducer;
