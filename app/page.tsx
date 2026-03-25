import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import WorksDynamic from '@/components/WorksDynamic'
import Footer from '@/components/Footer'
import { getProjects } from '@/lib/services/projects'

export default async function Home() {
  // Pre-fetch projects on server for initial render
  const projectsResult = await getProjects(9);
  const initialProjects = projectsResult.data || undefined;

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <WorksDynamic initialProjects={initialProjects} />
      <Footer />
    </main>
  )
}
