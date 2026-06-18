export type Project = {
  id: number
  title: string
  category: 'UI' | 'UX' | 'Web Design'
  image: string
  description: string
  accentColor: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Dashboard UI',
    category: 'UI',
    image: 'purple',
    description: 'Modern dashboard interface design',
    accentColor: '#9333ea',
  },
  {
    id: 2,
    title: 'Mobile App UX',
    category: 'UX',
    image: 'gray',
    description: 'User experience design for mobile',
    accentColor: '#4b5563',
  },
  {
    id: 3,
    title: 'E-commerce Website',
    category: 'Web Design',
    image: 'teal',
    description: 'Complete e-commerce solution',
    accentColor: '#14b8a6',
  },
  {
    id: 4,
    title: 'Portfolio Design',
    category: 'Web Design',
    image: 'blue',
    description: 'Creative portfolio website',
    accentColor: '#2563eb',
  },
  {
    id: 5,
    title: 'Analytics Dashboard',
    category: 'UI',
    image: 'green',
    description: 'Data visualization interface',
    accentColor: '#16a34a',
  },
  {
    id: 6,
    title: 'App Wireframes',
    category: 'UX',
    image: 'orange',
    description: 'Mobile app wireframe design',
    accentColor: '#ea580c',
  },
  {
    id: 7,
    title: 'Landing Page',
    category: 'Web Design',
    image: 'pink',
    description: 'Product landing page design',
    accentColor: '#ec4899',
  },
  {
    id: 8,
    title: 'UI Component Library',
    category: 'UI',
    image: 'indigo',
    description: 'Reusable component system',
    accentColor: '#6366f1',
  },
  {
    id: 9,
    title: 'User Research',
    category: 'UX',
    image: 'red',
    description: 'UX research and testing',
    accentColor: '#dc2626',
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

export const filters = ['All', 'UI', 'UX', 'Web Design'] as const
export type Filter = (typeof filters)[number]
