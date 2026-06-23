import SectionTracker from '@/components/SectionTracker'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Works from '@/components/Works'
import Footer from '@/components/Footer'

const sectionTrackerTargets = [
  { elementId: 'home', section: 'hero' as const },
  { elementId: 'about', section: 'about' as const },
  { elementId: 'works', section: 'works' as const },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <SectionTracker targets={sectionTrackerTargets} />
      <Hero />
      <About />
      <Works />
      <Footer />
    </main>
  )
}
