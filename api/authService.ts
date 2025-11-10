import { User } from '../types';

// Mock authentication service
// In a real app, this would make API calls to your backend
export const authService = {
  // Login user
  async login(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (email && password.length >= 6) {
          const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            username: email.split('@')[0],
            token: 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9),
          };
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  // Register user
  async register(email: string, password: string, username: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (email && password.length >= 6 && username.length >= 3) {
          const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            username,
            token: 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9),
          };
          resolve(user);
        } else {
          reject(new Error('Invalid registration data'));
        }
      }, 1000);
    });
  },

  // Logout user
  async logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },
};
