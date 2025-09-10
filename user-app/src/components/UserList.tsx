'use client';

import React from 'react';
import { User } from '@/types/user';
import UserCard from './UserCard';

interface UserListProps {
  users: User[];
  favorites: number[];
  onToggleFavorite: (userId: number) => void;
}

export default function UserList({ users, favorites, onToggleFavorite }: UserListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map(user => (
        <UserCard 
          key={user.id} 
          user={user} 
          isFavorite={favorites.includes(user.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}