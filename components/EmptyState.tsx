import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface EmptyStateProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, message }) => {
  return (
    <View className="flex-1 justify-center items-center px-8 bg-white dark:bg-dark-900">
      <Feather name={icon} size={80} color="#D1D5DB" />
      <Text className="text-dark-900 dark:text-white text-xl font-bold mt-4 text-center">
        {title}
      </Text>
      <Text className="text-dark-600 dark:text-dark-300 text-base mt-2 text-center">
        {message}
      </Text>
    </View>
  );
};
