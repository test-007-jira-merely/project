import { scrollToSection } from '@/lib/scroll'
import { STYLES } from '@/lib/constants'
import type { SectionId } from '@/lib/constants'

interface NavButtonProps {
  section: SectionId
  label: string
}

export default function NavButton({ section, label }: NavButtonProps) {
  return (
    <button
      onClick={() => scrollToSection(section)}
      className={STYLES.NAV_BUTTON}
      aria-label={`Navigate to ${label}`}
    >
      {label}
    </button>
  )
}
