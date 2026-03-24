# Database Schema

Run these SQL commands in your Supabase SQL editor to create the required tables.

## Tables

### Posts Table

```sql
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  cover_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT false
);

-- Create index for slug lookups
CREATE INDEX idx_posts_slug ON posts(slug);

-- Create index for published posts (for public queries)
CREATE INDEX idx_posts_published ON posts(published, created_at DESC);
```

### Projects Table

```sql
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  project_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('UI', 'UX', 'Web Design')),
  color TEXT NOT NULL DEFAULT 'purple',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for sorting
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
```

### User Profiles Table (Optional)

```sql
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto-creating profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Row Level Security (RLS)

Enable RLS and set up policies:

```sql
-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Posts policies
-- Anyone can read published posts
CREATE POLICY "Public can read published posts" ON posts
  FOR SELECT USING (published = true);

-- Authenticated users can do everything
CREATE POLICY "Authenticated users can manage posts" ON posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Projects policies
-- Anyone can read projects
CREATE POLICY "Public can read projects" ON projects
  FOR SELECT USING (true);

-- Authenticated users can manage projects
CREATE POLICY "Authenticated users can manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- User profiles policies
CREATE POLICY "Users can read own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);
```

## Seed Data (Optional)

```sql
-- Insert sample projects
INSERT INTO projects (title, description, category, color) VALUES
  ('Dashboard UI', 'Modern dashboard interface design', 'UI', 'purple'),
  ('Mobile App UX', 'User experience design for mobile', 'UX', 'gray'),
  ('E-commerce Website', 'Complete e-commerce solution', 'Web Design', 'teal'),
  ('Portfolio Design', 'Creative portfolio website', 'Web Design', 'blue'),
  ('Analytics Dashboard', 'Data visualization interface', 'UI', 'green'),
  ('App Wireframes', 'Mobile app wireframe design', 'UX', 'orange');

-- Insert sample post
INSERT INTO posts (title, slug, content, published) VALUES
  ('Welcome to My Blog', 'welcome-to-my-blog', '# Welcome\n\nThis is my first blog post!', true);
```
