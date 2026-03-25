export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          content_markdown: string
          cover_image_url: string | null
          tags: string[]
          status: 'draft' | 'published'
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt?: string | null
          content_markdown: string
          cover_image_url?: string | null
          tags?: string[]
          status?: 'draft' | 'published'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          slug?: string
          title?: string
          excerpt?: string | null
          content_markdown?: string
          cover_image_url?: string | null
          tags?: string[]
          status?: 'draft' | 'published'
          published_at?: string | null
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          slug: string
          title: string
          summary: string
          description_markdown: string | null
          project_url: string | null
          repository_url: string | null
          cover_image_url: string | null
          tags: string[]
          is_featured: boolean
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          summary: string
          description_markdown?: string | null
          project_url?: string | null
          repository_url?: string | null
          cover_image_url?: string | null
          tags?: string[]
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          slug?: string
          title?: string
          summary?: string
          description_markdown?: string | null
          project_url?: string | null
          repository_url?: string | null
          cover_image_url?: string | null
          tags?: string[]
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string | null
          display_name: string | null
          role: 'viewer' | 'editor' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          display_name?: string | null
          role?: 'viewer' | 'editor' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          email?: string | null
          display_name?: string | null
          role?: 'viewer' | 'editor' | 'admin'
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: {
      get_user_role: {
        Args: {
          user_id: string
        }
        Returns: 'viewer' | 'editor' | 'admin'
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
