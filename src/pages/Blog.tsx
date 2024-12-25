import React, { useEffect, useState } from 'react';
import { Calendar, User, Clock, ArrowRight, Tag, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

const categories = [
  'All',
  'Career Development',
  'Industry Insights',
  'Technology',
  'Interview Tips',
  'Resume Building'
];

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'All') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 lg:pt-32">
      <div className="enterprise-container">
        {/* Featured Post */}
        {posts.slice(0, 1).map(post => (
          <div key={post.id} className="mb-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-900 mb-6">
                  {post.category}
                </span>
                <h1 className="heading-xl mb-6">{post.title}</h1>
                <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>
                <div className="flex flex-wrap items-center gap-6 mb-8">
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
                <Link to={`/blog/${post.slug}`} className="btn-primary inline-flex">
                  Read Article
                  <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                </Link>
              </div>
              <div>
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Recent Posts */}
        <div className="mb-32">
          <h2 className="heading-lg mb-16">Recent Articles</h2>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-12">{error}</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(1).map(post => (
                <article key={post.id} className="enterprise-card group">
                  <div className="relative mb-6">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <span className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900">
                      {post.category}
                    </span>
                  </div>
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-6">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="text-gray-900 font-medium hover:text-gray-600 transition-colors"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="text-center">
          <h2 className="heading-lg mb-16">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                className={`btn-secondary ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : ''
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;