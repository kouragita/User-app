'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';
import { fetchUserById } from '@/services/userService';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function UserDetail({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserById(parseInt(params.id));
        setUser(userData);
      } catch (err) {
        setError('Failed to fetch user details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadUser();
    }
  }, [params.id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-xl text-center">{error}</div>
        <div className="text-center mt-4">
          <button 
            onClick={() => router.back()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-gray-500 text-xl text-center">User not found.</div>
        <div className="text-center mt-4">
          <button 
            onClick={() => router.back()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => router.back()}
        className="mb-6 text-blue-500 hover:text-blue-700 flex items-center"
      >
        ← Back to Users
      </button>
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto text-gray-900">
        <h1 className="text-3xl font-bold mb-6 text-center">{user.name}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-3">
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {user.phone}
              </p>
              <p>
                <span className="font-medium">Website:</span> {user.website}
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Company</h2>
            <div className="space-y-3">
              <p>
                <span className="font-medium">Name:</span> {user.company.name}
              </p>
              <p>
                <span className="font-medium">Catch Phrase:</span> {user.company.catchPhrase}
              </p>
              <p>
                <span className="font-medium">Business:</span> {user.company.bs}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}