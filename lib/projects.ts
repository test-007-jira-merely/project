export type Project = {
  id: number
  slug: string
  title: string
  category: 'UI' | 'UX' | 'Web Design'
  image: string
  accentColor: string
  description: string
  longDescription: string
  technologies: string[]
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'dashboard-ui',
    title: 'Dashboard UI',
    category: 'UI',
    image: 'purple',
    accentColor: '#9333ea',
    description: 'Modern dashboard interface design',
    longDescription: 'A comprehensive admin dashboard featuring real-time data visualization, customizable widgets, and an intuitive navigation system designed for power users and administrators.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 2,
    slug: 'mobile-app-ux',
    title: 'Mobile App UX',
    category: 'UX',
    image: 'gray',
    accentColor: '#6b7280',
    description: 'User experience design for mobile',
    longDescription: 'A thoughtful mobile user experience design that prioritizes intuitive navigation, accessibility, and delightful micro-interactions to create a seamless mobile journey.',
    technologies: ['Figma', 'React Native', 'TypeScript', 'Framer Motion'],
  },
  {
    id: 3,
    slug: 'e-commerce-website',
    title: 'E-commerce Website',
    category: 'Web Design',
    image: 'teal',
    accentColor: '#14b8a6',
    description: 'Complete e-commerce solution',
    longDescription: 'A full-featured e-commerce platform with product catalog, shopping cart, secure checkout, and order management system designed for both customers and administrators.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
  },
  {
    id: 4,
    slug: 'portfolio-design',
    title: 'Portfolio Design',
    category: 'Web Design',
    image: 'blue',
    accentColor: '#3b82f6',
    description: 'Creative portfolio website',
    longDescription: 'A stunning portfolio website that showcases creative work with elegant animations, smooth transitions, and a clean layout that lets the work speak for itself.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 5,
    slug: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    category: 'UI',
    image: 'green',
    accentColor: '#22c55e',
    description: 'Data visualization interface',
    longDescription: 'An advanced analytics dashboard that transforms complex data into clear, actionable insights through interactive charts, graphs, and real-time updates.',
    technologies: ['React', 'TypeScript', 'D3.js', 'Tailwind CSS'],
  },
  {
    id: 6,
    slug: 'app-wireframes',
    title: 'App Wireframes',
    category: 'UX',
    image: 'orange',
    accentColor: '#f97316',
    description: 'Mobile app wireframe design',
    longDescription: 'Comprehensive wireframe designs for a mobile application, covering user flows, screen layouts, and interaction patterns from concept to high-fidelity prototypes.',
    technologies: ['Figma', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 7,
    slug: 'landing-page',
    title: 'Landing Page',
    category: 'Web Design',
    image: 'pink',
    accentColor: '#ec4899',
    description: 'Product landing page design',
    longDescription: 'A conversion-focused landing page design that combines compelling copy, stunning visuals, and clear calls-to-action to drive user engagement and conversions.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 8,
    slug: 'ui-component-library',
    title: 'UI Component Library',
    category: 'UI',
    image: 'indigo',
    accentColor: '#6366f1',
    description: 'Reusable component system',
    longDescription: 'A comprehensive UI component library with reusable, accessible components that maintain consistency across multiple projects and enable rapid development.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Storybook'],
  },
  {
    id: 9,
    slug: 'user-research',
    title: 'User Research',
    category: 'UX',
    image: 'red',
    accentColor: '#ef4444',
    description: 'UX research and testing',
    longDescription: 'In-depth user research project involving interviews, usability testing, and data analysis to uncover user needs and validate design decisions with real users.',
    technologies: ['Figma', 'TypeScript', 'React', 'Tailwind CSS'],
  },
]

export const colorMap: Record<string, string> = {
  purple: 'bg-purple-600',
  gray: 'bg-gray-600',
  teal: 'bg-teal-600',
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  orange: 'bg-orange-600',
  pink: 'bg-pink-600',
  indigo: 'bg-indigo-600',
  red: 'bg-red-600',
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
