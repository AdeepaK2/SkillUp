import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

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
  
  // Get new/explore items with search and category filter
  const categories = ['All', 'Programming', 'Design', 'Business', 'Marketing', 'Data Science'];
  
  let filteredExploreItems = items.filter((item) => !enrolledIds.includes(item.id));
  
  // Apply category filter
  if (selectedCategory !== 'All') {
    filteredExploreItems = filteredExploreItems.filter(
      (item) => item.category === selectedCategory
    );
  }
  
  // Apply search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredExploreItems = filteredExploreItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.instructor.toLowerCase().includes(query)
    );
  }
  
  const exploreItems = filteredExploreItems;

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
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366F1" />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Welcome Card */}
        <View className="px-5 pt-4 pb-3">
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
        <View className="px-5 py-3">
          <View className="flex-row justify-between gap-2">
            {stats.map((stat, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  minHeight: 110,
                  padding: 16,
                  borderRadius: 16,
                  backgroundColor: theme === 'dark' ? '#1E293B' : '#FFFFFF',
                  alignItems: 'center',
                  justifyContent: 'center',
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
        <View className="mb-4">
          <View className="px-5 py-3">
            <View className="flex-row items-center justify-between mb-4">
              <View>
                <Text className="text-xl font-bold text-dark-900 dark:text-white">
                  Explore New
                </Text>
                <Text className="text-sm text-dark-600 dark:text-dark-300">
                  {exploreItems.length} courses available
                </Text>
              </View>
            </View>

            {/* Search Bar */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: theme === 'dark' ? '#1E293B' : '#FFFFFF',
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 14,
                minHeight: 52,
                marginBottom: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <Feather
                name="search"
                size={20}
                color={theme === 'dark' ? '#94A3B8' : '#64748B'}
              />
              <TextInput
                placeholder="Search courses, instructors..."
                placeholderTextColor={theme === 'dark' ? '#64748B' : '#94A3B8'}
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{
                  flex: 1,
                  marginLeft: 12,
                  fontSize: 15,
                  color: theme === 'dark' ? '#FFFFFF' : '#1E293B',
                }}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Feather
                    name="x-circle"
                    size={20}
                    color={theme === 'dark' ? '#64748B' : '#94A3B8'}
                  />
                </TouchableOpacity>
              )}
            </View>

            {/* Category Filter Pills */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 8 }}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  activeOpacity={0.7}
                  onPress={() => setSelectedCategory(category)}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    minHeight: 44,
                    justifyContent: 'center',
                    borderRadius: 22,
                    marginRight: 8,
                    backgroundColor:
                      selectedCategory === category
                        ? '#6366F1'
                        : theme === 'dark'
                        ? '#1E293B'
                        : '#F1F5F9',
                    borderWidth: 1,
                    borderColor:
                      selectedCategory === category
                        ? '#6366F1'
                        : theme === 'dark'
                        ? '#334155'
                        : '#E2E8F0',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color:
                        selectedCategory === category
                          ? '#FFFFFF'
                          : theme === 'dark'
                          ? '#CBD5E1'
                          : '#475569',
                    }}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          {exploreItems.length === 0 ? (
            <View className="px-5 mt-8">
              <EmptyState
                icon="search"
                title={searchQuery ? "No results found" : "No items found"}
                message={searchQuery ? `Try different keywords` : "Refresh to see new content"}
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
