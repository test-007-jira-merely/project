# Portfolio & Blog Platform

A production-ready Next.js 14 portfolio website with dynamic content management, blog system, and admin dashboard. Built with TypeScript, Supabase, and Tailwind CSS with beautiful glassmorphism design.

## Features

- **Dynamic Content Management**: Manage blog posts and portfolio projects through an admin dashboard
- **Blog System**: Markdown-based blog with SEO-friendly URLs and pagination
- **Admin Dashboard**: Secure, role-based admin panel for content creation and management
- **Authentication**: Email/password authentication via Supabase Auth
- **Database Integration**: PostgreSQL database via Supabase with Row Level Security
- **Responsive Design**: Beautiful glassmorphism UI with teal accents
- **Type-Safe**: Fully typed with TypeScript (strict mode)
- **Modern Stack**: Next.js 14 with App Router, Server Components, and Server Actions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Markdown**: react-markdown with remark-gfm
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier works)

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your keys
3. Go to SQL Editor and run the migrations:
   - Copy and run `supabase/migrations/001_initial_schema.sql`
   - Copy and run `supabase/migrations/002_seed_projects.sql`

### 3. Create Admin User

1. Go to Authentication in Supabase dashboard
2. Create a new user with email/password
3. Copy the user's UUID
4. Go to SQL Editor and run:

```sql
UPDATE profiles
SET role = 'admin'
WHERE id = 'your-user-uuid-here';
```

### 4. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Usage

### Admin Access

1. Visit `/login`
2. Sign in with your admin credentials
3. Access the admin dashboard at `/admin`

### Admin Features

- **Dashboard**: Overview of posts and projects
- **Posts Management**: Create, edit, delete, and publish blog posts
- **Projects Management**: Manage portfolio projects displayed on homepage
- **Markdown Editor**: Write blog content in Markdown

### Public Features

- **Homepage**: Hero section, about, dynamic works/projects section
- **Blog**: Public blog with pagination and SEO-friendly URLs
- **Individual Posts**: Markdown-rendered blog posts with syntax highlighting

## Project Structure

```
├── app/
│   ├── admin/              # Admin dashboard pages
│   │   ├── posts/          # Post management
│   │   └── projects/       # Project management
│   ├── blog/               # Public blog pages
│   ├── login/              # Authentication page
│   └── page.tsx            # Homepage
├── components/
│   ├── admin/              # Admin-specific components
│   ├── Works.tsx           # Dynamic projects section
│   ├── LoadingSkeleton.tsx # Loading state components
│   └── ErrorBoundary.tsx   # Error handling
├── lib/
│   ├── services/           # Data access layer
│   │   ├── posts.ts        # Blog post operations
│   │   └── projects.ts     # Project operations
│   ├── supabase/           # Supabase clients
│   │   ├── client.ts       # Browser client
│   │   └── server.ts       # Server client
│   ├── types/              # TypeScript types
│   │   └── database.ts     # Database entity types
│   └── auth.ts             # Authentication utilities
├── supabase/
│   └── migrations/         # Database migrations
└── middleware.ts           # Route protection
```

## Database Schema

### Posts
- Blog posts with markdown content
- Slug-based routing
- Published/draft status
- Cover images

### Projects
- Portfolio projects
- Tags for filtering
- Order management
- External links

### Profiles
- User profiles extending Supabase auth
- Role-based access control (admin/editor)

## Development

### Adding New Features

1. **New Database Table**: Add migration in `supabase/migrations/`
2. **Type Definitions**: Update `lib/types/database.ts`
3. **Service Layer**: Create/update service in `lib/services/`
4. **UI Components**: Build components in `components/`
5. **Pages**: Create pages in `app/`

### Code Quality Standards

- No `any` types (TypeScript strict mode)
- Separate concerns (UI, services, data layer)
- Server Components by default, Client Components only when needed
- Proper error handling and loading states
- Reusable, composable components

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your-production-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## Troubleshooting

### "Invalid API key" error
- Verify environment variables in `.env.local`
- Restart development server after changes

### Permission denied errors
- Check RLS policies in Supabase
- Verify user has admin role in profiles table

### Projects not displaying
- Verify seed migration ran successfully
- Check browser console for errors

### Authentication issues
- Clear cookies and try again
- Check Supabase Auth settings
- Verify middleware configuration

## Performance Optimizations

- Server Components for static content
- Dynamic imports for heavy components
- Image optimization with Next.js Image
- Database query optimization with indexes
- Proper caching strategies with revalidation

## Security

- Row Level Security (RLS) enabled on all tables
- Environment variables for sensitive data
- CSRF protection via Supabase
- Secure cookie handling
- Input validation on all forms

## License

MIT License - feel free to use this template for your own portfolio!
