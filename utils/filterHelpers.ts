/**
 * Filter and search utility functions
 * Following best practices: Pure functions, single responsibility
 */

import { EducationalItem } from '../types';

/**
 * Filters items by category
 * @param items - Array of educational items
 * @param category - Category to filter by
 * @returns Filtered items array
 */
export const filterByCategory = (
  items: EducationalItem[],
  category: string
): EducationalItem[] => {
  if (category === 'All') return items;
  return items.filter((item) => item.category === category);
};

/**
 * Filters items by search query
 * Searches across title, description, category, and instructor
 * @param items - Array of educational items
 * @param query - Search query string
 * @returns Filtered items array
 */
export const filterBySearchQuery = (
  items: EducationalItem[],
  query: string
): EducationalItem[] => {
  if (!query.trim()) return items;

  const normalizedQuery = query.toLowerCase().trim();

  return items.filter((item) => {
    const searchFields = [
      item.title,
      item.description,
      item.category,
      item.instructor,
    ];

    return searchFields.some((field) =>
      field.toLowerCase().includes(normalizedQuery)
    );
  });
};

/**
 * Filters items by enrolled status
 * @param items - Array of educational items
 * @param enrolledIds - Array of enrolled item IDs
 * @param isEnrolled - Whether to return enrolled or not enrolled items
 * @returns Filtered items array
 */
export const filterByEnrollmentStatus = (
  items: EducationalItem[],
  enrolledIds: string[],
  isEnrolled: boolean = true
): EducationalItem[] => {
  return items.filter((item) =>
    isEnrolled ? enrolledIds.includes(item.id) : !enrolledIds.includes(item.id)
  );
};

/**
 * Combines multiple filters
 * @param items - Array of educational items
 * @param filters - Object containing filter criteria
 * @returns Filtered items array
 */
export const applyFilters = (
  items: EducationalItem[],
  filters: {
    category?: string;
    searchQuery?: string;
    enrolledIds?: string[];
    excludeEnrolled?: boolean;
  }
): EducationalItem[] => {
  let filteredItems = [...items];

  // Apply enrollment filter
  if (filters.enrolledIds && filters.excludeEnrolled) {
    filteredItems = filterByEnrollmentStatus(
      filteredItems,
      filters.enrolledIds,
      false
    );
  }

  // Apply category filter
  if (filters.category) {
    filteredItems = filterByCategory(filteredItems, filters.category);
  }

  // Apply search query filter
  if (filters.searchQuery) {
    filteredItems = filterBySearchQuery(filteredItems, filters.searchQuery);
  }

  return filteredItems;
};
