'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileX } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function BlogPostNotFound() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="min-h-screen flex items-center justify-center section-padding">
        <div className="text-center">
          <FileX size={64} className="text-white/30 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-white/60 mb-8">
            The blog post you are looking for does not exist or has been removed.
          </p>
          <Link
            href={ROUTES.BLOG}
            className="inline-block px-8 py-3 bg-teal text-white rounded-full font-medium hover:bg-teal-light transition-colors duration-300"
          >
            Back to Blog
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
