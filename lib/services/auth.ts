import { createClient } from '@/lib/supabase/server';
import { createClient as createBrowserClient } from '@/lib/supabase/client';
import type { ServiceResult } from '@/lib/database.types';

export async function getUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function signIn(email: string, password: string): Promise<ServiceResult<{ user: unknown }>> {
  try {
    const supabase = createBrowserClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { data: { user: data.user }, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to sign in',
    };
  }
}

export async function signOut(): Promise<ServiceResult<null>> {
  try {
    const supabase = createBrowserClient();
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    return { data: null, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to sign out',
    };
  }
}
