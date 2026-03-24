'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authService } from '@/lib/services';
import { ROUTES } from '@/lib/constants';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { data: session } = await authService.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      setUser(user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Redirect unauthenticated users away from admin pages
  useEffect(() => {
    if (!isLoading && !user && pathname?.startsWith('/admin') && pathname !== ROUTES.ADMIN_LOGIN) {
      router.push(ROUTES.ADMIN_LOGIN);
    }
  }, [user, isLoading, pathname, router]);

  const signIn = async (email: string, password: string) => {
    const result = await authService.signIn(email, password);
    if (result.data) {
      setUser(result.data.user);
      router.push(ROUTES.ADMIN);
    }
    return { error: result.error };
  };

  const signOut = async () => {
    await authService.signOut();
    setUser(null);
    router.push(ROUTES.HOME);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
