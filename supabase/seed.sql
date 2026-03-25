-- Seed some initial projects (matching existing static data)
INSERT INTO projects (title, description, image_url, category) VALUES
  ('Dashboard UI', 'Modern dashboard interface design', NULL, 'UI'),
  ('Mobile App UX', 'User experience design for mobile', NULL, 'UX'),
  ('E-commerce Website', 'Complete e-commerce solution', NULL, 'Web Design'),
  ('Portfolio Design', 'Creative portfolio website', NULL, 'Web Design'),
  ('Analytics Dashboard', 'Data visualization interface', NULL, 'UI'),
  ('App Wireframes', 'Mobile app wireframe design', NULL, 'UX')
ON CONFLICT DO NOTHING;

-- Seed a sample blog post
INSERT INTO posts (title, slug, content, published) VALUES
  ('Welcome to the Blog', 'welcome-to-the-blog', '# Welcome!\n\nThis is the first blog post on SaulDesign. Stay tuned for more content about UI/UX design and web development.', true)
ON CONFLICT DO NOTHING;
