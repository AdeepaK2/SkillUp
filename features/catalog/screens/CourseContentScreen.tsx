import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@/store/hooks';
import type { EducationalItem } from '@/types';

const { width } = Dimensions.get('window');

interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'pdf';
  duration?: string;
  size?: string;
  completed: boolean;
}

export default function CourseContentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const theme = useAppSelector((state) => state.theme.mode);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  const item: EducationalItem = params.itemData 
    ? JSON.parse(params.itemData as string) 
    : null;

  // Mock content for the course
  const courseContent: ContentItem[] = [
    {
      id: '1',
      title: 'Introduction to the Course',
      type: 'video',
      duration: '5:30',
      completed: false,
    },
    {
      id: '2',
      title: 'Getting Started Guide',
      type: 'pdf',
      size: '2.5 MB',
      completed: false,
    },
    {
      id: '3',
      title: 'Core Concepts Overview',
      type: 'video',
      duration: '12:45',
      completed: false,
    },
    {
      id: '4',
      title: 'Best Practices Handbook',
      type: 'pdf',
      size: '4.1 MB',
      completed: false,
    },
    {
      id: '5',
      title: 'Advanced Techniques',
      type: 'video',
      duration: '18:20',
      completed: false,
    },
    {
      id: '6',
      title: 'Practical Examples',
      type: 'video',
      duration: '10:15',
      completed: false,
    },
    {
      id: '7',
      title: 'Reference Materials',
      type: 'pdf',
      size: '1.8 MB',
      completed: false,
    },
    {
      id: '8',
      title: 'Final Project Guidelines',
      type: 'pdf',
      size: '3.2 MB',
      completed: false,
    },
  ];

  const handleContentPress = (content: ContentItem) => {
    setSelectedContent(content);
    
    if (content.type === 'video') {
      // Mark as completed when video is opened
      if (!completedItems.includes(content.id)) {
        setCompletedItems([...completedItems, content.id]);
      }
    } else {
      Alert.alert(
        'Open PDF',
        `Would you like to open "${content.title}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open',
            onPress: () => {
              if (!completedItems.includes(content.id)) {
                setCompletedItems([...completedItems, content.id]);
              }
              Alert.alert('PDF Viewer', 'PDF viewer would open here');
            },
          },
        ]
      );
    }
  };

  const videoCount = courseContent.filter(c => c.type === 'video').length;
  const pdfCount = courseContent.filter(c => c.type === 'pdf').length;
  const progress = (completedItems.length / courseContent.length) * 100;

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
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme === 'dark' ? '#334155' : '#E2E8F0',
        }}
      >
        <TouchableOpacity 
          onPress={() => router.back()}
          style={{ marginBottom: 12 }}
        >
          <Feather name="arrow-left" size={24} color={theme === 'dark' ? '#FFFFFF' : '#1E293B'} />
        </TouchableOpacity>
        
        <Text 
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: theme === 'dark' ? '#FFFFFF' : '#1E293B',
            marginBottom: 8,
          }}
          numberOfLines={2}
        >
          {item?.title || 'Course Content'}
        </Text>

        {/* Progress Bar */}
        <View style={{ marginTop: 12 }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            marginBottom: 8,
          }}>
            <Text style={{ 
              fontSize: 14, 
              color: theme === 'dark' ? '#94A3B8' : '#64748B',
            }}>
              Progress
            </Text>
            <Text style={{ 
              fontSize: 14, 
              fontWeight: '600',
              color: '#17B5A3',
            }}>
              {completedItems.length}/{courseContent.length} completed
            </Text>
          </View>
          <View style={{
            height: 8,
            backgroundColor: theme === 'dark' ? '#334155' : '#E2E8F0',
            borderRadius: 4,
            overflow: 'hidden',
          }}>
            <View style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#17B5A3',
              borderRadius: 4,
            }} />
          </View>
        </View>

        {/* Stats */}
        <View style={{ 
          flexDirection: 'row', 
          marginTop: 16,
          gap: 16,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="play-circle" size={16} color="#17B5A3" />
            <Text style={{ 
              marginLeft: 6,
              fontSize: 14,
              color: theme === 'dark' ? '#CBD5E1' : '#475569',
            }}>
              {videoCount} Videos
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="file-text" size={16} color="#17B5A3" />
            <Text style={{ 
              marginLeft: 6,
              fontSize: 14,
              color: theme === 'dark' ? '#CBD5E1' : '#475569',
            }}>
              {pdfCount} PDFs
            </Text>
          </View>
        </View>
      </View>

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Video Player Section */}
        {selectedContent && selectedContent.type === 'video' && (
          <View style={{ 
            margin: 16,
            borderRadius: 16,
            overflow: 'hidden',
            backgroundColor: '#000',
          }}>
            {/* Mock Video Player */}
            <View style={{
              width: '100%',
              aspectRatio: 16 / 9,
              backgroundColor: '#1E293B',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Feather name="play-circle" size={64} color="#17B5A3" />
              <Text style={{ 
                color: '#FFFFFF',
                marginTop: 16,
                fontSize: 16,
                fontWeight: '600',
              }}>
                {selectedContent.title}
              </Text>
              <Text style={{ 
                color: '#94A3B8',
                marginTop: 4,
                fontSize: 14,
              }}>
                Duration: {selectedContent.duration}
              </Text>
            </View>
            
            {/* Video Controls */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: 16,
              backgroundColor: theme === 'dark' ? '#1E293B' : '#FFFFFF',
            }}>
              <TouchableOpacity>
                <Feather name="skip-back" size={28} color="#17B5A3" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="play" size={36} color="#17B5A3" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name="skip-forward" size={28} color="#17B5A3" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Content List */}
        <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: theme === 'dark' ? '#FFFFFF' : '#1E293B',
            marginBottom: 12,
          }}>
            Course Materials
          </Text>

          {courseContent.map((content, index) => {
            const isCompleted = completedItems.includes(content.id);
            const isSelected = selectedContent?.id === content.id;
            
            return (
              <TouchableOpacity
                key={content.id}
                activeOpacity={0.7}
                onPress={() => handleContentPress(content)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: isSelected 
                    ? (theme === 'dark' ? '#17B5A3' : '#E6F7F5')
                    : (theme === 'dark' ? '#1E293B' : '#FFFFFF'),
                  padding: 16,
                  borderRadius: 12,
                  marginBottom: 12,
                  borderWidth: 1,
                  borderColor: isSelected 
                    ? '#17B5A3'
                    : (theme === 'dark' ? '#334155' : '#E2E8F0'),
                }}
              >
                {/* Icon */}
                <View style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: isSelected
                    ? (theme === 'dark' ? '#0B3D5C' : '#17B5A3')
                    : (content.type === 'video' 
                      ? (theme === 'dark' ? '#334155' : '#E6F7F5')
                      : (theme === 'dark' ? '#334155' : '#FEF3C7')),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 12,
                }}>
                  <Feather
                    name={content.type === 'video' ? 'play-circle' : 'file-text'}
                    size={22}
                    color={isSelected 
                      ? '#FFFFFF'
                      : (content.type === 'video' ? '#17B5A3' : '#F59E0B')}
                  />
                </View>

                {/* Content Info */}
                <View style={{ flex: 1 }}>
                  <Text style={{
                    fontSize: 15,
                    fontWeight: '600',
                    color: isSelected
                      ? (theme === 'dark' ? '#FFFFFF' : '#0B3D5C')
                      : (theme === 'dark' ? '#FFFFFF' : '#1E293B'),
                    marginBottom: 4,
                  }}>
                    {content.title}
                  </Text>
                  <Text style={{
                    fontSize: 13,
                    color: isSelected
                      ? (theme === 'dark' ? '#CBD5E1' : '#64748B')
                      : (theme === 'dark' ? '#94A3B8' : '#64748B'),
                  }}>
                    {content.type === 'video' 
                      ? `Video • ${content.duration}`
                      : `PDF • ${content.size}`}
                  </Text>
                </View>

                {/* Completion Badge */}
                {isCompleted && (
                  <View style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: '#10B981',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 8,
                  }}>
                    <Feather name="check" size={14} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
