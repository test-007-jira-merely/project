import Link from 'next/link';
import { getPosts } from '@/lib/services/posts';
import { getProjects } from '@/lib/services/projects';
import { FileText, FolderKanban, Eye, PenSquare } from 'lucide-react';

async function getStats() {
  const [postsResult, projectsResult] = await Promise.all([
    getPosts(1, 100, false), // Get all posts including drafts
    getProjects(),
  ]);

  const posts = postsResult.data?.data || [];
  const projects = projectsResult.data || [];

  return {
    totalPosts: posts.length,
    publishedPosts: posts.filter(p => p.published).length,
    draftPosts: posts.filter(p => !p.published).length,
    totalProjects: projects.length,
    recentPosts: posts.slice(0, 5),
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-white/60 mt-1">Welcome to your admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FileText className="text-teal" size={24} />}
          label="Total Posts"
          value={stats.totalPosts}
          href="/admin/posts"
        />
        <StatCard
          icon={<Eye className="text-green-400" size={24} />}
          label="Published"
          value={stats.publishedPosts}
          href="/admin/posts?filter=published"
        />
        <StatCard
          icon={<PenSquare className="text-yellow-400" size={24} />}
          label="Drafts"
          value={stats.draftPosts}
          href="/admin/posts?filter=draft"
        />
        <StatCard
          icon={<FolderKanban className="text-purple-400" size={24} />}
          label="Projects"
          value={stats.totalProjects}
          href="/admin/projects"
        />
      </div>

      {/* Recent Posts */}
      <div className="glass-effect rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Posts</h2>
          <Link
            href="/admin/posts/new"
            className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-light transition-colors text-sm"
          >
            New Post
          </Link>
        </div>

        {stats.recentPosts.length === 0 ? (
          <p className="text-white/50 text-center py-8">No posts yet. Create your first post!</p>
        ) : (
          <div className="space-y-4">
            {stats.recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}`}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-white">{post.title}</h3>
                  <p className="text-sm text-white/50">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    post.published
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Link href="/admin/posts/new">
          <div className="glass-effect rounded-2xl p-6 hover:border-teal transition-colors cursor-pointer">
            <FileText className="text-teal mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-2">Create New Post</h3>
            <p className="text-white/60 text-sm">Write and publish a new blog post</p>
          </div>
        </Link>

        <Link href="/admin/projects/new">
          <div className="glass-effect rounded-2xl p-6 hover:border-teal transition-colors cursor-pointer">
            <FolderKanban className="text-purple-400 mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-2">Add New Project</h3>
            <p className="text-white/60 text-sm">Showcase a new work in your portfolio</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="glass-effect rounded-2xl p-6 hover:border-teal transition-colors cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-lg">{icon}</div>
          <div>
            <p className="text-white/60 text-sm">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export const metadata = {
  title: 'Admin Dashboard | SaulDesign',
};
