import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import catalogReducer from './slices/catalogSlice';
import enrollmentsReducer from './slices/enrollmentsSlice';
import favouritesReducer from './slices/favouritesSlice';
import notificationsReducer from './slices/notificationsSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    catalog: catalogReducer,
    favourites: favouritesReducer,
    theme: themeReducer,
    enrollments: enrollmentsReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
