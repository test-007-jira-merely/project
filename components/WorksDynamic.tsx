'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/database.types';
import { ProjectCardSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { PROJECT_COLOR_MAP } from '@/lib/constants';

const filters = ['All', 'UI', 'UX', 'Web Design'] as const;
type Filter = (typeof filters)[number];

// Fallback static data when no database projects exist
const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'Dashboard UI',
    category: 'UI',
    image_url: null,
    project_url: null,
    description: 'Modern dashboard interface design',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Mobile App UX',
    category: 'UX',
    image_url: null,
    project_url: null,
    description: 'User experience design for mobile',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'E-commerce Website',
    category: 'Web Design',
    image_url: null,
    project_url: null,
    description: 'Complete e-commerce solution',
    created_at: new Date().toISOString(),
  },
];

// Color assignment based on project
function getProjectColor(project: Project, index: number): string {
  const colors = Object.values(PROJECT_COLOR_MAP);
  // Use a combination of id and index for variety
  const colorIndex = (project.id.charCodeAt(0) + index) % colors.length;
  return colors[colorIndex];
}

interface WorksDynamicProps {
  initialProjects?: Project[];
}

export default function WorksDynamic({ initialProjects }: WorksDynamicProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [isLoading, setIsLoading] = useState(!initialProjects);

  // Fetch projects if not provided as props
  useEffect(() => {
    if (initialProjects) return;

    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data.length > 0 ? data : fallbackProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        // Use fallback data on error
        setProjects(fallbackProjects);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, [initialProjects]);

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section id="works" ref={ref} className="min-h-screen section-padding">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My recent <span className="text-gradient">works</span>
          </h2>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-teal text-white shadow-lg glow-effect'
                  : 'glass-effect text-white/70 hover:text-white hover:border-teal'
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="glass-effect rounded-2xl overflow-hidden hover:border-teal transition-all duration-300 hover:glow-effect cursor-pointer">
                  {/* Project Image */}
                  <div
                    className={`h-48 relative overflow-hidden ${
                      project.image_url ? '' : getProjectColor(project, index)
                    }`}
                  >
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
                    )}

                    {/* Hover Overlay */}
                    <a
                      href={project.project_url || '#'}
                      target={project.project_url ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-teal/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    >
                      <ExternalLink size={32} className="text-white" />
                    </a>

                    {/* Decorative elements */}
                    <div className="absolute top-4 left-4">
                      <div className="w-16 h-16 border-2 border-white/20 rounded-lg" />
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm" />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white group-hover:text-teal transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-white/60 text-sm">{project.description}</p>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-teal/20 text-teal text-xs rounded-full border border-teal/30">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredProjects.length === 0 && (
          <EmptyState
            title="No projects found"
            message="No projects found in this category."
          />
        )}
      </div>
    </section>
  );
}
