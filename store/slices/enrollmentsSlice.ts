import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EnrollmentsState {
  items: string[]; // Array of enrolled item IDs
}

const initialState: EnrollmentsState = {
  items: [],
};

const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    toggleEnrollment: (state, action: PayloadAction<string>) => {
      const index = state.items.indexOf(action.payload);
      if (index > -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      // Persist to AsyncStorage
      AsyncStorage.setItem('enrollments', JSON.stringify(state.items));
    },
    setEnrollments: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
    clearEnrollments: (state) => {
      state.items = [];
      AsyncStorage.removeItem('enrollments');
    },
  },
});

export const { toggleEnrollment, setEnrollments, clearEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
