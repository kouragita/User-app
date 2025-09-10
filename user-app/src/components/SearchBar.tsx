import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search users by name..."
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}