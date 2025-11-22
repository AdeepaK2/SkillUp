/**
 * Application-wide constants
 * Following best practices: Centralized configuration
 */

export const CATEGORIES = [
  'All',
  'Programming',
  'Design',
  'Business',
  'Marketing',
  'Data Science',
] as const;

export const ITEM_TYPES = {
  COURSE: 'course',
  WORKSHOP: 'workshop',
  EVENT: 'event',
} as const;

export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const;

export const COLORS = {
  PRIMARY: '#17B5A3',
  SUCCESS: '#10B981',
  ERROR: '#EF4444',
  WARNING: '#F59E0B',
  INFO: '#17B5A3',
  TEAL: '#17B5A3',
} as const;

export const THEME_COLORS = {
  LIGHT: {
    BACKGROUND: '#F9FAFB',
    CARD_BACKGROUND: '#FFFFFF',
    TEXT_PRIMARY: '#1E293B',
    TEXT_SECONDARY: '#64748B',
    BORDER: '#E2E8F0',
  },
  DARK: {
    BACKGROUND: '#0F172A',
    CARD_BACKGROUND: '#1E293B',
    TEXT_PRIMARY: '#FFFFFF',
    TEXT_SECONDARY: '#94A3B8',
    BORDER: '#334155',
  },
} as const;

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  MIN_PASSWORD_LENGTH: 6,
  MIN_USERNAME_LENGTH: 3,
} as const;

export const SPLASH_SCREEN_DURATION = 2000; // milliseconds

export const API_ENDPOINTS = {
  OPEN_LIBRARY_SEARCH: 'https://openlibrary.org/search.json',
  OPEN_LIBRARY_SUBJECTS: 'https://openlibrary.org/subjects',
  OPEN_LIBRARY_COVERS: 'https://covers.openlibrary.org/b/id',
} as const;
