import { getPosts } from '@/lib/services/posts'
import Link from 'next/link'

export const metadata = {
  title: 'Blog',
  description: 'Read our latest articles and insights',
}

export default async function BlogPage() {
  const result = await getPosts({ page: 1, pageSize: 20, publishedOnly: true })
  const posts = result.data?.data || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">Blog</h1>
            <p className="text-xl text-slate-300">
              Thoughts, tutorials, and insights
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-12 text-center">
              <p className="text-slate-300 text-lg">
                No posts yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl overflow-hidden hover:bg-white/[0.15] transition-all group"
                >
                  {post.cover_image && (
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-8">
                    <div className="flex items-center text-slate-400 text-sm mb-3">
                      <time dateTime={post.created_at}>
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-slate-300 mb-4 line-clamp-3">
                      {post.content.substring(0, 200)}...
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-teal-400 hover:text-teal-300 font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
