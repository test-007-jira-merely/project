import { supabase } from '@/lib/supabase';
import type { ServiceResponse } from '@/types/database';
import type { User, Session } from '@supabase/supabase-js';

export const authService = {
  // Sign in with email/password
  async signIn(email: string, password: string): Promise<ServiceResponse<{ user: User; session: Session }>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data.user || !data.session) throw new Error('Authentication failed');

      return { data: { user: data.user, session: data.session }, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to sign in',
      };
    }
  },

  // Sign out
  async signOut(): Promise<ServiceResponse<boolean>> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      return { data: true, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to sign out',
      };
    }
  },

  // Get current session
  async getSession(): Promise<ServiceResponse<Session | null>> {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;

      return { data: data.session, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to get session',
      };
    }
  },

  // Get current user
  async getCurrentUser(): Promise<ServiceResponse<User | null>> {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;

      return { data: data.user, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Failed to get user',
      };
    }
  },

  // Subscribe to auth state changes
  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user ?? null);
    });
  },
};
