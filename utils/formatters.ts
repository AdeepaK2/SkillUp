/**
 * Data formatting utility functions
 */

/**
 * Formats a user's initials from username
 * @param username - User's username
 * @returns First character uppercased
 */
export const getUserInitial = (username?: string): string => {
  if (!username) return 'L';
  return username.charAt(0).toUpperCase();
};

/**
 * Formats price for display
 * @param price - Price number
 * @returns Formatted price string
 */
export const formatPrice = (price: number): string => {
  if (price === 0) return 'FREE';
  return `$${price}`;
};

/**
 * Formats rating for display
 * @param rating - Rating number
 * @returns Formatted rating string with one decimal
 */
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

/**
 * Truncates text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Formats date for display
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
