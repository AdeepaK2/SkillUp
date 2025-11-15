import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogState, EducationalItem } from '../../types';

const initialState: CatalogState = {
  items: [],
  filteredItems: [],
  isLoading: false,
  error: null,
  selectedFilter: 'all',
  lastFetched: null, // Timestamp of last successful fetch
};

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    fetchItemsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchItemsSuccess: (state, action: PayloadAction<EducationalItem[]>) => {
      state.isLoading = false;
      state.items = action.payload;
      state.filteredItems = action.payload;
      state.error = null;
      state.lastFetched = Date.now(); // Store timestamp
    },
    fetchItemsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setFilter: (state, action: PayloadAction<'all' | 'course' | 'workshop' | 'event'>) => {
      state.selectedFilter = action.payload;
      if (action.payload === 'all') {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(item => item.type === action.payload);
      }
    },
  },
});

export const {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
  setFilter,
} = catalogSlice.actions;

export default catalogSlice.reducer;
