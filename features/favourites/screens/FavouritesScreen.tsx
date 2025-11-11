import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { CourseCard } from '../../../components/CourseCard';
import { EmptyState } from '../../../components/EmptyState';
import { useAppSelector } from '../../../store/hooks';
import { EducationalItem } from '../../../types';

export default function FavouritesScreen() {
  const router = useRouter();
  const favourites = useAppSelector((state) => state.favourites.items);
  const allItems = useAppSelector((state) => state.catalog.items);

  const favouriteItems = allItems.filter((item) => favourites.includes(item.id));

  const handleCardPress = (item: EducationalItem) => {
    router.push({
      pathname: '/details',
      params: { itemData: JSON.stringify(item) },
    });
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-dark-900">
      {/* Header */}
      <View className="bg-white dark:bg-dark-800 px-6 pt-12 pb-4 shadow-sm">
        <Text className="text-3xl font-bold text-dark-900 dark:text-white mb-1">
          Favourites
        </Text>
        <Text className="text-dark-600 dark:text-dark-300">
          {favouriteItems.length} saved {favouriteItems.length === 1 ? 'item' : 'items'}
        </Text>
      </View>

      {/* Content */}
      {favouriteItems.length === 0 ? (
        <EmptyState
          icon="heart"
          title="No favourites yet"
          message="Start exploring and save your favorite courses, workshops, and events"
        />
      ) : (
        <FlatList
          data={favouriteItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CourseCard item={item} onPress={() => handleCardPress(item)} />
          )}
          contentContainerStyle={{ paddingTop: 12, paddingBottom: 20 }}
        />
      )}
    </View>
  );
}
