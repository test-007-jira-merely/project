import { FileText, FolderKanban, Eye, TrendingUp } from 'lucide-react'
import { getAllPosts } from '@/lib/services/posts'
import { getProjects } from '@/lib/services/projects'

async function getStats() {
  const [posts, projects] = await Promise.all([
    getAllPosts(),
    getProjects(),
  ])

  return {
    totalPosts: posts.length,
    publishedPosts: posts.filter(p => p.published).length,
    draftPosts: posts.filter(p => !p.published).length,
    totalProjects: projects.length,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    { label: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'bg-blue-500' },
    { label: 'Published', value: stats.publishedPosts, icon: Eye, color: 'bg-green-500' },
    { label: 'Drafts', value: stats.draftPosts, icon: TrendingUp, color: 'bg-yellow-500' },
    { label: 'Projects', value: stats.totalProjects, icon: FolderKanban, color: 'bg-purple-500' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-white/60">Welcome back! Here&apos;s an overview of your content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="glass-effect rounded-xl p-6 hover:border-teal transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-white/60 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="glass-effect rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <a
            href="/admin/posts/new"
            className="px-6 py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors"
          >
            Create New Post
          </a>
          <a
            href="/admin/projects/new"
            className="px-6 py-3 bg-navy-light border border-white/20 text-white rounded-lg font-medium hover:border-teal transition-colors"
          >
            Add New Project
          </a>
        </div>
      </div>
    </div>
  )
}
