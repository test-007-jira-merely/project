import 'server-only'
import { createServerSupabaseClient } from './server'

export async function getServerUser() {
  const supabase = await createServerSupabaseClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    return null
  }

  return user
}
