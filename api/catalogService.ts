import { EducationalItem } from '../types';

// Mock data generator for educational items
const generateMockItems = (): EducationalItem[] => {
  const categories = ['Programming', 'Design', 'Business', 'Marketing', 'Data Science'];
  const instructors = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'David Brown'];
  const levels: ('beginner' | 'intermediate' | 'advanced')[] = ['beginner', 'intermediate', 'advanced'];
  const types: ('course' | 'workshop' | 'event')[] = ['course', 'workshop', 'event'];

  const items: EducationalItem[] = [];

  // Generate 30 items (10 of each type)
  for (let i = 0; i < 30; i++) {
    const type = types[i % 3];
    items.push({
      id: `item-${i + 1}`,
      title: `${type === 'course' ? 'Complete' : type === 'workshop' ? 'Hands-on' : 'Live'} ${categories[i % categories.length]} ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      description: `Learn ${categories[i % categories.length].toLowerCase()} from scratch with this comprehensive ${type}. Master essential skills and techniques through practical examples and real-world projects.`,
      type,
      instructor: instructors[i % instructors.length],
      duration: type === 'course' ? `${Math.floor(Math.random() * 20 + 5)}h` : type === 'workshop' ? '3-5h' : '2h',
      level: levels[i % levels.length],
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0 - 5.0
      thumbnail: `https://picsum.photos/seed/${i + 1}/400/300`,
      price: type === 'event' ? 0 : Math.floor(Math.random() * 150 + 50),
      category: categories[i % categories.length],
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
