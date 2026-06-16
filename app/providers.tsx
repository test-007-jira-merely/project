'use client'

import { type ReactNode } from 'react'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { JourneyProvider } from '@/context/JourneyContext'
import { AchievementProvider } from '@/context/AchievementContext'
import AchievementNotification from '@/components/AchievementNotification'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <FavoritesProvider>
      <JourneyProvider>
        <AchievementProvider>
          <AchievementNotification />
          {children}
        </AchievementProvider>
      </JourneyProvider>
    </FavoritesProvider>
  )
}
