import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SaulDesign - Creative UI Designer',
  description: 'Portfolio of a creative UI/UX designer specializing in modern, user-centric design solutions',
  keywords: ['UI Design', 'UX Design', 'Web Design', 'Creative Designer', 'Portfolio'],
  authors: [{ name: 'SaulDesign' }],
  openGraph: {
    title: 'SaulDesign - Creative UI Designer',
    description: 'Portfolio of a creative UI/UX designer',
    type: 'website',
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
