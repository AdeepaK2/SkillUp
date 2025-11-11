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
      style={{ paddingVertical: 12 }}
      contentContainerStyle={{ paddingHorizontal: 16, flexDirection: 'row' }}
    >
      {filters.map((filter, index) => (
        <TouchableOpacity
          key={filter.value}
          onPress={() => onFilterChange(filter.value)}
          style={{
            paddingHorizontal: 24,
            paddingVertical: 14,
            borderRadius: 28,
            backgroundColor: selectedFilter === filter.value ? '#6366F1' : '#E5E7EB',
            marginRight: index < filters.length - 1 ? 10 : 0,
            minWidth: 80,
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontWeight: '600',
              fontSize: 15,
              color: selectedFilter === filter.value ? '#FFFFFF' : '#374151',
            }}
          >
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
