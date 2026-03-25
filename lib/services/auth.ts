import { createClient as createBrowserClient } from '@/lib/supabase/client'
import { createClient as createServerClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'

export async function signIn(email: string, password: string) {
  const supabase = createBrowserClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function signOut() {
  const supabase = createBrowserClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
}

export async function getUser(): Promise<User | null> {
  const supabase = createBrowserClient()

  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getServerUser(): Promise<User | null> {
  const supabase = await createServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  return user
}
