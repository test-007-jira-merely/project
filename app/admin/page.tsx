import { getPosts } from '@/lib/services/posts'
import { getProjects } from '@/lib/services/projects'
import Link from 'next/link'

export default async function AdminDashboard() {
  const [postsResult, projectsResult] = await Promise.all([
    getPosts({ page: 1, pageSize: 5, publishedOnly: false }),
    getProjects(),
  ])

  const recentPosts = postsResult.data?.data || []
  const projects = projectsResult.data || []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-300">
          Welcome to your admin dashboard. Manage your content here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-300 mb-2">
            Total Posts
          </h3>
          <p className="text-4xl font-bold text-white">
            {postsResult.data?.count || 0}
          </p>
        </div>

        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-300 mb-2">
            Total Projects
          </h3>
          <p className="text-4xl font-bold text-white">{projects.length}</p>
        </div>

        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-slate-300 mb-2">
            Published Posts
          </h3>
          <p className="text-4xl font-bold text-white">
            {recentPosts.filter((p) => p.published).length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Recent Posts</h2>
            <Link
              href="/admin/posts"
              className="text-teal-400 hover:text-teal-300 text-sm font-medium"
            >
              View all →
            </Link>
          </div>
          {recentPosts.length === 0 ? (
            <p className="text-slate-400 text-center py-8">
              No posts yet. Create your first post!
            </p>
          ) : (
            <div className="space-y-3">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-medium">{post.title}</h3>
                      <p className="text-slate-400 text-sm">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        post.published
                          ? 'bg-green-500/20 text-green-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Projects</h2>
            <Link
              href="/admin/projects"
              className="text-teal-400 hover:text-teal-300 text-sm font-medium"
            >
              Manage →
            </Link>
          </div>
          {projects.length === 0 ? (
            <p className="text-slate-400 text-center py-8">
              No projects yet. Add your first project!
            </p>
          ) : (
            <div className="space-y-3">
              {projects.slice(0, 5).map((project) => (
                <div
                  key={project.id}
                  className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                >
                  <h3 className="text-white font-medium">{project.title}</h3>
                  <p className="text-slate-400 text-sm line-clamp-1">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
