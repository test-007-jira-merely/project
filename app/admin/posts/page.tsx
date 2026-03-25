import Link from 'next/link';
import { getPosts } from '@/lib/services/posts';
import { Plus } from 'lucide-react';
import PostsTable from '@/components/admin/PostsTable';

interface PostsPageProps {
  searchParams: Promise<{ filter?: string }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams;
  const result = await getPosts(1, 100, false); // Get all posts

  let posts = result.data?.data || [];

  // Filter based on query param
  if (params.filter === 'published') {
    posts = posts.filter(p => p.published);
  } else if (params.filter === 'draft') {
    posts = posts.filter(p => !p.published);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-white/60 mt-1">Manage your blog posts</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-light transition-colors"
        >
          <Plus size={20} />
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Link
          href="/admin/posts"
          className={`px-4 py-2 rounded-lg transition-colors ${
            !params.filter ? 'bg-teal text-white' : 'glass-effect hover:bg-white/10'
          }`}
        >
          All
        </Link>
        <Link
          href="/admin/posts?filter=published"
          className={`px-4 py-2 rounded-lg transition-colors ${
            params.filter === 'published' ? 'bg-teal text-white' : 'glass-effect hover:bg-white/10'
          }`}
        >
          Published
        </Link>
        <Link
          href="/admin/posts?filter=draft"
          className={`px-4 py-2 rounded-lg transition-colors ${
            params.filter === 'draft' ? 'bg-teal text-white' : 'glass-effect hover:bg-white/10'
          }`}
        >
          Drafts
        </Link>
      </div>

      {/* Posts Table */}
      <PostsTable posts={posts} />
    </div>
  );
}

export const metadata = {
  title: 'Posts | Admin Dashboard',
};
