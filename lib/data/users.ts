import { z } from 'zod'

import { toRepositoryError } from '@/lib/supabase/errors'
import { type Database } from '@/lib/supabase/database.types'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { UserProfile, UserRole } from '@/types/auth'
import type { PaginatedResult, RepositoryResult } from '@/types/common'

type ProfileRow = Database['public']['Tables']['profiles']['Row']

const userProfileMutationSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().nullable().optional(),
  displayName: z.string().min(1).max(120).nullable().optional(),
  role: z.enum(['viewer', 'editor', 'admin']).default('viewer'),
})

const roleSchema = z.enum(['viewer', 'editor', 'admin'])

const mapProfile = (row: ProfileRow): UserProfile => ({
  id: row.id,
  email: row.email,
  displayName: row.display_name,
  role: row.role,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
})

const toValidationError = (error: z.ZodError): RepositoryResult<never> => ({
  ok: false,
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Invalid profile input',
    details: error.flatten(),
  },
})

const paginate = <T>(
  data: T[],
  page: number,
  pageSize: number,
  total: number,
): PaginatedResult<T> => ({
  data,
  page,
  pageSize,
  total,
  totalPages: Math.max(1, Math.ceil(total / pageSize)),
})

export const getUserProfileById = async (
  userId: string,
): Promise<RepositoryResult<UserProfile | null>> => {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle()

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to get user profile'),
    }
  }

  return {
    ok: true,
    data: data ? mapProfile(data) : null,
  }
}

export const listUserProfiles = async (
  page = 1,
  pageSize = 20,
): Promise<RepositoryResult<PaginatedResult<UserProfile>>> => {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const supabase = await createSupabaseServerClient()

  const { data, error, count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to list user profiles'),
    }
  }

  return {
    ok: true,
    data: paginate((data ?? []).map(mapProfile), page, pageSize, count ?? 0),
  }
}

export const upsertUserProfile = async (
  input: z.input<typeof userProfileMutationSchema>,
): Promise<RepositoryResult<UserProfile>> => {
  const parsedInput = userProfileMutationSchema.safeParse(input)

  if (!parsedInput.success) {
    return toValidationError(parsedInput.error)
  }

  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('profiles')
    .upsert(
      {
        id: parsedInput.data.id,
        email: parsedInput.data.email ?? null,
        display_name: parsedInput.data.displayName ?? null,
        role: parsedInput.data.role,
      },
      {
        onConflict: 'id',
      },
    )
    .select('*')
    .single()

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to upsert user profile'),
    }
  }

  return {
    ok: true,
    data: mapProfile(data),
  }
}

export const setUserRole = async (
  userId: string,
  role: UserRole,
): Promise<RepositoryResult<UserProfile>> => {
  const parsedRole = roleSchema.safeParse(role)
  if (!parsedRole.success) {
    return toValidationError(parsedRole.error)
  }

  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('profiles')
    .update({ role: parsedRole.data })
    .eq('id', userId)
    .select('*')
    .single()

  if (error) {
    return {
      ok: false,
      error: toRepositoryError(error, 'Failed to set user role'),
    }
  }

  return {
    ok: true,
    data: mapProfile(data),
  }
}
