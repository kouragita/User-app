'use client';

import React from 'react';
import Link from 'next/link';
import { User } from '@/types/user';

interface UserCardProps {
  user: User;
  isFavorite: boolean;
  onToggleFavorite: (userId: number) => void;
}

export default function UserCard({ user, isFavorite, onToggleFavorite }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <Link href={`/users/${user.id}`} className="text-xl font-bold text-blue-600 hover:underline">
          {user.name}
        </Link>
        <button 
          onClick={() => onToggleFavorite(user.id)}
          className="text-2xl focus:outline-none"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className="space-y-2">
        <p className="text-gray-600">
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Company:</span> {user.company.name}
        </p>
      </div>
    </div>
  );
}