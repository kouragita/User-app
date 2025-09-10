'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types/user';

interface UserContextType {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  toggleFavorite: (userId: number) => void;
  favorites: number[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser: User = {
      ...user,
      id: Math.max(0, ...users.map(u => u.id)) + 1,
    };
    setUsers(prev => [newUser, ...prev]);
  };

  const toggleFavorite = (userId: number) => {
    if (favorites.includes(userId)) {
      setFavorites(favorites.filter(id => id !== userId));
    } else {
      setFavorites([...favorites, userId]);
    }
  };

  return (
    <UserContext.Provider value={{ users, addUser, toggleFavorite, favorites }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}