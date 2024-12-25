export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          role: 'super_admin' | 'admin' | 'faculty' | 'user';
          full_name: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: 'super_admin' | 'admin' | 'faculty' | 'user';
          full_name: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: 'super_admin' | 'admin' | 'faculty' | 'user';
          full_name?: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          image_url: string;
          author_id: string;
          category: string;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          image_url: string;
          author_id: string;
          category: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string;
          content?: string;
          image_url?: string;
          author_id?: string;
          category?: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      contacts: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          email: string;
          subject: string;
          message: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          first_name: string;
          last_name: string;
          email: string;
          subject: string;
          message: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          subject?: string;
          message?: string;
          status?: string;
          created_at?: string;
        };
      };
    };
  };
}