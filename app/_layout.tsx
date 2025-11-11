import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { LoadingSpinner } from '../components/LoadingSpinner';
import '../global.css';
import { store } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { restoreUser } from '../store/slices/authSlice';
import { restoreFavourites } from '../store/slices/favouritesSlice';
import { restoreTheme } from '../store/slices/themeSlice';

function RootLayoutNav() {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const theme = useAppSelector((state) => state.theme.mode);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const restoreAppState = async () => {
      try {
        // Restore user
        const userStr = await AsyncStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          dispatch(restoreUser(user));
        }

        // Restore favourites
        const favouritesStr = await AsyncStorage.getItem('favourites');
        if (favouritesStr) {
          const favourites = JSON.parse(favouritesStr);
          dispatch(restoreFavourites(favourites));
        }

        // Restore theme
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
          dispatch(restoreTheme(savedTheme));
        }
      } catch (error) {
        console.error('Error restoring app state:', error);
      } finally {
        setIsReady(true);
      }
    };

    restoreAppState();
  }, [dispatch]);

  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/login');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments, isReady, router]);

  if (!isReady) {
    return <LoadingSpinner message="Loading SkillUp..." />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="details" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}
