import type { PostgrestError } from '@supabase/supabase-js'

import type { RepositoryError } from '@/types/common'

const knownCodeMap: Record<string, RepositoryError['code']> = {
  PGRST116: 'NOT_FOUND',
  '23505': 'CONFLICT',
  '42501': 'FORBIDDEN',
}

export const toRepositoryError = (
  error: PostgrestError | Error | null | undefined,
  fallbackMessage = 'Unexpected database error',
): RepositoryError => {
  if (!error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: fallbackMessage,
    }
  }

  if ('code' in error && typeof error.code === 'string') {
    return {
      code: knownCodeMap[error.code] ?? 'SUPABASE_ERROR',
      message: error.message,
      details: {
        code: error.code,
        details: error.details,
        hint: error.hint,
      },
    }
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: error.message || fallbackMessage,
  }
}
