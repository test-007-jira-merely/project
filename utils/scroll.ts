export function scrollToSection(id: string): void {
  if (typeof document === 'undefined') return

  const element = document.getElementById(id)
  if (!element) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Section with id '${id}' not found`)
    }
    return
  }

  element.scrollIntoView({ behavior: 'smooth' })
}
