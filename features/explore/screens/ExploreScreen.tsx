import { catalogService } from '@/api/catalogService';
import { CourseCard } from '@/components/CourseCard';
import { EmptyState } from '@/components/EmptyState';
import { FilterChips } from '@/components/FilterChips';
import { useAppSelector } from '@/store/hooks';
import type { EducationalItem } from '@/types';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
  const router = useRouter();
  const items = useAppSelector((state) => state.catalog.items);

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'course' | 'workshop' | 'event'>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        await catalogService.fetchItems();
      } catch (error) {
        console.error('Failed to load items:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (items.length === 0) {
      loadItems();
    }
  }, [items.length]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await catalogService.fetchItems();
    } catch (error) {
      console.error('Failed to refresh:', error);
    }
    setRefreshing(false);
  };

  const filteredItems = items.filter((item: EducationalItem) => {
    if (selectedFilter === 'all') return true;
    return item.type === selectedFilter;
  });

  const renderItem = ({ item }: { item: EducationalItem }) => (
    <CourseCard
      item={item}
      onPress={() => {
        router.push('/(tabs)/' as any);
      }}
      showEnrollButton={true}
    />
  );

  if (loading && items.length === 0) {
    return (
      <SafeAreaView
        edges={['top']}
        className="flex-1 bg-gray-50 dark:bg-dark-900 justify-center items-center"
      >
        <ActivityIndicator size="large" color="#17B5A3" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-gray-50 dark:bg-dark-900">
      <View className="flex-1">
        {/* Header */}
        <View className="px-5 pt-4 pb-2">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white">
            Explore
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 mt-1">
            Discover courses, workshops & events
          </Text>
        </View>

        {/* Filter Chips */}
        <FilterChips
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
        />

        {/* Content */}
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 8 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#17B5A3"
            />
          }
          ListEmptyComponent={
            <EmptyState
              icon="search"
              title="No items found"
              message="Try changing your filter or pull to refresh"
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}
