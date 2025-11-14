/**
 * Validation utility functions
 * Following best practices: Reusable validation logic
 */

import { VALIDATION_RULES } from './constants';

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns true if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  return VALIDATION_RULES.EMAIL_REGEX.test(email);
};

/**
 * Validates password strength
 * @param password - Password string to validate
 * @returns Object with validation result and message
 */
export const validatePassword = (
  password: string
): { isValid: boolean; message?: string } => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }

  if (password.length < VALIDATION_RULES.MIN_PASSWORD_LENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${VALIDATION_RULES.MIN_PASSWORD_LENGTH} characters`,
    };
  }

  return { isValid: true };
};

/**
 * Validates username
 * @param username - Username string to validate
 * @returns Object with validation result and message
 */
export const validateUsername = (
  username: string
): { isValid: boolean; message?: string } => {
  if (!username) {
    return { isValid: false, message: 'Username is required' };
  }

  if (username.length < VALIDATION_RULES.MIN_USERNAME_LENGTH) {
    return {
      isValid: false,
      message: `Username must be at least ${VALIDATION_RULES.MIN_USERNAME_LENGTH} characters`,
    };
  }

  return { isValid: true };
};

/**
 * Validates if two passwords match
 * @param password - Password string
 * @param confirmPassword - Confirm password string
 * @returns Object with validation result and message
 */
export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): { isValid: boolean; message?: string } => {
  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords must match' };
  }

  return { isValid: true };
};
