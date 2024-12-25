/*
  # Add sample blog content

  1. New Content
    - Add sample blog posts for testing
    - Add categories and tags
  
  2. Security
    - Maintain existing RLS policies
*/

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, image_url, author_id, category, published)
VALUES
  (
    'The Future of Work: Bridging the Skills Gap',
    'future-of-work-bridging-skills-gap',
    'Explore how the evolving job market demands new skills and how you can stay ahead of the curve.',
    '<p>The modern workplace is rapidly evolving, driven by technological advancement and changing business needs. This transformation has created a significant skills gap between what employers need and what the workforce currently offers.</p>
    <h2>Key Trends Shaping the Future of Work</h2>
    <ul>
      <li>Artificial Intelligence and Automation</li>
      <li>Remote and Hybrid Work Models</li>
      <li>Digital Transformation</li>
      <li>Emphasis on Soft Skills</li>
    </ul>
    <p>To stay competitive in this evolving landscape, professionals must continuously update their skills and embrace lifelong learning.</p>',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
    auth.uid(),
    'Industry Insights',
    true
  ),
  (
    'Top 5 Skills Employers Look For in 2024',
    'top-skills-employers-2024',
    'Discover the most in-demand skills that can set you apart in today''s competitive job market.',
    '<p>As we move further into 2024, certain skills have become increasingly valuable to employers. Understanding and developing these skills can significantly improve your career prospects.</p>
    <h2>Most In-Demand Skills</h2>
    <ol>
      <li>Data Analysis and Interpretation</li>
      <li>Digital Communication</li>
      <li>Adaptability and Resilience</li>
      <li>Project Management</li>
      <li>Artificial Intelligence Literacy</li>
    </ol>
    <p>These skills represent a combination of technical capabilities and soft skills that are essential in the modern workplace.</p>',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
    auth.uid(),
    'Career Development',
    true
  ),
  (
    'How AI is Shaping the Future of Work',
    'ai-shaping-future-work',
    'An in-depth look at how artificial intelligence is transforming industries and job roles.',
    '<p>Artificial Intelligence is no longer a futuristic concept—it''s here and it''s transforming how we work. Understanding its impact is crucial for career planning and professional development.</p>
    <h2>Key Areas of AI Impact</h2>
    <ul>
      <li>Automation of Routine Tasks</li>
      <li>Enhanced Decision Making</li>
      <li>Personalized Learning</li>
      <li>New Job Opportunities</li>
    </ul>
    <p>While AI will automate certain tasks, it''s also creating new opportunities for those who can adapt and leverage these technologies.</p>',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
    auth.uid(),
    'Technology',
    true
  );