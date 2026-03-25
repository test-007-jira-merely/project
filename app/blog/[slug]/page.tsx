import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPostBySlug } from '@/lib/services/posts'
import BlogPost from '@/components/BlogPost'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | SaulDesign Blog`,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      type: 'article',
      publishedTime: post.created_at,
      images: post.cover_image ? [post.cover_image] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen section-padding pt-24">
      <div className="container-custom max-w-4xl">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/60 hover:text-teal transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to blog
        </Link>

        <BlogPost post={post} />
      </div>
    </div>
  )
}
