import { FileText, Briefcase, Eye, TrendingUp } from 'lucide-react'
import { getAllPosts } from '@/lib/services/posts'
import { getProjects } from '@/lib/services/projects'
import StatsCard from '@/components/admin/StatsCard'

export default async function AdminDashboard() {
  const [posts, projects] = await Promise.all([
    getAllPosts(),
    getProjects(),
  ])

  const publishedPosts = posts.filter((p) => p.published).length
  const draftPosts = posts.filter((p) => !p.published).length

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
        <p className="text-white/60">Here's what's happening with your content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Posts"
          value={posts.length}
          icon={FileText}
          color="teal"
        />
        <StatsCard
          title="Published"
          value={publishedPosts}
          icon={Eye}
          color="green"
        />
        <StatsCard
          title="Drafts"
          value={draftPosts}
          icon={TrendingUp}
          color="orange"
        />
        <StatsCard
          title="Projects"
          value={projects.length}
          icon={Briefcase}
          color="blue"
        />
      </div>

      {/* Recent Activity */}
      <div className="glass-effect rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
        {posts.length === 0 ? (
          <p className="text-white/60">No posts yet. Create your first post!</p>
        ) : (
          <div className="space-y-3">
            {posts.slice(0, 5).map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div>
                  <h4 className="font-medium text-white">{post.title}</h4>
                  <p className="text-sm text-white/60">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    post.published
                      ? 'bg-green-500/20 text-green-500'
                      : 'bg-orange-500/20 text-orange-500'
                  }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
