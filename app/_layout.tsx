import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import '../global.css';
import { store } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { restoreUser } from '../store/slices/authSlice';
import { setEnrollments } from '../store/slices/enrollmentsSlice';
import { restoreFavourites } from '../store/slices/favouritesSlice';
import { restoreTheme } from '../store/slices/themeSlice';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const theme = useAppSelector((state) => state.theme.mode);
  const router = useRouter();
  const segments = useSegments();
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    // Sync NativeWind color scheme with Redux theme
    setColorScheme(theme);
  }, [theme, setColorScheme]);

  useEffect(() => {
    const restoreState = async () => {
      try {
        const [userStr, favouritesStr, themeStr, enrollmentsStr] = await Promise.all([
          AsyncStorage.getItem('user'),
          AsyncStorage.getItem('favourites'),
          AsyncStorage.getItem('theme'),
          AsyncStorage.getItem('enrollments'),
        ]);

        if (userStr) {
          const user = JSON.parse(userStr);
          dispatch(restoreUser(user));
        }

        if (favouritesStr) {
          const favourites = JSON.parse(favouritesStr);
          dispatch(restoreFavourites(favourites));
        }

        if (themeStr) {
          dispatch(restoreTheme(themeStr as 'light' | 'dark'));
        }

        if (enrollmentsStr) {
          const enrollments = JSON.parse(enrollmentsStr);
          dispatch(setEnrollments(enrollments));
        }

        // Add a minimum delay to show splash screen
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Failed to restore state:', error);
      } finally {
        setIsReady(true);
        // Hide splash screen after state is restored
        await SplashScreen.hideAsync();
      }
    };

    restoreState();
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
    return null; // Return null while splash screen is showing
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
