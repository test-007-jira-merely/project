import type { AchievementId } from '@/types/portfolio'

export interface AchievementDefinition {
  id: AchievementId
  name: string
  description: string
  target: number
}

export const achievementDefinitions: AchievementDefinition[] = [
  { id: 'first-visit', name: 'First Visit', description: 'Open the website', target: 1 },
  { id: 'explorer', name: 'Explorer', description: 'Visit all tracked sections', target: 5 },
  { id: 'collector', name: 'Collector', description: 'Save 3 projects to favorites', target: 3 },
  { id: 'designer-fan', name: 'Designer Fan', description: 'View every portfolio project', target: 9 },
  { id: 'curious-mind', name: 'Curious Mind', description: 'Open the Journey page', target: 1 },
]
