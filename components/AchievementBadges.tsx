'use client'

import { Trophy } from 'lucide-react'
import { usePortfolioExperience } from '@/providers/PortfolioExperienceProvider'

export default function AchievementBadges() {
  const { achievementProgress, isHydrated } = usePortfolioExperience()
  const unlocked = achievementProgress.filter((achievement) => achievement.isUnlocked)

  if (!isHydrated) {
    return null
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
        <Trophy size={14} />
        <span>
          {unlocked.length}/{achievementProgress.length}
        </span>
      </div>

      <div className="hidden items-center gap-2 xl:flex">
        {unlocked.map((achievement) => (
          <span
            key={achievement.id}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
          >
            {achievement.name}
          </span>
        ))}
      </div>
    </div>
  )
}
