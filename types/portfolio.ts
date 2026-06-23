export type ProjectCategory = 'UI' | 'UX' | 'Web Design'

export type ProjectTone =
  | 'purple'
  | 'gray'
  | 'teal'
  | 'blue'
  | 'green'
  | 'orange'
  | 'pink'
  | 'indigo'
  | 'red'

export type TrackedSection = 'hero' | 'about' | 'works' | 'favorites' | 'journey'

export type ActivityType =
  | 'route_opened'
  | 'section_viewed'
  | 'project_viewed'
  | 'favorite_added'
  | 'favorite_removed'
  | 'achievement_unlocked'

export interface Project {
  id: number
  slug: string
  title: string
  category: ProjectCategory
  imageTone: ProjectTone
  description: string
  summary: string
  details: string[]
  tags: string[]
}

export type AchievementId =
  | 'first-visit'
  | 'explorer'
  | 'collector'
  | 'designer-fan'
  | 'curious-mind'

export interface ActivityEvent {
  id: string
  type: ActivityType
  label: string
  route: string
  timestamp: string
  metadata?: {
    section?: TrackedSection
    projectSlug?: string
    achievementId?: AchievementId
  }
}

export interface AchievementProgress {
  id: AchievementId
  name: string
  description: string
  target: number
  progress: number
  isUnlocked: boolean
  unlockedAt?: string
}
