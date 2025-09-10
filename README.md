# Next.js and TypeScript Essentials

This guide covers the fundamental concepts you need to know about Next.js and TypeScript to get started with modern React development.

## What is Next.js?

Next.js is a React-based framework that provides a powerful set of features for building production-ready web applications:

- **Server-Side Rendering (SSR)**: Renders pages on the server for better SEO and performance
- **Static Site Generation (SSG)**: Pre-render pages at build time for maximum performance
- **File-Based Routing**: Automatic route creation based on file structure
- **API Routes**: Create API endpoints as serverless functions within the same project
- **Image Optimization**: Automatic image optimization with the `next/image` component
- **Fast Refresh**: Instant feedback on code changes without losing component state
- **Built-in CSS Support**: Support for CSS modules, styled-jsx, and popular CSS-in-JS libraries
- **TypeScript Support**: First-class TypeScript integration with zero configuration

## TypeScript Basics

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds static typing to help catch errors early and improve code quality:

### Key Benefits
- Early bug detection at compile time
- Better autocompletion and IDE support
- Improved code documentation through types
- Easier refactoring and maintenance
- Enhanced collaboration in teams

### Basic Types
```typescript
// Primitive types
let name: string = "Alice";
let age: number = 30;
let isStudent: boolean = true;

// Arrays
let hobbies: string[] = ["reading", "swimming"];
let scores: Array<number> = [95, 85, 75];

// Objects
let person: { name: string; age: number } = {
  name: "Bob",
  age: 25
};

// Functions
function add(a: number, b: number): number {
  return a + b;
}

// Interfaces
interface User {
  id: number;
  name: string;
  email?: string; // Optional property
}

// Custom types
type Status = "pending" | "approved" | "rejected";
```

## Next.js File-Based Routing

Next.js uses a file-system based router where routes are automatically created based on file names:

```
pages/
├── index.tsx          → /
├── about.tsx          → /about
├── blog/
│   ├── index.tsx      → /blog
│   └── [slug].tsx     → /blog/:slug (dynamic route)
└── products/
    ├── index.tsx      → /products
    └── [id].tsx       → /products/:id (dynamic route)
```

### Special Files
- `index.tsx`: The main page for a directory
- `[slug].tsx`: Dynamic routes using parameters
- `_app.tsx`: Custom App component to initialize pages
- `_document.tsx`: Custom Document component to augment application's `<html>` and `<body>` tags

## Data Fetching Methods

Next.js provides several functions for data fetching:

### getStaticProps
- Fetches data at build time
- Generates static HTML for better performance
- Ideal for content that doesn't change frequently

```typescript
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return {
    props: { data },
    revalidate: 60 // Regenerate page at most once per minute
  };
}
```

### getStaticPaths
- Specifies which paths to pre-render for dynamic routes
- Used with `getStaticProps` for dynamic pages

```typescript
export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() }
  }));
  
  return { paths, fallback: 'blocking' };
}
```

### getServerSideProps
- Fetches data on each request
- Server-side rendering with real-time data
- Slower than static generation but more flexible

```typescript
export async function getServerSideProps(context) {
  const res = await fetch(`https://api.example.com/data/${context.query.id}`);
  const data = await res.json();
  
  return {
    props: { data }
  };
}
```

### Client-side Fetching
- For data that doesn't need to be pre-rendered
- Useful for user-specific data
- Can use libraries like SWR or React Query

```typescript
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher);
  
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  
  return <div>Hello {data.name}!</div>;
}
```

## Component Structure

### Function Components with TypeScript
```typescript
import { useState } from 'react';

interface Props {
  title: string;
  count?: number;
}

export default function Counter({ title, count = 0 }: Props) {
  const [currentCount, setCurrentCount] = useState(count);
  
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {currentCount}</p>
      <button onClick={() => setCurrentCount(currentCount + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### Using Hooks with TypeScript
```typescript
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Styling in Next.js

### CSS Modules
```css
/* styles/Button.module.css */
.button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
}
```

```typescript
// components/Button.tsx
import styles from '../styles/Button.module.css';

export default function Button({ children }) {
  return (
    <button className={styles.button}>
      {children}
    </button>
  );
}
```

### Global Styles
Import global styles in `pages/_app.tsx`:
```typescript
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

## TypeScript with React Patterns

### Typing Props
```typescript
interface ProductProps {
  name: string;
  price: number;
  onAddToCart: (id: number) => void;
}

const Product: React.FC<ProductProps> = ({ name, price, onAddToCart }) => {
  // Component implementation
};
```

### Typing Events
```typescript
function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  // Handle form submission
}

function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  // Handle input change
}
```

### Typing Refs
```typescript
import { useRef } from 'react';

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const focusInput = () => {
    inputRef.current?.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

## Deployment Considerations

### Vercel (Recommended)
- One-click deployment from GitHub
- Automatic CI/CD
- Global CDN
- Automatic HTTPS
- Preview deployments for pull requests

### Other Hosting Options
- Traditional Node.js servers
- Docker containers
- Static export for SPA hosting

### Environment Variables
Create a `.env.local` file for environment variables:
```
API_URL=https://api.example.com
NEXT_PUBLIC_API_KEY=your_api_key
```

Variables prefixed with `NEXT_PUBLIC_` are embedded in the browser.

## Getting Started Commands

```bash
# Create a new Next.js app with TypeScript
npx create-next-app@latest my-app --typescript

# Navigate to the project directory
cd my-app

# Start the development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Essential Packages

Some commonly used packages in Next.js + TypeScript projects:

```bash
# HTTP client
npm install axios

# Form handling
npm install react-hook-form

# State management
npm install zustand

# Styling
npm install styled-components
# or
npm install @emotion/react @emotion/styled

# Data fetching
npm install swr
# or
npm install react-query

# UI components
npm install @mui/material
# or
npm install antd
```

## Learning Resources

1. [Next.js Documentation](https://nextjs.org/docs)
2. [TypeScript Documentation](https://www.typescriptlang.org/docs/)
3. [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
4. [Next.js Learn Course](https://nextjs.org/learn)

This guide covers the essential concepts to get you started with Next.js and TypeScript. As you build more applications, you'll discover additional patterns and best practices specific to your use cases.