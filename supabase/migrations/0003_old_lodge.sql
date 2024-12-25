/*
  # Blog System Schema

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `excerpt` (text)
      - `content` (text)
      - `image_url` (text)
      - `author_id` (uuid, references auth.users)
      - `category` (text)
      - `published` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
  2. Security
    - Enable RLS on `blog_posts` table
    - Public can read published posts
    - Only authenticated users can create/update posts
*/

CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image_url text NOT NULL,
  author_id uuid REFERENCES auth.users NOT NULL,
  category text NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read published posts
CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT
  TO public
  USING (published = true);

-- Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts" ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Authors can update their own posts
CREATE POLICY "Authors can update their own posts" ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);