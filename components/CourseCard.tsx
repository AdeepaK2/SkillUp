import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleEnrollment } from '../store/slices/enrollmentsSlice';
import { toggleFavourite } from '../store/slices/favouritesSlice';
import { EducationalItem } from '../types';

interface CourseCardProps {
  item: EducationalItem;
  onPress: () => void;
  showEnrollButton?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = React.memo(({ item, onPress, showEnrollButton = false }) => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((state) => state.favourites.items);
  const enrollments = useAppSelector((state) => state.enrollments.items);
  const theme = useAppSelector((state) => state.theme.mode);
  const isFavourite = favourites.includes(item.id);
  const isEnrolled = enrollments.includes(item.id);
  
  const [imageLoading, setImageLoading] = React.useState(true);
  const [imageError, setImageError] = React.useState(false);

  const handleFavouritePress = React.useCallback((e: any) => {
    e.stopPropagation();
    dispatch(toggleFavourite(item.id));
  }, [dispatch, item.id]);

  const handleEnrollmentPress = React.useCallback((e: any) => {
    e.stopPropagation();
    dispatch(toggleEnrollment(item.id));
  }, [dispatch, item.id]);

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
      <View className="w-full h-48 bg-gray-100 dark:bg-dark-700">
        {!imageError ? (
          <>
            <Image
              source={{ uri: item.thumbnail }}
              className="w-full h-full"
              resizeMode="cover"
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
              onError={() => {
                setImageError(true);
                setImageLoading(false);
              }}
            />
            {imageLoading && (
              <View 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: theme === 'dark' ? '#1F2937' : '#F3F4F6',
                }}
              >
                <ActivityIndicator size="small" color="#6366F1" />
              </View>
            )}
          </>
        ) : (
          <View 
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme === 'dark' ? '#1F2937' : '#F3F4F6',
            }}
          >
            <Feather name="image" size={48} color={theme === 'dark' ? '#4B5563' : '#9CA3AF'} />
          </View>
        )}
      </View>
      
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleFavouritePress}
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          backgroundColor: isFavourite ? '#EC4899' : theme === 'dark' ? '#374151' : '#FFFFFF',
          paddingHorizontal: 16,
          paddingVertical: 10,
          minHeight: 44,
          borderRadius: 22,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Feather
          name={isFavourite ? 'heart' : 'heart'}
          size={16}
          color={isFavourite ? '#FFFFFF' : theme === 'dark' ? '#9CA3AF' : '#6B7280'}
          fill={isFavourite ? '#FFFFFF' : 'transparent'}
        />
        <Text
          style={{
            marginLeft: 6,
            fontSize: 13,
            fontWeight: '600',
            color: isFavourite ? '#FFFFFF' : theme === 'dark' ? '#9CA3AF' : '#374151',
          }}
        >
          {isFavourite ? 'Saved' : 'Save'}
        </Text>
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
              Rs {item.price}
            </Text>
          )}
          {item.price === 0 && (
            <Text className="text-success text-sm font-bold">FREE</Text>
          )}
        </View>

        {showEnrollButton && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleEnrollmentPress}
            style={{
              backgroundColor: isEnrolled ? '#10B981' : '#6366F1',
              paddingHorizontal: 20,
              paddingVertical: 14,
              minHeight: 48,
              borderRadius: 12,
              marginTop: 12,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Feather
              name={isEnrolled ? 'check-circle' : 'plus-circle'}
              size={18}
              color="#FFFFFF"
            />
            <Text
              style={{
                marginLeft: 8,
                fontSize: 15,
                fontWeight: '700',
                color: '#FFFFFF',
              }}
            >
              {isEnrolled ? 'Enrolled' : 'Enroll Now'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
});
