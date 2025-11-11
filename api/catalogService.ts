import { EducationalItem } from '../types';

// Mock data generator for educational items
const generateMockItems = (): EducationalItem[] => {
  const categories = ['Programming', 'Design', 'Business', 'Marketing', 'Data Science'];
  const instructors = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'David Brown'];
  const levels: ('beginner' | 'intermediate' | 'advanced')[] = ['beginner', 'intermediate', 'advanced'];
  const types: ('course' | 'workshop' | 'event')[] = ['course', 'workshop', 'event'];

  // High-quality tech-related images from Unsplash
  const categoryImages: Record<string, string[]> = {
    'Programming': [
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=300&fit=crop',
    ],
    'Design': [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop',
    ],
    'Business': [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
    ],
    'Marketing': [
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=400&h=300&fit=crop',
    ],
    'Data Science': [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    ],
  };

  const items: EducationalItem[] = [];

  // Generate 30 items (10 of each type)
  for (let i = 0; i < 30; i++) {
    const type = types[i % 3];
    const category = categories[i % categories.length];
    const categoryImageArray = categoryImages[category];
    const imageIndex = Math.floor(i / categories.length) % categoryImageArray.length;
    
    items.push({
      id: `item-${i + 1}`,
      title: `${type === 'course' ? 'Complete' : type === 'workshop' ? 'Hands-on' : 'Live'} ${category} ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      description: `Learn ${category.toLowerCase()} from scratch with this comprehensive ${type}. Master essential skills and techniques through practical examples and real-world projects.`,
      type,
      instructor: instructors[i % instructors.length],
      duration: type === 'course' ? `${Math.floor(Math.random() * 20 + 5)}h` : type === 'workshop' ? '3-5h' : '2h',
      level: levels[i % levels.length],
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0 - 5.0
      thumbnail: categoryImageArray[imageIndex],
      price: type === 'event' ? 0 : Math.floor(Math.random() * 150 + 50),
      category: category,
      date: type === 'event' ? new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
      location: type !== 'course' ? ['Online', 'New York', 'San Francisco', 'London'][Math.floor(Math.random() * 4)] : undefined,
    });
  }

  return items;
};

// API service for catalog
export const catalogService = {
  // Fetch all educational items
  async fetchItems(): Promise<EducationalItem[]> {
    try {
      // Using mock data instead of Open Library API
      // In a real app, you would fetch from your backend
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(generateMockItems());
        }, 1000); // Simulate network delay
      });
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  // Search items by query
  async searchItems(query: string): Promise<EducationalItem[]> {
    try {
      const allItems = await this.fetchItems();
      return allItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching items:', error);
      throw error;
    }
  },

  // Get item by ID
  async getItemById(id: string): Promise<EducationalItem | null> {
    try {
      const allItems = await this.fetchItems();
      return allItems.find(item => item.id === id) || null;
    } catch (error) {
      console.error('Error fetching item:', error);
      throw error;
    }
  },
};
