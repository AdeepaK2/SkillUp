import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'course' | 'announcement' | 'reminder' | 'achievement';
  time: string;
  read: boolean;
}

interface NotificationsState {
  items: Notification[];
}

const initialState: NotificationsState = {
  items: [
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
  ],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.items.find(item => item.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach(item => {
        item.read = true;
      });
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.items.unshift(action.payload);
    },
  },
});

export const { markAsRead, markAllAsRead, addNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
