import { getPostBySlug, getPosts } from '@/lib/services/posts'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'

export async function generateStaticParams() {
  const result = await getPosts({ page: 1, pageSize: 100, publishedOnly: true })
  const posts = result.data?.data || []

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const result = await getPostBySlug(params.slug)

  if (!result.data) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: result.data.title,
    description: result.data.content.substring(0, 160),
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const result = await getPostBySlug(params.slug)

  if (result.error || !result.data) {
    notFound()
  }

  const post = result.data

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <article className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-8"
          >
            ← Back to Blog
          </Link>

          {post.cover_image && (
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-96 object-cover rounded-2xl mb-8"
            />
          )}

          <header className="mb-8">
            <h1 className="text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <time className="text-slate-400" dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </header>

          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8">
            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-teal-400 prose-strong:text-white prose-code:text-teal-300">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
