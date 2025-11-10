import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleFavourite } from '../store/slices/favouritesSlice';
import { EducationalItem } from '../types';

interface CourseCardProps {
  item: EducationalItem;
  onPress: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ item, onPress }) => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((state) => state.favourites.items);
  const theme = useAppSelector((state) => state.theme.mode);
  const isFavourite = favourites.includes(item.id);

  const handleFavouritePress = (e: any) => {
    e.stopPropagation();
    dispatch(toggleFavourite(item.id));
  };

  const getBadgeColor = () => {
    switch (item.type) {
      case 'course':
        return 'bg-blue-100 dark:bg-blue-900';
      case 'workshop':
        return 'bg-purple-100 dark:bg-purple-900';
      case 'event':
        return 'bg-green-100 dark:bg-green-900';
    }
  };

  const getBadgeTextColor = () => {
    switch (item.type) {
      case 'course':
        return 'text-blue-800 dark:text-blue-200';
      case 'workshop':
        return 'text-purple-800 dark:text-purple-200';
      case 'event':
        return 'text-green-800 dark:text-green-200';
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white dark:bg-dark-800 rounded-2xl shadow-md overflow-hidden mb-4 mx-4"
    >
      <Image
        source={{ uri: item.thumbnail }}
        className="w-full h-48"
        resizeMode="cover"
      />
      
      <TouchableOpacity
        onPress={handleFavouritePress}
        className="absolute top-3 right-3 bg-white dark:bg-dark-700 rounded-full p-2 shadow-lg"
      >
        <Feather
          name="heart"
          size={20}
          color={isFavourite ? '#EC4899' : theme === 'dark' ? '#9CA3AF' : '#6B7280'}
          fill={isFavourite ? '#EC4899' : 'transparent'}
        />
      </TouchableOpacity>

      <View className="p-4">
        <View className="flex-row items-center justify-between mb-2">
          <View className={`px-3 py-1 rounded-full ${getBadgeColor()}`}>
            <Text className={`text-xs font-semibold uppercase ${getBadgeTextColor()}`}>
              {item.type}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Feather name="star" size={16} color="#F59E0B" fill="#F59E0B" />
            <Text className="text-dark-600 dark:text-dark-300 text-sm ml-1 font-semibold">
              {item.rating}
            </Text>
          </View>
        </View>

        <Text className="text-lg font-bold text-dark-900 dark:text-white mb-2" numberOfLines={2}>
          {item.title}
        </Text>

        <Text className="text-dark-600 dark:text-dark-300 text-sm mb-3" numberOfLines={2}>
          {item.description}
        </Text>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Feather name="user" size={16} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
            <Text className="text-dark-600 dark:text-dark-300 text-sm ml-1">
              {item.instructor}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Feather name="clock" size={16} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
            <Text className="text-dark-600 dark:text-dark-300 text-sm ml-1">
              {item.duration}
            </Text>
          </View>

          {item.price > 0 && (
            <Text className="text-primary-600 dark:text-primary-400 text-lg font-bold">
              ${item.price}
            </Text>
          )}
          {item.price === 0 && (
            <Text className="text-success text-sm font-bold">FREE</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
