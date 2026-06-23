'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { usePortfolioExperience } from '@/providers/PortfolioExperienceProvider'

export default function AchievementToasts() {
  const { toastQueue, dismissToast } = usePortfolioExperience()

  useEffect(() => {
    if (toastQueue.length === 0) {
      return
    }

    const timers = toastQueue.map((achievement) =>
      window.setTimeout(() => dismissToast(achievement.id), 3500),
    )

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [dismissToast, toastQueue])

  return (
    <div className="pointer-events-none fixed right-4 top-24 z-[60] flex w-full max-w-sm flex-col gap-3">
      <AnimatePresence>
        {toastQueue.map((achievement) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto rounded-2xl border border-teal/40 bg-navy-dark/95 p-4 shadow-2xl glow-effect"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-teal/20 p-2 text-teal">
                <Trophy size={18} />
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.2em] text-teal">Achievement Unlocked</p>
                <h3 className="text-lg font-semibold text-white">{achievement.name}</h3>
                <p className="text-sm text-white/70">{achievement.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
