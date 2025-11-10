import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-dark-900">
      <ActivityIndicator size="large" color="#6366F1" />
      <Text className="text-dark-600 dark:text-dark-300 mt-4 text-base">{message}</Text>
    </View>
  );
};
