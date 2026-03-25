import Link from 'next/link';
import { FileX } from 'lucide-react';

export default function PostNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center section-padding">
      <div className="text-center">
        <FileX size={64} className="mx-auto mb-6 text-white/30" />
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <p className="text-white/60 mb-8">
          The post you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/blog"
          className="px-6 py-3 bg-teal text-white rounded-full font-medium hover:bg-teal-light transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    </main>
  );
}
