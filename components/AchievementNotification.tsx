'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, X } from 'lucide-react'
import { useAchievements } from '@/context/AchievementContext'

export default function AchievementNotification() {
  const { latestUnlock, dismissNotification } = useAchievements()

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-full pointer-events-none">
      <AnimatePresence>
        {latestUnlock && (
          <motion.div
            key={latestUnlock.id}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="glass-effect border border-teal/50 rounded-xl px-6 py-4 mx-4 pointer-events-auto max-w-md w-[90vw] shadow-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal/20 border border-teal/40">
                  <Trophy className="w-5 h-5 text-teal" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-teal font-semibold uppercase tracking-wider">
                    Achievement Unlocked
                  </p>
                  <h3 className="text-white font-bold text-base mt-1">
                    {latestUnlock.icon} {latestUnlock.title}
                  </h3>
                  <p className="text-white/70 text-sm mt-1">
                    {latestUnlock.description}
                  </p>
                </div>
              </div>
              <button
                onClick={dismissNotification}
                className="text-white/50 hover:text-white transition-colors flex-shrink-0 mt-1"
              >
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
