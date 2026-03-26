import { getPosts } from '@/lib/supabase/queries/posts'
import { getProjects } from '@/lib/supabase/queries/projects'
import { FileText, Briefcase, Eye } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [posts, projects] = await Promise.all([
    getPosts(),
    getProjects(),
  ])

  const publishedPosts = posts.filter(p => p.published).length
  const draftPosts = posts.filter(p => !p.published).length

  const stats = [
    { label: 'Total Posts', value: posts.length, icon: FileText, color: 'teal' },
    { label: 'Published', value: publishedPosts, icon: Eye, color: 'green' },
    { label: 'Drafts', value: draftPosts, icon: FileText, color: 'yellow' },
    { label: 'Projects', value: projects.length, icon: Briefcase, color: 'cyan' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 text-${stat.color}-400`} />
                <span className="text-3xl font-bold text-white">{stat.value}</span>
              </div>
              <p className="text-slate-400">{stat.label}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Posts</h2>
          <div className="space-y-3">
            {posts.slice(0, 5).map((post) => (
              <div key={post.id} className="flex items-center justify-between py-2 border-b border-white/5">
                <div className="flex-1">
                  <p className="text-white font-medium">{post.title}</p>
                  <p className="text-sm text-slate-400">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    post.published
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Projects</h2>
          <div className="space-y-3">
            {projects.slice(0, 5).map((project) => (
              <div key={project.id} className="py-2 border-b border-white/5">
                <p className="text-white font-medium">{project.title}</p>
                <p className="text-sm text-slate-400 line-clamp-1">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
