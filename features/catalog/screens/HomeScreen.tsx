import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { catalogService } from '../../../api/catalogService';
import { CourseCard } from '../../../components/CourseCard';
import { EmptyState } from '../../../components/EmptyState';
import { FilterChips } from '../../../components/FilterChips';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchItemsFailure, fetchItemsStart, fetchItemsSuccess, setFilter } from '../../../store/slices/catalogSlice';
import { EducationalItem } from '../../../types';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { filteredItems, isLoading, selectedFilter } = useAppSelector((state) => state.catalog);
  const [refreshing, setRefreshing] = React.useState(false);

  const loadItems = async () => {
    try {
      dispatch(fetchItemsStart());
      const items = await catalogService.fetchItems();
      dispatch(fetchItemsSuccess(items));
    } catch (error: any) {
      dispatch(fetchItemsFailure(error.message || 'Failed to fetch items'));
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadItems();
    setRefreshing(false);
  };

  const handleFilterChange = (filter: 'all' | 'course' | 'workshop' | 'event') => {
    dispatch(setFilter(filter));
  };

  const handleCardPress = (item: EducationalItem) => {
    router.push({
      pathname: '/details',
      params: { itemData: JSON.stringify(item) },
    });
  };

  if (isLoading && !refreshing) {
    return <LoadingSpinner message="Loading educational content..." />;
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-dark-900">
      {/* Header */}
      <View className="bg-white dark:bg-dark-800 px-6 pt-12 pb-4 shadow-sm">
        <Text className="text-3xl font-bold text-dark-900 dark:text-white mb-1">
          Explore
        </Text>
        <Text className="text-dark-600 dark:text-dark-300">
          Discover courses, workshops, and events
        </Text>
      </View>

      {/* Filters */}
      <FilterChips selectedFilter={selectedFilter} onFilterChange={handleFilterChange} />

      {/* Content List */}
      {filteredItems.length === 0 ? (
        <EmptyState
          icon="inbox"
          title="No items found"
          message="Try changing your filters or refresh to see new content"
        />
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CourseCard item={item} onPress={() => handleCardPress(item)} />
          )}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 20 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366F1" />
          }
        />
      )}
    </View>
  );
}
