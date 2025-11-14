import { EducationalItem } from '../types';

// Open Library API Response Types
interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  subject?: string[];
  cover_i?: number;
  ratings_average?: number;
  number_of_pages_median?: number;
  publisher?: string[];
  language?: string[];
}

interface OpenLibraryResponse {
  docs: OpenLibraryBook[];
  numFound: number;
}

// Map Open Library subjects to our categories
const SUBJECT_MAPPING: Record<string, string> = {
  'programming': 'Programming',
  'computer science': 'Programming',
  'javascript': 'Programming',
  'python': 'Programming',
  'web development': 'Programming',
  'design': 'Design',
  'graphic design': 'Design',
  'ui design': 'Design',
  'ux design': 'Design',
  'business': 'Business',
  'management': 'Business',
  'entrepreneurship': 'Business',
  'marketing': 'Marketing',
  'digital marketing': 'Marketing',
  'advertising': 'Marketing',
  'data science': 'Data Science',
  'statistics': 'Data Science',
  'machine learning': 'Data Science',
  'artificial intelligence': 'Data Science',
};

// Subjects to fetch from Open Library
const EDUCATIONAL_SUBJECTS = [
  'programming',
  'javascript',
  'python',
  'web development',
  'design',
  'graphic design',
  'business',
  'management',
  'marketing',
  'data science',
  'machine learning',
];

// Helper function to get category from subjects
const getCategoryFromSubjects = (subjects?: string[]): string => {
  if (!subjects || subjects.length === 0) return 'Programming';
  
  for (const subject of subjects) {
    const lowercaseSubject = subject.toLowerCase();
    for (const [key, value] of Object.entries(SUBJECT_MAPPING)) {
      if (lowercaseSubject.includes(key)) {
        return value;
      }
    }
  }
  
  return 'Programming'; // Default fallback
};

// Helper function to get cover image URL
const getCoverImageUrl = (coverId?: number): string => {
  if (coverId) {
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  }
  // Fallback image
  return 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop';
};

// Helper function to determine item type
const getItemType = (index: number): 'course' | 'workshop' | 'event' => {
  const types: ('course' | 'workshop' | 'event')[] = ['course', 'workshop', 'event'];
  return types[index % 3];
};

// Helper function to determine level
const getLevel = (pages?: number): 'beginner' | 'intermediate' | 'advanced' => {
  if (!pages) return 'beginner';
  if (pages < 200) return 'beginner';
  if (pages < 400) return 'intermediate';
  return 'advanced';
};

// Helper function to calculate duration
const getDuration = (pages?: number, type?: 'course' | 'workshop' | 'event'): string => {
  if (type === 'event') return '2h';
  if (type === 'workshop') return '3-5h';
  
  if (!pages) return '10h';
  const hours = Math.floor(pages / 20); // Rough estimate: 20 pages per hour
  return `${Math.max(5, Math.min(hours, 30))}h`;
};

// Transform Open Library book to EducationalItem
const transformBookToItem = (book: OpenLibraryBook, index: number): EducationalItem => {
  const type = getItemType(index);
  const category = getCategoryFromSubjects(book.subject);
  const level = getLevel(book.number_of_pages_median);
  const instructor = book.author_name?.[0] || 'Expert Instructor';
  
  return {
    id: book.key.replace('/works/', ''),
    title: book.title,
    description: `Master ${category.toLowerCase()} with this comprehensive ${type}. Learn from industry experts and gain practical skills through hands-on projects and real-world examples.`,
    type,
    instructor,
    duration: getDuration(book.number_of_pages_median, type),
    level,
    rating: book.ratings_average ? Math.min(5, Math.max(3, book.ratings_average)) : parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
    thumbnail: getCoverImageUrl(book.cover_i),
    price: type === 'event' ? 0 : Math.floor(Math.random() * 150 + 50),
    category,
    date: type === 'event' ? new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
    location: type !== 'course' ? ['Online', 'New York', 'San Francisco', 'London'][Math.floor(Math.random() * 4)] : undefined,
  };
};

// API service for catalog using Open Library
export const catalogService = {
  // Fetch educational items from Open Library
  async fetchItems(): Promise<EducationalItem[]> {
    try {
      const allItems: EducationalItem[] = [];
      
      // Fetch books from multiple subjects to get variety
      const subjectsToFetch = EDUCATIONAL_SUBJECTS.slice(0, 6); // Fetch from 6 subjects
      
      for (let i = 0; i < subjectsToFetch.length; i++) {
        const subject = subjectsToFetch[i];
        const response = await fetch(
          `https://openlibrary.org/subjects/${subject}.json?limit=5`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.works && data.works.length > 0) {
          const items = data.works.map((work: any, index: number) => 
            transformBookToItem({
              key: work.key,
              title: work.title,
              author_name: work.authors?.map((a: any) => a.name) || [],
              first_publish_year: work.first_publish_year,
              subject: work.subject || [subject],
              cover_i: work.cover_id,
              ratings_average: work.ratings_average,
              number_of_pages_median: work.number_of_pages_median,
            }, i + (i * 5))
          );
          
          allItems.push(...items);
        }
      }
      
      // If we couldn't fetch enough items, add some as fallback
      if (allItems.length < 10) {
        console.warn('Limited items from API, some data may be sparse');
      }
      
      return allItems;
    } catch (error) {
      console.error('Error fetching items from Open Library:', error);
      // Return empty array instead of throwing to prevent app crash
      return [];
    }
  },

  // Search items by query using Open Library search API
  async searchItems(query: string): Promise<EducationalItem[]> {
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: OpenLibraryResponse = await response.json();
      
      return data.docs.map((book, index) => transformBookToItem(book, index));
    } catch (error) {
      console.error('Error searching items:', error);
      return [];
    }
  },

  // Get item by ID (for backwards compatibility)
  async getItemById(id: string): Promise<EducationalItem | null> {
    try {
      const allItems = await this.fetchItems();
      return allItems.find(item => item.id === id) || null;
    } catch (error) {
      console.error('Error fetching item:', error);
      return null;
    }
  },
};
