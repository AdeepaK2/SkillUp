import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { Notification } from '@/store/slices/notificationsSlice';
import { markAllAsRead, markAsRead } from '@/store/slices/notificationsSlice';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.mode);
  const notifications = useAppSelector((state) => state.notifications.items);

  const hiddenData = [
    {
      id: '1',
      title: 'New Course Available',
      message: 'Advanced React Native Development course is now available!',
      type: 'course',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      title: 'Course Reminder',
      message: 'Don\'t forget to complete your JavaScript Fundamentals course',
      type: 'reminder',
      time: '5 hours ago',
      read: false,
    },
    {
      id: '3',
      title: 'Achievement Unlocked!',
      message: 'Congratulations! You\'ve completed 3 courses this month',
      type: 'achievement',
      time: '1 day ago',
      read: true,
    },
    {
      id: '4',
      title: 'System Announcement',
      message: 'SkillUp will undergo maintenance on Sunday, 12 AM - 2 AM',
      type: 'announcement',
      time: '2 days ago',
      read: true,
    },
    {
      id: '5',
      title: 'New Workshop',
      message: 'UI/UX Design Workshop starts next Monday. Register now!',
      type: 'course',
      time: '3 days ago',
      read: true,
    },
    {
      id: '6',
      title: 'Course Update',
      message: 'Python for Data Science course has new content added',
      type: 'course',
      time: '4 days ago',
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'course':
        return 'book';
      case 'announcement':
        return 'megaphone';
      case 'reminder':
        return 'clock';
      case 'achievement':
        return 'award';
      default:
        return 'bell';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'course':
        return '#17B5A3';
      case 'announcement':
        return '#F59E0B';
      case 'reminder':
        return '#3B82F6';
      case 'achievement':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleMarkAsRead(item.id)}
      style={{
        backgroundColor: item.read 
          ? (theme === 'dark' ? '#1E293B' : '#FFFFFF')
          : (theme === 'dark' ? '#0F172A' : '#F0FDFA'),
        borderLeftWidth: 4,
        borderLeftColor: item.read ? 'transparent' : getNotificationColor(item.type),
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: `${getNotificationColor(item.type)}20`,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 12,
        }}
      >
        <Feather
          name={getNotificationIcon(item.type) as any}
          size={20}
          color={getNotificationColor(item.type)}
        />
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              color: theme === 'dark' ? '#FFFFFF' : '#1E293B',
              flex: 1,
            }}
          >
            {item.title}
          </Text>
          {!item.read && (
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#17B5A3',
                marginLeft: 8,
                marginTop: 4,
              }}
            />
          )}
        </View>
        <Text
          style={{
            fontSize: 14,
            color: theme === 'dark' ? '#94A3B8' : '#64748B',
            lineHeight: 20,
            marginBottom: 6,
          }}
        >
          {item.message}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: theme === 'dark' ? '#64748B' : '#94A3B8',
          }}
        >
          {item.time}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView 
      className="flex-1 bg-gray-50 dark:bg-dark-900" 
      edges={['top']}
    >
      {/* Header */}
      <View
        style={{
          backgroundColor: theme === 'dark' ? '#1E293B' : '#FFFFFF',
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme === 'dark' ? '#334155' : '#E2E8F0',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
            <Feather name="arrow-left" size={24} color={theme === 'dark' ? '#FFFFFF' : '#1E293B'} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: theme === 'dark' ? '#FFFFFF' : '#1E293B',
              }}
            >
              Notifications
            </Text>
          </View>
          {unreadCount > 0 && (
            <TouchableOpacity
              onPress={handleMarkAllAsRead}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 8,
                backgroundColor: theme === 'dark' ? '#334155' : '#F1F5F9',
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: '#17B5A3',
                }}
              >
                Mark all read
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        {unreadCount > 0 && (
          <Text
            style={{
              fontSize: 14,
              color: theme === 'dark' ? '#94A3B8' : '#64748B',
            }}
          >
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </Text>
        )}
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 16 }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingVertical: 60 }}>
            <Feather name="bell-off" size={64} color={theme === 'dark' ? '#475569' : '#CBD5E1'} />
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: theme === 'dark' ? '#94A3B8' : '#64748B',
                marginTop: 16,
              }}
            >
              No notifications
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: theme === 'dark' ? '#64748B' : '#94A3B8',
                marginTop: 8,
              }}
            >
              You're all caught up!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
