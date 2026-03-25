import { createBrowserClient } from '@supabase/ssr'

import { env } from '@/lib/env'
import type { Database } from '@/lib/supabase/database.types'

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export const createSupabaseBrowserClient = () => {
  if (browserClient) {
    return browserClient
  }

  browserClient = createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  )

  return browserClient
}
