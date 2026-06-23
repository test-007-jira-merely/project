'use client'

import { motion } from 'framer-motion'
import JourneyTimeline from '@/components/JourneyTimeline'
import SectionTracker from '@/components/SectionTracker'
import { usePortfolioExperience } from '@/providers/PortfolioExperienceProvider'

const trackerTargets = [{ elementId: 'journey-page', section: 'journey' as const }]

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass-effect rounded-3xl p-6 space-y-2">
      <p className="text-sm uppercase tracking-[0.2em] text-white/45">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  )
}

export default function JourneyPage() {
  const { activityLog, achievementProgress, journeyStats, isHydrated } = usePortfolioExperience()
  const orderedEvents = [...activityLog].sort((a, b) => a.timestamp.localeCompare(b.timestamp))

  return (
    <main id="journey-page" className="min-h-screen section-padding pt-36">
      <SectionTracker targets={trackerTargets} />

      <div className="container-custom space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-teal">Portfolio Journey</p>
          <h1 className="text-4xl md:text-5xl font-bold">Your exploration timeline</h1>
          <p className="mx-auto max-w-3xl text-white/65">
            Every route visit, section revisit, project click, favorite action, and achievement lives here as part of your personal path through the portfolio.
          </p>
        </motion.div>

        {!isHydrated ? (
          <div className="glass-effect rounded-3xl p-12 text-center text-white/60">
            Loading your journey…
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <StatCard label="Activity Events" value={journeyStats.totalEvents} />
              <StatCard label="Sections Visited" value={`${journeyStats.visitedSections}/5`} />
              <StatCard
                label="Projects Viewed"
                value={`${journeyStats.viewedProjects}/${journeyStats.totalProjects}`}
              />
              <StatCard
                label="Achievements"
                value={`${journeyStats.unlockedCount}/${achievementProgress.length}`}
              />
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
              <section className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold">Timeline</h2>
                  <span className="text-sm text-white/45">Oldest to newest</span>
                </div>
                {orderedEvents.length === 0 ? (
                  <div className="glass-effect rounded-3xl p-10 text-white/60">
                    Your activity will start appearing here as you explore the portfolio.
                  </div>
                ) : (
                  <JourneyTimeline events={orderedEvents} />
                )}
              </section>

              <aside className="glass-effect h-fit space-y-6 rounded-3xl p-6 md:p-8">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Achievement Progress</h2>
                  <p className="text-white/60">
                    Keep exploring to unlock the full collection of portfolio achievements.
                  </p>
                </div>

                <div className="space-y-5">
                  {achievementProgress.map((achievement) => {
                    const percentage = Math.min((achievement.progress / achievement.target) * 100, 100)

                    return (
                      <div
                        key={achievement.id}
                        className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold text-white">{achievement.name}</h3>
                            <p className="text-sm text-white/55">{achievement.description}</p>
                          </div>
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${
                              achievement.isUnlocked
                                ? 'border-teal/30 bg-teal/20 text-teal'
                                : 'border-white/10 bg-white/5 text-white/50'
                            }`}
                          >
                            {achievement.isUnlocked
                              ? 'Unlocked'
                              : `${achievement.progress}/${achievement.target}`}
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-teal to-teal-light"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
