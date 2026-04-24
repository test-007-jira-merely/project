export type SectionId = 'home' | 'about' | 'contact'

export const scrollToSection = (id: SectionId | string): void => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
