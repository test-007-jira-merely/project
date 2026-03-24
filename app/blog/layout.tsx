import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | SaulDesign',
  description: 'Thoughts, tutorials, and insights about design, development, and creativity.',
  openGraph: {
    title: 'Blog | SaulDesign',
    description: 'Thoughts, tutorials, and insights about design, development, and creativity.',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
