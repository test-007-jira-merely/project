'use client'

import { useEffect } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Works from '@/components/Works'
import Footer from '@/components/Footer'
import { useJourney } from '@/context/JourneyContext'

export default function Home() {
  const { addEvent } = useJourney()

  useEffect(() => {
    addEvent('homepage_visit')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Works />
      <Footer />
    </main>
  )
}
