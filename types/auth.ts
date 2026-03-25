import type { ISODateString, UUID } from '@/types/common'

export const USER_ROLES = ['viewer', 'editor', 'admin'] as const

export type UserRole = (typeof USER_ROLES)[number]

export type UserProfile = {
  id: UUID
  email: string | null
  displayName: string | null
  role: UserRole
  createdAt: ISODateString
  updatedAt: ISODateString
}

export type AuthSessionUser = {
  id: UUID
  email: string | null
}
