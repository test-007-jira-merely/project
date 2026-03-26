import { getPostBySlug } from '@/lib/supabase/queries/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Calendar, ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160),
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post || !post.published) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-slate-400 hover:text-teal-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to blog</span>
        </Link>

        {post.cover_image && (
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 text-slate-400">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-4xl font-bold text-white mb-4 mt-8" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-3xl font-bold text-white mb-3 mt-6" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-2xl font-bold text-white mb-2 mt-4" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-slate-300 mb-4 leading-relaxed" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a
                    className="text-teal-400 hover:text-teal-300 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-2" {...props} />
                ),
                code: ({ node, inline, ...props }: any) =>
                  inline ? (
                    <code className="bg-slate-800 text-teal-400 px-2 py-1 rounded text-sm" {...props} />
                  ) : (
                    <code className="block bg-slate-800 text-slate-300 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
                  ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-teal-500 pl-4 italic text-slate-400 my-4" {...props} />
                ),
                img: ({ node, ...props }) => (
                  <img className="rounded-lg my-6 w-full" {...props} />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all posts</span>
          </Link>
        </div>
      </article>
    </div>
  )
}
