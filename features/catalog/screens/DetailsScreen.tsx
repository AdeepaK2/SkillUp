import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { toggleEnrollment } from '../../../store/slices/enrollmentsSlice';
import { toggleFavourite } from '../../../store/slices/favouritesSlice';
import { EducationalItem } from '../../../types';

export default function DetailsScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const favourites = useAppSelector((state) => state.favourites.items);
  const enrollments = useAppSelector((state) => state.enrollments.items);

  const item: EducationalItem = JSON.parse(params.itemData as string);
  const isFavourite = favourites.includes(item.id);
  const isEnrolled = enrollments.includes(item.id);

  const handleFavouritePress = () => {
    dispatch(toggleFavourite(item.id));
  };

  const handleBookNow = () => {
    dispatch(toggleEnrollment(item.id));
    if (!isEnrolled) {
      // Show success feedback or navigate to My Learning
      router.push('/(tabs)/learning');
    }
  };

  const getBadgeColor = () => {
    switch (item.type) {
      case 'course':
        return 'bg-primary-100 dark:bg-primary-900 border-primary-300 dark:border-primary-700';
      case 'workshop':
        return 'bg-secondary-100 dark:bg-secondary-900 border-secondary-300 dark:border-secondary-700';
      case 'event':
        return 'bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700';
    }
  };

  const getBadgeTextColor = () => {
    switch (item.type) {
      case 'course':
        return 'text-primary-800 dark:text-primary-200';
      case 'workshop':
        return 'text-secondary-800 dark:text-secondary-200';
      case 'event':
        return 'text-green-800 dark:text-green-200';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-dark-900" edges={['bottom']}>
      <ScrollView>
        {/* Header Image */}
        <View className="relative w-full h-72 bg-gray-100 dark:bg-dark-700">
          <Image
            source={{ uri: item.thumbnail }}
            className="w-full h-full"
            resizeMode="cover"
            defaultSource={require('../../../assets/images/icon.png')}
          />
          
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-12 left-4 bg-white/90 dark:bg-dark-800/90 rounded-full p-3"
          >
            <Feather name="arrow-left" size={24} color={theme === 'dark' ? '#FFF' : '#000'} />
          </TouchableOpacity>

          {/* Favourite Button */}
          <TouchableOpacity
            onPress={handleFavouritePress}
            className="absolute top-12 right-4 bg-white/90 dark:bg-dark-800/90 rounded-full p-3"
          >
            <Feather
              name="heart"
              size={24}
              color={isFavourite ? '#17B5A3' : theme === 'dark' ? '#9CA3AF' : '#6B7280'}
              fill={isFavourite ? '#17B5A3' : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="px-6 py-6">
          {/* Type Badge and Rating */}
          <View className="flex-row items-center justify-between mb-4">
            <View className={`px-4 py-2 rounded-full border ${getBadgeColor()}`}>
              <Text className={`text-sm font-bold uppercase ${getBadgeTextColor()}`}>
                {item.type}
              </Text>
            </View>
            <View className="flex-row items-center bg-yellow-50 dark:bg-yellow-900/30 px-3 py-2 rounded-full">
              <Feather name="star" size={18} color="#F59E0B" fill="#F59E0B" />
              <Text className="text-yellow-800 dark:text-yellow-200 text-base ml-1 font-bold">
                {item.rating} / 5.0
              </Text>
            </View>
          </View>

          {/* Title */}
          <Text className="text-3xl font-bold text-dark-900 dark:text-white mb-4">
            {item.title}
          </Text>

          {/* Info Cards */}
          <View className="flex-row flex-wrap gap-3 mb-6">
            <View className="flex-row items-center bg-gray-100 dark:bg-dark-800 px-4 py-3 rounded-xl">
              <Feather name="user" size={18} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              <Text className="text-dark-700 dark:text-dark-200 ml-2 font-medium">
                {item.instructor}
              </Text>
            </View>

            <View className="flex-row items-center bg-gray-100 dark:bg-dark-800 px-4 py-3 rounded-xl">
              <Feather name="clock" size={18} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              <Text className="text-dark-700 dark:text-dark-200 ml-2 font-medium">
                {item.duration}
              </Text>
            </View>

            <View className="flex-row items-center bg-gray-100 dark:bg-dark-800 px-4 py-3 rounded-xl">
              <Feather name="bar-chart-2" size={18} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              <Text className="text-dark-700 dark:text-dark-200 ml-2 font-medium capitalize">
                {item.level}
              </Text>
            </View>

            <View className="flex-row items-center bg-gray-100 dark:bg-dark-800 px-4 py-3 rounded-xl">
              <Feather name="tag" size={18} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              <Text className="text-dark-700 dark:text-dark-200 ml-2 font-medium">
                {item.category}
              </Text>
            </View>

            {item.location && (
              <View className="flex-row items-center bg-gray-100 dark:bg-dark-800 px-4 py-3 rounded-xl">
                <Feather name="map-pin" size={18} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
                <Text className="text-dark-700 dark:text-dark-200 ml-2 font-medium">
                  {item.location}
                </Text>
              </View>
            )}

            {item.date && (
              <View className="flex-row items-center bg-gray-100 dark:bg-dark-800 px-4 py-3 rounded-xl">
                <Feather name="calendar" size={18} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
                <Text className="text-dark-700 dark:text-dark-200 ml-2 font-medium">
                  {new Date(item.date).toLocaleDateString()}
                </Text>
              </View>
            )}
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-dark-900 dark:text-white mb-3">
              About this {item.type}
            </Text>
            <Text className="text-dark-600 dark:text-dark-300 text-base leading-6">
              {item.description}
            </Text>
            <Text className="text-dark-600 dark:text-dark-300 text-base leading-6 mt-3">
              This comprehensive {item.type} is designed for {item.level} learners who want to master {item.category.toLowerCase()}. 
              You&apos;ll learn through hands-on projects and real-world examples, guided by expert instructor {item.instructor}.
            </Text>
          </View>

          {/* What you'll learn */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-dark-900 dark:text-white mb-3">
              What you&apos;ll learn
            </Text>
            {['Master fundamental concepts', 'Build real-world projects', 'Industry best practices', 'Expert techniques and tips'].map((point, index) => (
              <View key={index} className="flex-row items-start mb-3">
                <Feather name="check-circle" size={20} color="#10B981" />
                <Text className="text-dark-600 dark:text-dark-300 text-base ml-3 flex-1">
                  {point}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View className="border-t border-gray-200 dark:border-dark-700 px-6 py-4 bg-white dark:bg-dark-800">
        {isEnrolled ? (
          /* Enrolled State - Show Study and Unjoin buttons */
          <View>
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={() => router.push({
                pathname: '/course-content',
                params: { itemData: JSON.stringify(item) },
              })}
              style={{
                backgroundColor: '#17B5A3',
                paddingHorizontal: 32,
                paddingVertical: 16,
                minHeight: 56,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }}
            >
              <Feather
                name="play-circle"
                size={22}
                color="#FFFFFF"
                style={{ marginRight: 8 }}
              />
              <Text className="text-white font-bold text-lg">
                Start Learning
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={handleBookNow}
              style={{
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: '#EF4444',
                paddingHorizontal: 32,
                paddingVertical: 14,
                minHeight: 54,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Feather
                name="user-minus"
                size={20}
                color="#EF4444"
                style={{ marginRight: 8 }}
              />
              <Text style={{ color: '#EF4444', fontWeight: 'bold', fontSize: 18 }}>
                Unjoin
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Not Enrolled - Show Price and Join button */
          <View className="flex-row items-center justify-between">
            <View>
              {item.price > 0 ? (
                <>
                  <Text className="text-dark-600 dark:text-dark-300 text-sm">Price</Text>
                  <Text className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    Rs {item.price}
                  </Text>
                </>
              ) : (
                <Text className="text-3xl font-bold text-success">FREE</Text>
              )}
            </View>
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={handleBookNow}
              style={{
                backgroundColor: '#17B5A3',
                paddingHorizontal: 32,
                paddingVertical: 16,
                minHeight: 56,
                minWidth: 160,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Feather
                name="user-plus"
                size={20}
                color="#FFFFFF"
                style={{ marginRight: 8 }}
              />
              <Text className="text-white font-bold text-lg">
                Join Now
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
