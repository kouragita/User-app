import { User } from '@/types/user';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const users: User[] = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchUserById = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user with id ${id}`);
    }
    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};