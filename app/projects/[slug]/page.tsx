import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, FolderOpenDot } from 'lucide-react'
import FavoriteButton from '@/components/FavoriteButton'
import { getProjectBySlug, projectToneClasses, projects } from '@/data/projects'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen section-padding pt-36">
      <div className="container-custom space-y-10">
        <Link
          href="/#works"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-teal"
        >
          <ArrowLeft size={16} />
          Back to Works
        </Link>

        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <div className={`relative h-72 overflow-hidden rounded-3xl ${projectToneClasses[project.imageTone]}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/20 to-black/55" />
              <div className="absolute inset-0 flex items-end p-8">
                <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80">
                    <FolderOpenDot size={14} />
                    {project.category}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold text-white">{project.title}</h1>
                  <p className="max-w-2xl text-base text-white/75">{project.summary}</p>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-3xl p-8 space-y-5">
              <h2 className="text-2xl font-semibold">Project Overview</h2>
              <p className="text-white/70 leading-relaxed">{project.description}</p>
              <div className="space-y-4">
                {project.details.map((detail) => (
                  <p key={detail} className="text-white/65 leading-relaxed">
                    {detail}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="glass-effect rounded-3xl p-8 space-y-5">
              <h2 className="text-2xl font-semibold">Save this project</h2>
              <p className="text-white/65 leading-relaxed">
                Build a personal shortlist by saving standout projects to your favorites collection.
              </p>
              <FavoriteButton project={project} />
            </div>

            <div className="glass-effect rounded-3xl p-8 space-y-5">
              <h2 className="text-2xl font-semibold">Highlights</h2>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-teal/30 bg-teal/10 px-4 py-2 text-sm text-teal"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="space-y-3 text-sm text-white/60">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Project Slug</span>
                  <span className="text-white/85">{project.slug}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span>Category</span>
                  <span className="text-white/85">{project.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tags</span>
                  <span className="text-white/85">{project.tags.length}</span>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}
