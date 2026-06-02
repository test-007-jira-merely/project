import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Beezi Test Project - Creative UI Designer',
  description: 'Portfolio of a creative UI/UX designer specializing in modern, user-centric design solutions',
  keywords: ['UI Design', 'UX Design', 'Web Design', 'Creative Designer', 'Portfolio'],
  authors: [{ name: 'Beezi Test Project' }],
  openGraph: {
    title: 'Beezi Test Project - Creative UI Designer',
    description: 'Portfolio of a creative UI/UX designer',
    type: 'website',
    siteName: 'Beezi Test Project',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beezi Test Project - Creative UI Designer',
    description: 'Portfolio of a creative UI/UX designer',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
