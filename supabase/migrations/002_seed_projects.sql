-- Seed initial projects (migrated from existing hardcoded data)
INSERT INTO projects (title, description, image_url, project_url, tags, order_index) VALUES
(
  'E-commerce Platform',
  'A full-stack e-commerce solution with payment integration',
  'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
  'https://example.com/ecommerce',
  ARRAY['React', 'Node.js', 'Stripe'],
  1
),
(
  'Task Management App',
  'Collaborative task management tool with real-time updates',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
  'https://example.com/taskapp',
  ARRAY['Vue.js', 'Firebase', 'Tailwind'],
  2
),
(
  'Social Media Dashboard',
  'Analytics dashboard for social media management',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
  'https://example.com/dashboard',
  ARRAY['React', 'D3.js', 'Express'],
  3
),
(
  'Weather Forecast App',
  'Real-time weather tracking with beautiful UI',
  'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800',
  'https://example.com/weather',
  ARRAY['React Native', 'OpenWeather API'],
  4
),
(
  'Blog CMS',
  'Content management system for blogs and articles',
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
  'https://example.com/cms',
  ARRAY['Next.js', 'MongoDB', 'MDX'],
  5
),
(
  'Fitness Tracker',
  'Track workouts and nutrition with progress analytics',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
  'https://example.com/fitness',
  ARRAY['React', 'GraphQL', 'PostgreSQL'],
  6
),
(
  'Recipe Sharing Platform',
  'Community-driven recipe sharing and rating system',
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800',
  'https://example.com/recipes',
  ARRAY['Angular', 'NestJS', 'AWS'],
  7
),
(
  'Real Estate Marketplace',
  'Property listing and search platform',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
  'https://example.com/realestate',
  ARRAY['React', 'Mapbox', 'Django'],
  8
),
(
  'Online Learning Platform',
  'Interactive courses with video streaming',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
  'https://example.com/learning',
  ARRAY['Next.js', 'Supabase', 'Stripe'],
  9
);
