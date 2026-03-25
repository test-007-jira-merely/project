import { Suspense } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import WorksServer from '@/components/WorksServer'
import Footer from '@/components/Footer'
import { PostListSkeleton } from '@/components/ui/LoadingSkeleton'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Suspense
        fallback={
          <section className="min-h-screen section-padding">
            <div className="container-custom">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  My recent <span className="text-gradient">works</span>
                </h2>
              </div>
              <PostListSkeleton count={6} />
            </div>
          </section>
        }
      >
        <WorksServer />
      </Suspense>
      <Footer />
    </main>
  )
}
