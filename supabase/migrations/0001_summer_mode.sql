/*
  # Create contacts table

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `created_at` (timestamp with timezone)
      - `status` (text) - For tracking contact request status

  2. Security
    - Enable RLS
    - Add policy for inserting new contact requests
    - Add policy for admin to read all contacts
*/

CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit contact forms
CREATE POLICY "Anyone can submit contact forms" ON contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users can view contacts
CREATE POLICY "Authenticated users can view contacts" ON contacts
  FOR SELECT
  TO authenticated
  USING (true);