-- Seed initial projects (matching existing Works component data)
INSERT INTO projects (title, description, category, image_url) VALUES
  ('Dashboard UI', 'Modern dashboard interface design', 'UI', NULL),
  ('Mobile App UX', 'User experience design for mobile', 'UX', NULL),
  ('E-commerce Website', 'Complete e-commerce solution', 'Web Design', NULL),
  ('Portfolio Design', 'Creative portfolio website', 'Web Design', NULL),
  ('Analytics Dashboard', 'Data visualization interface', 'UI', NULL),
  ('App Wireframes', 'Mobile app wireframe design', 'UX', NULL),
  ('Landing Page', 'Product landing page design', 'Web Design', NULL),
  ('UI Component Library', 'Reusable component system', 'UI', NULL),
  ('User Research', 'UX research and testing', 'UX', NULL)
ON CONFLICT DO NOTHING;

-- Seed a sample blog post
INSERT INTO posts (title, slug, content, published) VALUES
  (
    'Welcome to the Blog',
    'welcome-to-the-blog',
    '# Welcome to Our Blog

This is our first blog post! We are excited to share our thoughts, projects, and insights with you.

## What to Expect

- Project updates and case studies
- Design tips and tutorials
- Industry insights and trends

Stay tuned for more content!',
    true
  )
ON CONFLICT (slug) DO NOTHING;
