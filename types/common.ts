export type UUID = string

export type ISODateString = string

export type PaginatedQuery = {
  page?: number
  pageSize?: number
}

export type PaginatedResult<T> = {
  data: T[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export type RepositoryErrorCode =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'CONFLICT'
  | 'SUPABASE_ERROR'
  | 'UNKNOWN_ERROR'

export type RepositoryError = {
  code: RepositoryErrorCode
  message: string
  details?: unknown
}

export type RepositoryResult<T> =
  | {
      ok: true
      data: T
    }
  | {
      ok: false
      error: RepositoryError
    }
