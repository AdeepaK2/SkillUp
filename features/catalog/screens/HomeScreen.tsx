import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { catalogService } from '../../../api/catalogService';
import { CourseCard } from '../../../components/CourseCard';
import { EmptyState } from '../../../components/EmptyState';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchItemsFailure, fetchItemsStart, fetchItemsSuccess } from '../../../store/slices/catalogSlice';
import { EducationalItem } from '../../../types';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items, isLoading } = useAppSelector((state) => state.catalog);
  const user = useAppSelector((state) => state.auth.user);
  const enrolledIds = useAppSelector((state) => state.enrollments.items);
  const favouriteIds = useAppSelector((state) => state.favourites.items);
  const theme = useAppSelector((state) => state.theme.mode);
  
  const [refreshing, setRefreshing] = React.useState(false);

  const loadItems = React.useCallback(async () => {
    try {
      dispatch(fetchItemsStart());
      const items = await catalogService.fetchItems();
      dispatch(fetchItemsSuccess(items));
    } catch (error: any) {
      dispatch(fetchItemsFailure(error.message || 'Failed to fetch items'));
    }
  }, [dispatch]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadItems();
    setRefreshing(false);
  };

  const handleCardPress = (item: EducationalItem) => {
    router.push({
      pathname: '/details',
      params: { itemData: JSON.stringify(item) },
    });
  };

  // Get enrolled items
  const enrolledItems = items.filter((item) => enrolledIds.includes(item.id));
  
  // Get new/explore items (items not enrolled)
  const exploreItems = items.filter((item) => !enrolledIds.includes(item.id)).slice(0, 10);

  // Calculate stats
  const stats = [
    {
      icon: 'book-open',
      label: 'Enrolled',
      value: enrolledIds.length,
      color: '#6366F1',
      bgColor: theme === 'dark' ? '#312E81' : '#EEF2FF',
    },
    {
      icon: 'heart',
      label: 'Favourites',
      value: favouriteIds.length,
      color: '#EC4899',
      bgColor: theme === 'dark' ? '#831843' : '#FCE7F3',
    },
    {
      icon: 'award',
      label: 'Completed',
      value: 0,
      color: '#10B981',
      bgColor: theme === 'dark' ? '#064E3B' : '#D1FAE5',
    },
  ];

  if (isLoading && !refreshing) {
    return <LoadingSpinner message="Loading educational content..." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-dark-900" edges={['top']}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366F1" />
        }
      >
        {/* Welcome Card */}
        <View className="px-6 pt-6 pb-3">
          <View 
            style={{
              backgroundColor: theme === 'dark' ? '#1E293B' : '#FFFFFF',
              borderRadius: 20,
              padding: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 5,
            }}
          >
            <View className="flex-row items-center">
              {/* User Avatar */}
              <View 
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  backgroundColor: '#6366F1',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}
              >
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' }}>
                  {user?.username?.charAt(0).toUpperCase() || 'L'}
                </Text>
              </View>

              {/* Welcome Text */}
              <View className="flex-1">
                <Text 
                  style={{
                    fontSize: 14,
                    color: theme === 'dark' ? '#94A3B8' : '#64748B',
                    marginBottom: 4,
                  }}
                >
                  Welcome back!
                </Text>
                <Text 
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: theme === 'dark' ? '#FFFFFF' : '#1E293B',
                  }}
                >
                  {user?.username || 'Learner'}
                </Text>
              </View>

              {/* Notification Icon */}
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: theme === 'dark' ? '#334155' : '#F1F5F9',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Feather 
                  name="bell" 
                  size={20} 
                  color={theme === 'dark' ? '#94A3B8' : '#64748B'} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View className="px-6 py-3">
          <View className="flex-row justify-between">
            {stats.map((stat, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  marginHorizontal: 4,
                  padding: 16,
                  borderRadius: 16,
                  backgroundColor: theme === 'dark' ? '#1E293B' : '#FFFFFF',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    backgroundColor: stat.color + '20',
                    borderRadius: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 8,
                  }}
                >
                  <Feather name={stat.icon as any} size={22} color={stat.color} />
                </View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: theme === 'dark' ? '#FFFFFF' : '#1E293B',
                    marginBottom: 2,
                  }}
                >
                  {stat.value}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    color: theme === 'dark' ? '#94A3B8' : '#64748B',
                    fontWeight: '600',
                  }}
                >
                  {stat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Continue Learning Section */}
        {enrolledItems.length > 0 && (
          <View className="mb-4">
            <View className="px-6 py-3 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-dark-900 dark:text-white">
                Continue Learning
              </Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/learning')}>
                <Text className="text-primary-600 dark:text-primary-400 font-semibold">
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            >
              {enrolledItems.slice(0, 5).map((item) => (
                <View key={item.id} style={{ width: 300, marginRight: 12 }}>
                  <CourseCard
                    item={item}
                    onPress={() => handleCardPress(item)}
                    showEnrollButton={false}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Explore New Section */}
        <View className="mb-6">
          <View className="px-6 py-3 flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-bold text-dark-900 dark:text-white">
                Explore New
              </Text>
              <Text className="text-sm text-dark-600 dark:text-dark-300">
                Discover courses, workshops & events
              </Text>
            </View>
          </View>
          
          {exploreItems.length === 0 ? (
            <View className="px-6">
              <EmptyState
                icon="inbox"
                title="No items found"
                message="Refresh to see new content"
              />
            </View>
          ) : (
            <View>
              {exploreItems.map((item) => (
                <CourseCard
                  key={item.id}
                  item={item}
                  onPress={() => handleCardPress(item)}
                  showEnrollButton={false}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
