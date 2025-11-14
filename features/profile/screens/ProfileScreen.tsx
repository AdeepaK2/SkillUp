import { Feather } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logout } from '../../../store/slices/authSlice';
import { toggleTheme } from '../../../store/slices/themeSlice';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const theme = useAppSelector((state) => state.theme.mode);
  const favourites = useAppSelector((state) => state.favourites.items);
  const enrollments = useAppSelector((state) => state.enrollments.items);
  const { setColorScheme } = useColorScheme();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    // Toggle NativeWind color scheme
    setColorScheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logout()),
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-dark-900" edges={['top']}>
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header */}
        <View className="bg-white dark:bg-dark-800 px-5 pt-4 pb-4 shadow-sm mb-6">
        <Text className="text-3xl font-bold text-dark-900 dark:text-white mb-1">
          Profile
        </Text>
        <Text className="text-dark-600 dark:text-dark-300">
          Manage your account settings
        </Text>
      </View>

      {/* User Info Card */}
      <View className="mx-4 mb-6">
        <View className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm">
          <View className="items-center mb-6">
            <View className="bg-primary-100 dark:bg-primary-900 w-24 h-24 rounded-full items-center justify-center mb-4">
              <Text className="text-primary-600 dark:text-primary-400 text-4xl font-bold">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>
            <Text className="text-2xl font-bold text-dark-900 dark:text-white mb-1">
              {user?.username || 'User'}
            </Text>
            <Text className="text-dark-600 dark:text-dark-300">
              {user?.email || 'user@email.com'}
            </Text>
          </View>

          {/* Stats */}
          <View className="flex-row justify-around border-t border-gray-200 dark:border-dark-700 pt-4">
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {favourites.length}
              </Text>
              <Text className="text-dark-600 dark:text-dark-300 text-sm mt-1">
                Favourites
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {enrollments.length}
              </Text>
              <Text className="text-dark-600 dark:text-dark-300 text-sm mt-1">
                Enrolled
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                0
              </Text>
              <Text className="text-dark-600 dark:text-dark-300 text-sm mt-1">
                Completed
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Settings Section */}
      <View className="mx-4 mb-6">
        <Text className="text-dark-900 dark:text-white text-lg font-bold mb-3 px-2">
          Settings
        </Text>

        {/* Dark Mode Toggle */}
        <View className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-sm">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleThemeToggle}
            className="flex-row items-center justify-between px-6 py-4"
            style={{ minHeight: 72 }}
          >
            <View className="flex-row items-center">
              <View className="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg mr-4">
                <Feather
                  name={theme === 'dark' ? 'moon' : 'sun'}
                  size={24}
                  color="#6366F1"
                />
              </View>
              <View>
                <Text className="text-dark-900 dark:text-white font-semibold text-base">
                  Dark Mode
                </Text>
                <Text className="text-dark-600 dark:text-dark-300 text-sm">
                  {theme === 'dark' ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
            </View>
            <View className={`w-14 h-8 rounded-full p-1 ${theme === 'dark' ? 'bg-primary-600' : 'bg-gray-300'}`}>
              <View className={`w-6 h-6 bg-white rounded-full ${theme === 'dark' ? 'ml-auto' : ''}`} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Actions */}
      <View className="mx-4 mb-6">
        <Text className="text-dark-900 dark:text-white text-lg font-bold mb-3 px-2">
          Account
        </Text>

        <View className="bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-sm">
          <TouchableOpacity className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-dark-700">
            <View className="flex-row items-center">
              <View className="bg-gray-100 dark:bg-dark-700 p-2 rounded-lg mr-4">
                <Feather name="user" size={24} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              </View>
              <Text className="text-dark-900 dark:text-white font-semibold text-base">
                Edit Profile
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-dark-700">
            <View className="flex-row items-center">
              <View className="bg-gray-100 dark:bg-dark-700 p-2 rounded-lg mr-4">
                <Feather name="bell" size={24} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              </View>
              <Text className="text-dark-900 dark:text-white font-semibold text-base">
                Notifications
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
          </TouchableOpacity>

          <TouchableOpacity 
            activeOpacity={0.7}
            className="flex-row items-center justify-between px-6 py-4"
            style={{ minHeight: 68 }}
          >
            <View className="flex-row items-center">
              <View className="bg-gray-100 dark:bg-dark-700 p-2 rounded-lg mr-4">
                <Feather name="help-circle" size={24} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
              </View>
              <Text className="text-dark-900 dark:text-white font-semibold text-base">
                Help & Support
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <View className="mx-4 mb-8">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogout}
          className="bg-error/10 border border-error rounded-2xl px-6 py-4 flex-row items-center justify-center"
          style={{ minHeight: 56 }}
        >
          <Feather name="log-out" size={20} color="#EF4444" />
          <Text className="text-error font-bold text-base ml-2">
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <View className="items-center mb-8">
        <Text className="text-dark-600 dark:text-dark-400 text-sm">
          SkillUp v1.0.0
        </Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
