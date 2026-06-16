import Hero from '@/components/Hero'
import About from '@/components/About'
import Works from '@/components/Works'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Works />
      <Footer />
    </main>
  )
}
