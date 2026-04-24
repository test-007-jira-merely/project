import type { SectionId } from '@/lib/constants'
import { scrollToSection } from '@/lib/scroll'

interface NavButtonProps {
  sectionId: SectionId
  label: string
  className?: string
}

export default function NavButton({ sectionId, label, className = '' }: NavButtonProps) {
  return (
    <button
      onClick={() => scrollToSection(sectionId)}
      className={`text-white/80 hover:text-white transition-colors duration-300 ${className}`}
      aria-label={`Navigate to ${label}`}
    >
      {label}
    </button>
  )
}
