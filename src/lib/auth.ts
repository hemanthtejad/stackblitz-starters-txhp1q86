import { createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { Database } from './database.types';

export type UserRole = 'super_admin' | 'admin' | 'faculty' | 'user';

export interface UserProfile {
  id: string;
  role: UserRole;
  full_name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const checkRole = (userRole: UserRole | undefined, requiredRole: UserRole): boolean => {
  const roleHierarchy: Record<UserRole, number> = {
    super_admin: 4,
    admin: 3,
    faculty: 2,
    user: 1
  };

  if (!userRole) return false;
  
  // Super admin can access everything
  if (userRole === 'super_admin') return true;
  
  // Admin can access everything except super admin routes
  if (userRole === 'admin' && requiredRole !== 'super_admin') return true;
  
  // Faculty can access faculty and user routes
  if (userRole === 'faculty' && (requiredRole === 'faculty' || requiredRole === 'user')) return true;
  
  // Users can only access user routes
  if (userRole === 'user' && requiredRole === 'user') return true;
  
  return false;
};

export const PROTECTED_ROUTES = {
  super_admin: ['/admin/system'],
  admin: ['/admin/users', '/admin/content'],
  faculty: ['/faculty/courses', '/faculty/students'],
  user: ['/dashboard', '/profile']
};