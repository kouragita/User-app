# User App - Component Architecture

This document explains how the components in the Next.js user application integrate and work together to create a complete user management system.

## Project Structure

```
src/
├── app/
│   ├── page.tsx (Home page)
│   ├── users/[id]/page.tsx (User detail page)
│   └── add-user/page.tsx (Add user form)
├── components/
│   ├── UserList.tsx
│   ├── UserCard.tsx
│   ├── SearchBar.tsx
│   ├── FavoritesToggle.tsx
│   └── LoadingSpinner.tsx
├── services/
│   └── userService.ts
├── types/
│   └── user.ts
```

## Component Integration Overview

The application follows a hierarchical component structure where the main page (`page.tsx`) serves as the central hub that manages state and orchestrates all other components.

```
Home Page (page.tsx)
├── SearchBar
├── FavoritesToggle
├── UserList
│   └── UserCard (multiple instances)
└── LoadingSpinner (conditionally rendered)

User Detail Page (users/[id]/page.tsx)
└── LoadingSpinner (conditionally rendered)

Add User Page (add-user/page.tsx)
└── Form elements
```

## Detailed Component Breakdown

### 1. Home Page (src/app/page.tsx)

**Role**: Central state management and component orchestration

**Key Responsibilities**:
- Fetches initial user data from the API
- Manages global state (users, favorites, search term, filters)
- Handles loading and error states
- Coordinates the interaction between all child components

**State Management**:
- `users`: Complete list of users from API
- `filteredUsers`: Users after applying search/favorite filters
- `favorites`: Array of user IDs marked as favorites
- `loading`: Loading state during API fetch
- `error`: Error message if API fetch fails
- `searchTerm`: Current search input value
- `showFavoritesOnly`: Boolean for favorites filter toggle

**Data Flow**:
1. On mount, calls `fetchUsers()` service
2. Stores complete user list in state
3. Applies filters to create `filteredUsers`
4. Passes props to child components

### 2. UserList (src/components/UserList.tsx)

**Role**: Container for displaying multiple UserCard components

**Props**:
- `users`: Array of users to display
- `favorites`: Array of favorite user IDs
- `onToggleFavorite`: Function to handle favorite toggling

**Integration**:
- Receives filtered user list from Home Page
- Maps over users to create UserCard components
- Passes individual user data and handlers to each card

### 3. UserCard (src/components/UserCard.tsx)

**Role**: Individual user display component with interaction capabilities

**Props**:
- `user`: Single user object to display
- `isFavorite`: Boolean indicating if user is favorited
- `onToggleFavorite`: Handler for favorite toggle

**Key Features**:
- Displays user name (as link to detail page)
- Shows email and company name
- Favorite toggle button (🤍/❤️)
- Responsive design with hover effects

**Integration**:
- Links to `/users/[id]` for detail view
- Calls `onToggleFavorite` when heart button is clicked

### 4. SearchBar (src/components/SearchBar.tsx)

**Role**: Input component for filtering users by name

**Props**:
- `searchTerm`: Current search value
- `onSearchChange`: Handler for input changes

**Integration**:
- Controlled input that updates Home Page state
- Triggers filtering in Home Page via useEffect

### 5. FavoritesToggle (src/components/FavoritesToggle.tsx)

**Role**: Toggle switch for showing only favorite users

**Props**:
- `showFavoritesOnly`: Current toggle state
- `onToggle`: Handler for toggle changes

**Integration**:
- Updates Home Page state when toggled
- Triggers filtering in Home Page via useEffect

### 6. LoadingSpinner (src/components/LoadingSpinner.tsx)

**Role**: Visual indicator during API operations

**Integration**:
- Conditionally rendered by pages during loading states
- Purely presentational component

### 7. User Detail Page (src/app/users/[id]/page.tsx)

**Role**: Detailed view of a single user

**Key Responsibilities**:
- Fetches individual user data based on ID parameter
- Displays comprehensive user information
- Handles loading and error states for individual user

**Integration**:
- Uses Next.js dynamic routes (`[id]`)
- Calls `fetchUserById()` service
- Provides navigation back to home page

### 8. Add User Page (src/app/add-user/page.tsx)

**Role**: Form for creating new (mock) users

**Key Responsibilities**:
- Collects user information via form
- Handles form validation and submission
- Simulates user creation (redirects to home)

**Integration**:
- Collects data in local state
- Provides navigation back to home page
- Doesn't actually persist data (as per requirements)

## Services Layer

### userService (src/services/userService.ts)

**Role**: API communication layer

**Functions**:
- `fetchUsers()`: Retrieves all users from JSONPlaceholder API
- `fetchUserById(id)`: Retrieves specific user by ID

**Integration**:
- Used by Home Page for initial data load
- Used by User Detail Page for individual user data

## Types Layer

### user types (src/types/user.ts)

**Role**: TypeScript type definitions

**Interfaces**:
- `User`: Complete user object structure from API
- `UserFormData`: Structure for form input data

## Data Flow Summary

1. **Application Start**:
   - Home Page mounts and calls `fetchUsers()`
   - API response populates `users` state
   - `useEffect` triggers filtering to create `filteredUsers`

2. **User Interaction**:
   - Search input updates `searchTerm` → triggers filtering
   - Favorites toggle updates `favorites` array → triggers filtering
   - Show Favorites Only toggle updates state → triggers filtering
   - Favorite buttons call handler → updates `favorites` array

3. **Navigation**:
   - UserCard links navigate to detail pages
   - Detail pages fetch individual user data
   - Add User link navigates to form page

4. **State Updates**:
   - All state changes trigger re-renders
   - Filtering happens in `useEffect` when dependencies change
   - Child components receive updated data via props

## Styling

All components use Tailwind CSS classes for styling, providing:
- Responsive design
- Consistent visual language
- Hover and focus states
- Loading states
- Error states

