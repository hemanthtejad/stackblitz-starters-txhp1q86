import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Failed to load blog post. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 lg:pt-32 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-24 lg:pt-32">
        <div className="enterprise-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-8">Post Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">
              {error || "The blog post you're looking for doesn't exist."}
            </p>
            <Link to="/blog" className="btn-primary">
              <ArrowLeft className="mr-2 h-5 w-5 inline-block" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      <div className="enterprise-container">
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Blog
            </Link>
            <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-900 mb-6">
              {post.category}
            </span>
            <h1 className="heading-xl mb-8">{post.title}</h1>
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">Admin</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full rounded-2xl shadow-lg"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;