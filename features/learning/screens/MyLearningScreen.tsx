import { CourseCard } from '@/components/CourseCard';
import { EmptyState } from '@/components/EmptyState';
import { useAppSelector } from '@/store/hooks';
import type { EducationalItem } from '@/types';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyLearningScreen() {
  const router = useRouter();
  const enrolledIds = useAppSelector((state) => state.enrollments.items);
  const items = useAppSelector((state) => state.catalog.items);
  const theme = useAppSelector((state) => state.theme.mode);

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'course' | 'workshop' | 'event'>('all');

  // Get enrolled items
  const enrolledItems = items.filter((item) => enrolledIds.includes(item.id));

  // Filter by type
  const filteredItems = enrolledItems.filter((item) => {
    if (selectedFilter === 'all') return true;
    return item.type === selectedFilter;
  });

  const filters: { id: 'all' | 'course' | 'workshop' | 'event'; label: string; icon: string }[] = [
    { id: 'all', label: 'All', icon: 'grid' },
    { id: 'course', label: 'Courses', icon: 'book' },
    { id: 'workshop', label: 'Workshops', icon: 'tool' },
    { id: 'event', label: 'Events', icon: 'calendar' },
  ];

  const renderItem = ({ item }: { item: EducationalItem }) => (
    <CourseCard
      item={item}
      onPress={() => router.push({
        pathname: '/details',
        params: { itemData: JSON.stringify(item) },
      })}
      showEnrollButton={false}
    />
  );

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-gray-50 dark:bg-dark-900">
      <View className="flex-1">
        {/* Header */}
        <View className="px-5 pt-4 pb-2">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white">
            My Learning
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 mt-1">
            {enrolledItems.length} {enrolledItems.length === 1 ? 'item' : 'items'} enrolled
          </Text>
        </View>

        {/* Filter Tabs */}
        <View className="px-5 py-3">
          <View className="flex-row flex-wrap">
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                activeOpacity={0.7}
                onPress={() => setSelectedFilter(filter.id)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  minHeight: 44,
                  marginRight: 8,
                  marginBottom: 8,
                  borderRadius: 22,
                  backgroundColor:
                    selectedFilter === filter.id
                      ? '#3B82F6'
                      : theme === 'dark'
                      ? '#374151'
                      : '#F3F4F6',
                }}
              >
                <Feather
                  name={filter.icon as any}
                  size={14}
                  color={selectedFilter === filter.id ? '#FFFFFF' : theme === 'dark' ? '#9CA3AF' : '#6B7280'}
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color:
                      selectedFilter === filter.id
                        ? '#FFFFFF'
                        : theme === 'dark'
                        ? '#9CA3AF'
                        : '#374151',
                  }}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Content */}
        {enrolledItems.length === 0 ? (
          <View className="flex-1 justify-center items-center px-4">
            <EmptyState
              icon="book-open"
              title="No enrollments yet"
              message="Start exploring and enroll in courses, workshops, or events to see them here"
            />
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/index' as any)}
              className="bg-primary-600 px-6 py-3 rounded-xl mt-4"
            >
              <Text className="text-white font-semibold text-base">
                Browse Courses
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20, paddingTop: 8 }}
            ListEmptyComponent={
              <View className="px-4 py-8">
                <Text className="text-center text-gray-500 dark:text-gray-400">
                  No {selectedFilter === 'all' ? '' : selectedFilter + 's'} found
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
