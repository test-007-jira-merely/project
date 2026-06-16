import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './hello.module.css'

export const metadata: Metadata = {
  title: 'Hello | SaulDesign',
  description: 'Welcome to the Hello page',
}

export default function HelloPage() {
  return (
    <main className={`min-h-screen pt-32 section-padding ${styles.helloPage}`}>
      <div className="container-custom text-center">
        <h1 className={`text-4xl md:text-5xl font-bold ${styles.heading}`}>
          Hello, World!
        </h1>
        <p className={styles.lead}>
          Welcome to the Hello page. This is a dedicated space to demonstrate
          client-side routing and page-level structure within the Next.js App Router.
        </p>
        <Link href="/" className={styles.ctaButton}>
          Back to Home
        </Link>
      </div>
    </main>
  )
}
