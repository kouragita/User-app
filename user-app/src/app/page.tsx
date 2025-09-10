'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from '@/types/user';
import { fetchUsers } from '@/services/userService';
import UserList from '@/components/UserList';
import SearchBar from '@/components/SearchBar';
import FavoritesToggle from '@/components/FavoritesToggle';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const userData = await fetchUsers();
        setUsers(userData);
        setFilteredUsers(userData);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    let result = users;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply favorites filter
    if (showFavoritesOnly) {
      result = result.filter(user => favorites.includes(user.id));
    }
    
    setFilteredUsers(result);
  }, [searchTerm, showFavoritesOnly, users, favorites]);

  const toggleFavorite = (userId: number) => {
    if (favorites.includes(userId)) {
      setFavorites(favorites.filter(id => id !== userId));
    } else {
      setFavorites([...favorites, userId]);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">User Directory</h1>
        <Link 
          href="/add-user"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add User
        </Link>
      </div>
      
      <div className="mb-6">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />
      </div>
      
      <div className="mb-6">
        <FavoritesToggle 
          showFavoritesOnly={showFavoritesOnly}
          onToggle={setShowFavoritesOnly}
        />
      </div>
      
      {filteredUsers.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No users found.
        </div>
      ) : (
        <UserList 
          users={filteredUsers} 
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}