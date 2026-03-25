import Link from 'next/link';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function PostNotFound() {
  return (
    <main className="min-h-screen section-padding pt-32 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
          <FileQuestion className="w-10 h-10 text-white/40" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p className="text-white/60 mb-8 max-w-md">
          The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href={ROUTES.BLOG}
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal text-white rounded-full font-medium hover:bg-teal-light transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Blog
        </Link>
      </div>
    </main>
  );
}
