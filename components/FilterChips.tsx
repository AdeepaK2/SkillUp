import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

interface FilterChipsProps {
  selectedFilter: 'all' | 'course' | 'workshop' | 'event';
  onFilterChange: (filter: 'all' | 'course' | 'workshop' | 'event') => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({ selectedFilter, onFilterChange }) => {
  const filters: { label: string; value: 'all' | 'course' | 'workshop' | 'event' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Courses', value: 'course' },
    { label: 'Workshops', value: 'workshop' },
    { label: 'Events', value: 'event' },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="px-4 py-3"
      contentContainerClassName="gap-2"
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.value}
          onPress={() => onFilterChange(filter.value)}
          className={`px-5 py-2 rounded-full ${
            selectedFilter === filter.value
              ? 'bg-primary-600 dark:bg-primary-500'
              : 'bg-gray-200 dark:bg-dark-700'
          }`}
        >
          <Text
            className={`font-semibold ${
              selectedFilter === filter.value
                ? 'text-white'
                : 'text-dark-700 dark:text-dark-300'
            }`}
          >
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
