/*
  # Add More Blog Posts

  1. New Content
    - Adds 3 new blog posts:
      - "Mastering Remote Work"
      - "Building a Personal Brand"
      - "Effective Networking Strategies"

  2. Data
    - Each post includes:
      - Title, slug, excerpt
      - Full HTML content
      - Category
      - Image URL
      - Author reference
*/

-- Insert additional blog posts
INSERT INTO blog_posts (
  title,
  slug,
  excerpt,
  content,
  image_url,
  author_id,
  category,
  published
) VALUES
  (
    'Mastering Remote Work: A Guide to Success',
    'mastering-remote-work',
    'Learn essential strategies and tools for thriving in a remote work environment while maintaining productivity and work-life balance.',
    '<p>Remote work has become a permanent fixture in the modern workplace. Success in this environment requires a unique set of skills and strategies.</p>
    <h2>Essential Remote Work Skills</h2>
    <ul>
      <li>Digital Communication Mastery</li>
      <li>Time Management and Self-Discipline</li>
      <li>Virtual Collaboration Tools</li>
      <li>Work-Life Balance Strategies</li>
    </ul>
    <h2>Creating an Effective Home Office</h2>
    <p>Your workspace significantly impacts your productivity and professional presence. Consider these factors:</p>
    <ul>
      <li>Ergonomic Setup</li>
      <li>Professional Background for Video Calls</li>
      <li>Reliable Technology Infrastructure</li>
      <li>Distraction-Free Environment</li>
    </ul>
    <p>Master these elements to excel in the remote work landscape and advance your career from anywhere.</p>',
    'https://images.unsplash.com/photo-1584931423298-c576fda54bd2?auto=format&fit=crop&q=80&w=1200',
    'c9c1c8e2-566f-4598-8527-8b952ba5c5c9',
    'Career Development',
    true
  ),
  (
    'Building a Personal Brand in the Digital Age',
    'building-personal-brand',
    'Discover how to create and maintain a strong personal brand that sets you apart in your industry and attracts career opportunities.',
    '<p>Your personal brand is your professional reputation in the digital age. It''s how you present yourself to the world and how others perceive your value.</p>
    <h2>Key Elements of Personal Branding</h2>
    <ul>
      <li>Professional Online Presence</li>
      <li>Consistent Value Proposition</li>
      <li>Thought Leadership Content</li>
      <li>Authentic Storytelling</li>
    </ul>
    <h2>Building Your Digital Presence</h2>
    <p>Establish yourself as an industry authority through:</p>
    <ul>
      <li>LinkedIn Profile Optimization</li>
      <li>Professional Portfolio Development</li>
      <li>Content Creation Strategy</li>
      <li>Networking Platform Selection</li>
    </ul>
    <p>A strong personal brand opens doors to opportunities and positions you as a leader in your field.</p>',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200',
    'c9c1c8e2-566f-4598-8527-8b952ba5c5c9',
    'Career Development',
    true
  ),
  (
    'Effective Networking Strategies for Career Growth',
    'effective-networking-strategies',
    'Master the art of professional networking with proven strategies that help you build meaningful connections and advance your career.',
    '<p>Networking remains one of the most powerful tools for career advancement. Learn how to build and maintain professional relationships effectively.</p>
    <h2>Modern Networking Approaches</h2>
    <ul>
      <li>Virtual Networking Events</li>
      <li>Industry-Specific Communities</li>
      <li>Social Media Engagement</li>
      <li>Professional Meetups</li>
    </ul>
    <h2>Building Lasting Connections</h2>
    <p>Create meaningful professional relationships through:</p>
    <ul>
      <li>Value-First Approach</li>
      <li>Active Listening</li>
      <li>Follow-Up Strategies</li>
      <li>Relationship Maintenance</li>
    </ul>
    <p>Effective networking is about building genuine relationships that benefit both parties long-term.</p>',
    'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=1200',
    'c9c1c8e2-566f-4598-8527-8b952ba5c5c9',
    'Career Development',
    true
  );