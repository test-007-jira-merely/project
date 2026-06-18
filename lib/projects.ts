export type ProjectCategory = 'UI' | 'UX' | 'Web Design'

export type Project = {
  id: number
  title: string
  category: ProjectCategory
  image: string
  accentColor: string
  description: string
}

export const projectFilters = ['All', 'UI', 'UX', 'Web Design'] as const
export type ProjectFilter = (typeof projectFilters)[number]

export const projects: Project[] = [
  {
    id: 1,
    title: 'Dashboard UI',
    category: 'UI',
    image: 'purple',
    accentColor: 'bg-purple-600',
    description: 'Modern dashboard interface design',
  },
  {
    id: 2,
    title: 'Mobile App UX',
    category: 'UX',
    image: 'gray',
    accentColor: 'bg-gray-600',
    description: 'User experience design for mobile',
  },
  {
    id: 3,
    title: 'E-commerce Website',
    category: 'Web Design',
    image: 'teal',
    accentColor: 'bg-teal-600',
    description: 'Complete e-commerce solution',
  },
  {
    id: 4,
    title: 'Portfolio Design',
    category: 'Web Design',
    image: 'blue',
    accentColor: 'bg-blue-600',
    description: 'Creative portfolio website',
  },
  {
    id: 5,
    title: 'Analytics Dashboard',
    category: 'UI',
    image: 'green',
    accentColor: 'bg-green-600',
    description: 'Data visualization interface',
  },
  {
    id: 6,
    title: 'App Wireframes',
    category: 'UX',
    image: 'orange',
    accentColor: 'bg-orange-600',
    description: 'Mobile app wireframe design',
  },
  {
    id: 7,
    title: 'Landing Page',
    category: 'Web Design',
    image: 'pink',
    accentColor: 'bg-pink-600',
    description: 'Product landing page design',
  },
  {
    id: 8,
    title: 'UI Component Library',
    category: 'UI',
    image: 'indigo',
    accentColor: 'bg-indigo-600',
    description: 'Reusable component system',
  },
  {
    id: 9,
    title: 'User Research',
    category: 'UX',
    image: 'red',
    accentColor: 'bg-red-600',
    description: 'UX research and testing',
  },
]
