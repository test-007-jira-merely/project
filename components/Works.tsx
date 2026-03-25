'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { getProjects } from '@/lib/db/projects';
import { CardSkeleton, EmptyState, ErrorState } from '@/components/ui';
import { PROJECT_FILTER_OPTIONS, PROJECT_COLOR_MAP, DEFAULT_PROJECT_COLORS } from '@/lib/constants';
import type { Project, ProjectCategory } from '@/types/database';

type Filter = (typeof PROJECT_FILTER_OPTIONS)[number];

// Fallback static data for when database is not available
const FALLBACK_PROJECTS: Project[] = [
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

// Get a color based on project index or title
function getProjectColor(index: number, title: string): string {
  const colorIndex = (title.charCodeAt(0) + index) % DEFAULT_PROJECT_COLORS.length;
  const colorKey = DEFAULT_PROJECT_COLORS[colorIndex];
  return PROJECT_COLOR_MAP[colorKey] || 'bg-teal-600';
}

export default function Works() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);
      setError(null);

      const result = await getProjects();

      if (result.error) {
        // Use fallback data if database is not available
        console.warn('Using fallback projects:', result.error);
        setProjects(FALLBACK_PROJECTS);
        setIsLoading(false);
        return;
      }

      if (result.data && result.data.length > 0) {
        setProjects(result.data);
      } else {
        // Use fallback if no projects in database
        setProjects(FALLBACK_PROJECTS);
      }

      setIsLoading(false);
    }

    fetchProjects();
  }, []);

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    getProjects().then((result) => {
      if (result.error) {
        setProjects(FALLBACK_PROJECTS);
      } else if (result.data && result.data.length > 0) {
        setProjects(result.data);
      } else {
        setProjects(FALLBACK_PROJECTS);
      }
      setIsLoading(false);
    });
  };

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
          {PROJECT_FILTER_OPTIONS.map((filter) => (
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
              <CardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <ErrorState message={error} onRetry={handleRetry} />
        )}

        {/* Projects Grid */}
        {!isLoading && !error && (
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
                <a
                  href={project.project_url || '#'}
                  target={project.project_url ? '_blank' : undefined}
                  rel={project.project_url ? 'noopener noreferrer' : undefined}
                  className="block"
                >
                  <div className="glass-effect rounded-2xl overflow-hidden hover:border-teal transition-all duration-300 hover:glow-effect cursor-pointer">
                    {/* Project Image */}
                    <div
                      className={`h-48 relative overflow-hidden ${
                        project.image_url ? '' : getProjectColor(index, project.title)
                      }`}
                    >
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-teal/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          className="text-white"
                        >
                          <ExternalLink size={32} />
                        </motion.div>
                      </div>

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
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredProjects.length === 0 && (
          <EmptyState
            title="No projects found"
            description="No projects found in this category."
          />
        )}
      </div>
    </section>
  );
}
