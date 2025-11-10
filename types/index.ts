// User types
export interface User {
  id: string;
  email: string;
  username: string;
  token?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Course/Educational Item types
export interface EducationalItem {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'workshop' | 'event';
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  thumbnail: string;
  price: number;
  category: string;
  date?: string; // For events
  location?: string; // For workshops/events
}

export interface CatalogState {
  items: EducationalItem[];
  filteredItems: EducationalItem[];
  isLoading: boolean;
  error: string | null;
  selectedFilter: 'all' | 'course' | 'workshop' | 'event';
}

// Favourites
export interface FavouritesState {
  items: string[]; // Array of item IDs
}

// Theme
export type ThemeMode = 'light' | 'dark';

export interface ThemeState {
  mode: ThemeMode;
}

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Favourites: undefined;
  Profile: undefined;
};

export type CatalogStackParamList = {
  Home: undefined;
  Details: { item: EducationalItem };
};
