# SkillUp - Education Tech Platform 🎓

<div align="center">
  <img src="./assets/images/icon.png" alt="SkillUp Logo" width="120" height="120" />
  <h3>Browse, Learn, and Grow with SkillUp</h3>
  <p>A modern cross-platform mobile app for discovering and managing online courses, workshops, and educational events</p>
  
  ![React Native](https://img.shields.io/badge/React_Native-0.81.5-61DAFB?logo=react)
  ![Expo](https://img.shields.io/badge/Expo-~54.0-000020?logo=expo)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
  ![Redux](https://img.shields.io/badge/Redux_Toolkit-2.10-764ABC?logo=redux)
  ![License](https://img.shields.io/badge/License-Educational-green)
</div>

---

## 📱 About SkillUp

**SkillUp** is a full-featured education technology mobile application built with React Native and Expo. It provides a seamless experience for users to discover educational content from the **Open Library API**, manage their learning journey, and track their progress - all with a beautiful, responsive interface that supports dark mode.

This project was developed as part of the **IN3210 Mobile Applications Development** course, demonstrating industry-standard practices in cross-platform mobile development.

---

## ✨ Key Features

### 🔐 **Authentication & Security**
- Secure user registration and login system
- Email validation with regex (requires TLD)
- Password validation (minimum 6 characters)
- Confirm password matching
- Persistent authentication state with AsyncStorage
- Auto-navigation based on auth status

### 🌐 **Real API Integration**
- **Open Library API** integration
- Fetches real educational books from 6+ subjects
- ~30 courses/workshops/events available
- Error handling and loading states
- Pull-to-refresh functionality

### 🎨 **Beautiful UI/UX**
- **Dark mode** support with theme persistence
- Responsive design for all screen sizes
- **NativeWind** (Tailwind CSS for React Native)
- **Feather Icons** throughout the app
- Touch targets meet accessibility standards (44x44 pts)
- Smooth animations and transitions
- Professional card layouts with shadows

### 🔍 **Smart Search & Filtering**
- Real-time search across title, description, category, instructor
- Category filter pills (All, Programming, Design, Business, Marketing, Data Science)
- Debounced search for performance optimization
- Combined search + category filtering

### ❤️ **Favourites System**
- Add/remove items to favourites
- Persistent storage with AsyncStorage
- Dedicated favourites screen
- Heart icon with fill animation

### 📚 **Learning Management**
- Enroll in courses, workshops, events
- "My Learning" screen with enrolled items
- Filter enrolled items by type
- Progress tracking (courses enrolled, favourites saved)

### 👤 **User Profile**
- Display username and email
- View stats (enrolled, favourites, completed)
- Dark mode toggle with visual switch
- Settings management
- Logout functionality

### 📊 **State Management**
- **Redux Toolkit** with 5 slices:
  - `authSlice` - Authentication state
  - `catalogSlice` - Educational items
  - `favouritesSlice` - Saved items
  - `enrollmentsSlice` - Enrolled courses
  - `themeSlice` - Dark/light mode
- Typed hooks (`useAppDispatch`, `useAppSelector`)
- AsyncStorage persistence for all slices

---

## 🛠️ Tech Stack

<table>
<tr>
<td>

### **Core**
- React Native 0.81.5
- Expo SDK ~54.0
- TypeScript 5.9
- Expo Router 6.0
- React 19.1.0

</td>
<td>

### **State & Data**
- Redux Toolkit 2.10
- React Redux 9.2
- AsyncStorage 2.2
- Axios 1.13

</td>
</tr>
<tr>
<td>

### **UI & Styling**
- NativeWind 4.2
- Tailwind CSS 3.4
- Feather Icons
- Expo Vector Icons

</td>
<td>

### **Forms & Validation**
- Formik 2.4
- Yup 1.7

</td>
</tr>
<tr>
<td>

### **Navigation**
- React Navigation 7.1
- Native Stack 7.6
- Bottom Tabs 7.4

</td>
<td>

### **Development**
- ESLint
- TypeScript
- Expo DevTools

</td>
</tr>
</table>

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn**
- **Expo Go** app on your phone (iOS/Android) - [Download](https://expo.dev/go)
- **iOS Simulator** (Mac only) or **Android Studio** (for emulator)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AdeepaK2/SkillUp.git
   cd SkillUp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run on your device/emulator:**
   - **iOS Simulator (Mac only):** Press `i`
   - **Android Emulator:** Press `a`
   - **Physical Device:** Scan QR code with Expo Go app

---

## 📂 Project Structure

```
SkillUp/
├── 📱 app/                          # Expo Router (file-based routing)
│   ├── (auth)/                      # Authentication group
│   │   ├── login.tsx                # Login screen
│   │   ├── register.tsx             # Register screen
│   │   └── _layout.tsx              # Auth layout
│   ├── (tabs)/                      # Main app tabs
│   │   ├── index.tsx                # Home screen
│   │   ├── learning.tsx             # My Learning screen
│   │   ├── favourites.tsx           # Favourites screen
│   │   ├── profile.tsx              # Profile screen
│   │   ├── explore.tsx              # Explore screen
│   │   └── _layout.tsx              # Tab layout
│   ├── details.tsx                  # Item details screen
│   └── _layout.tsx                  # Root layout with Redux
│
├── 🎯 features/                     # Feature-based architecture
│   ├── auth/screens/                # Authentication screens
│   ├── catalog/screens/             # Home & Details screens
│   ├── favourites/screens/          # Favourites screen
│   ├── learning/screens/            # My Learning screen
│   └── profile/screens/             # Profile screen
│
├── 🏪 store/                        # Redux store
│   ├── slices/                      # Redux slices
│   │   ├── authSlice.ts
│   │   ├── catalogSlice.ts
│   │   ├── favouritesSlice.ts
│   │   ├── enrollmentsSlice.ts
│   │   └── themeSlice.ts
│   ├── hooks.ts                     # Typed Redux hooks
│   └── index.ts                     # Store configuration
│
├── 🌐 api/                          # API services
│   ├── authService.ts               # Mock authentication
│   └── catalogService.ts            # Open Library API
│
├── 🧩 components/                   # Reusable components
│   ├── CourseCard.tsx               # Course card component
│   ├── EmptyState.tsx               # Empty state component
│   ├── LoadingSpinner.tsx           # Loading spinner
│   └── FilterChips.tsx              # Filter chips
│
├── 🛠️ utils/                        # Utility functions
│   ├── constants.ts                 # App constants
│   ├── filterHelpers.ts             # Filter functions
│   ├── validators.ts                # Validation helpers
│   ├── formatters.ts                # Data formatters
│   └── index.ts                     # Barrel exports
│
├── 🪝 hooks/                        # Custom hooks
│   └── useDebounce.ts               # Debounce hook
│
├── 📝 types/                        # TypeScript types
│   └── index.ts                     # Type definitions
│
├── 🎨 assets/                       # Static assets
│   └── images/                      # Images and icons
│
└── ⚙️ Config Files
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.js
    ├── app.json
    └── README.md
```

---

## 📱 App Screens

### Authentication Flow
- **Login Screen** - Email & password authentication with validation
- **Register Screen** - User registration with username, email, password, and confirm password

### Main App (Bottom Tabs)
1. **Home Screen**
   - Welcome card with user info
   - Stats cards (enrolled, favourites, completed)
   - Continue Learning section (horizontal scroll)
   - Explore New section with search & category filters
   - Course count display

2. **My Learning Screen**
   - View all enrolled courses
   - Filter by type (All, Courses, Workshops, Events)
   - Empty state for no enrollments

3. **Favourites Screen**
   - View saved items
   - Empty state for no favourites
   - Quick access to favourited content

4. **Profile Screen**
   - User avatar with initials
   - Username and email display
   - Stats overview (favourites, enrolled, completed)
   - Dark mode toggle with animated switch
   - Settings options (Edit Profile, Notifications, Help & Support)
   - Logout button with confirmation

### Modal/Stack Screens
- **Details Screen**
   - Full item information
   - Hero image with back and favourite buttons
   - Type badge and rating
   - Instructor, duration, level, category info
   - Description and "What you'll learn" section
   - Price and enroll button

---

## 🎨 Design System

### Color Palette
```javascript
{
  primary: '#6366F1',      // Indigo
  secondary: '#EC4899',    // Pink
  success: '#10B981',      // Green
  warning: '#F59E0B',      // Amber
  error: '#EF4444',        // Red
  dark: {
    900: '#111827',
    800: '#1F2937',
    700: '#374151',
  }
}
```

### Typography
- Headings: Bold, system font
- Body: Regular, system font
- Font sizes: 12px - 40px

### Spacing
- Based on 4px/8px grid system
- Consistent padding: `px-5` horizontal
- Touch targets: Minimum 44x44 points

---

## 🔧 Configuration

### Environment Setup
No environment variables required - uses public Open Library API.

### Tailwind Configuration
Custom colors and dark mode configuration in `tailwind.config.js`:
```javascript
module.exports = {
  darkMode: 'class',
  // ... custom theme
}
```

### TypeScript Path Aliases
Configured in `tsconfig.json`:
```json
{
  "paths": {
    "@/*": ["./*"]
  }
}
```

---

## 📊 State Management Architecture

### Redux Slices

**1. Auth Slice**
- Manages user authentication state
- Actions: `loginStart`, `loginSuccess`, `loginFailure`, `registerStart`, `registerSuccess`, `registerFailure`, `logout`, `restoreUser`
- Persists to AsyncStorage

**2. Catalog Slice**
- Manages educational items from API
- Actions: `fetchItemsStart`, `fetchItemsSuccess`, `fetchItemsFailure`
- Stores course/workshop/event data

**3. Favourites Slice**
- Manages saved items
- Actions: `addFavourite`, `removeFavourite`, `toggleFavourite`, `restoreFavourites`
- Persists to AsyncStorage

**4. Enrollments Slice**
- Manages enrolled courses
- Actions: `toggleEnrollment`, `setEnrollments`
- Persists to AsyncStorage

**5. Theme Slice**
- Manages dark/light mode
- Actions: `setTheme`, `toggleTheme`, `restoreTheme`
- Persists to AsyncStorage

---

## 🌐 API Integration

### Open Library API
```typescript
// Fetch educational books by subject
GET https://openlibrary.org/subjects/{subject}.json?limit=5

// Subjects fetched:
- programming
- javascript
- python
- web development
- design
- graphic design
- business
- management
- marketing
- data science
- machine learning
```

### Data Transformation
- Maps Open Library books to `EducationalItem` type
- Generates course types (Course/Workshop/Event)
- Assigns categories based on subjects
- Calculates difficulty levels based on page count
- Generates cover images from Open Library

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo development server |
| `npm run android` | Run on Android emulator/device |
| `npm run ios` | Run on iOS simulator (Mac only) |
| `npm run web` | Run in web browser |
| `npm run lint` | Run ESLint |
| `npm run reset-project` | Reset project to initial state |

---

## 🧪 Code Quality & Best Practices

### Architecture Patterns
✅ **Feature-based folder structure**  
✅ **Separation of concerns** (UI, business logic, state)  
✅ **Pure functions** for testability  
✅ **Custom hooks** for logic reuse  
✅ **Modular components**  

### TypeScript
✅ Full type coverage  
✅ Typed Redux hooks  
✅ Interface definitions  
✅ Strict mode enabled  

### Performance
✅ `useCallback` for event handlers  
✅ `useMemo` for expensive calculations  
✅ Debounced search input  
✅ FlatList for efficient rendering  
✅ Image optimization  

### Security
✅ Proper form validation  
✅ Secure password handling  
✅ AsyncStorage encryption  
✅ Input sanitization  

---

## 🔮 Future Enhancements

- [ ] Backend API integration
- [ ] Video player for course content
- [ ] Payment gateway integration
- [ ] Progress tracking and certificates
- [ ] Social features (reviews, ratings, comments)
- [ ] Offline mode
- [ ] Push notifications
- [ ] In-app messaging
- [ ] Gamification (badges, streaks)
- [ ] Multi-language support

---

## 📄 License

MIT License - Open source and free to use.

---

## 🙏 Acknowledgments

- **Open Library API** for providing educational content
- **Expo** team for the amazing development framework
- **React Native** community for excellent documentation
- **Redux Toolkit** for simplified state management
- **NativeWind** for bringing Tailwind to React Native

---

<div align="center">
  <h3>Happy Learning! 🎓✨</h3>
  <p>Built with ❤️ using React Native & Expo</p>
</div>
