export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          cover_image: string | null
          created_at: string
          updated_at: string
          published: boolean
          author_id: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          cover_image?: string | null
          created_at?: string
          updated_at?: string
          published?: boolean
          author_id?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          cover_image?: string | null
          created_at?: string
          updated_at?: string
          published?: boolean
          author_id?: string | null
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string | null
          project_url: string | null
          category: string
          created_at: string
          display_order: number
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url?: string | null
          project_url?: string | null
          category?: string
          created_at?: string
          display_order?: number
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string | null
          project_url?: string | null
          category?: string
          created_at?: string
          display_order?: number
        }
      }
    }
  }
}

export type Post = Database['public']['Tables']['posts']['Row']
export type PostInsert = Database['public']['Tables']['posts']['Insert']
export type PostUpdate = Database['public']['Tables']['posts']['Update']

export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']
