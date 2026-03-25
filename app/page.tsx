import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Works from '@/components/Works'
import Footer from '@/components/Footer'
import { getProjects } from '@/lib/services/projects'

export default async function Home() {
  const projectsResult = await getProjects()
  const projects = projectsResult.data || []

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Works initialProjects={projects} />
      <Footer />
    </main>
  )
}
