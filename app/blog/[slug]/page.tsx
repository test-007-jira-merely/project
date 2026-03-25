import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowLeft, Clock } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug, getPublishedPosts } from '@/lib/services/posts'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found - SaulDesign',
    }
  }

  return {
    title: `${post.title} - SaulDesign Blog`,
    description: post.content.replace(/[#*`]/g, '').substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.replace(/[#*`]/g, '').substring(0, 160),
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      images: post.cover_image ? [post.cover_image] : [],
    },
  }
}

export async function generateStaticParams() {
  const { posts } = await getPublishedPosts(1)
  return posts.map((post) => ({ slug: post.slug }))
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const readTime = estimateReadTime(post.content)

  return (
    <main className="min-h-screen section-padding pt-32">
      <article className="container-custom max-w-4xl">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/50 hover:text-teal transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          {post.cover_image && (
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />
            </div>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <time dateTime={post.created_at}>
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{readTime} min read</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-teal max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mt-8 mb-4 text-white">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold mt-6 mb-3 text-white">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-white/80 leading-relaxed mb-4">{children}</p>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-teal hover:text-teal-light underline transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-2 text-white/80 mb-4">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-2 text-white/80 mb-4">{children}</ol>
              ),
              li: ({ children }) => <li className="text-white/80">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-teal pl-4 italic text-white/60 my-6">
                  {children}
                </blockquote>
              ),
              code: ({ className, children }) => {
                const isInline = !className
                if (isInline) {
                  return (
                    <code className="bg-navy-light px-2 py-1 rounded text-teal text-sm">
                      {children}
                    </code>
                  )
                }
                return (
                  <code className="block bg-navy-dark p-4 rounded-lg overflow-x-auto text-sm">
                    {children}
                  </code>
                )
              },
              pre: ({ children }) => (
                <pre className="bg-navy-dark p-4 rounded-lg overflow-x-auto my-4">
                  {children}
                </pre>
              ),
              hr: () => <hr className="border-white/10 my-8" />,
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt || ''}
                  className="rounded-lg max-w-full h-auto my-6"
                />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/50 hover:text-teal transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>

            <Link
              href="/#works"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-lg font-medium hover:bg-teal-light transition-colors"
            >
              View My Works
            </Link>
          </div>
        </footer>
      </article>
    </main>
  )
}
