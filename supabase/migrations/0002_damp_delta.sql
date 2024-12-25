/*
  # Update contacts table policies

  1. Changes
    - Ensure RLS is enabled
    - Add or update policies for contact form submissions
    - Add or update policies for authenticated users

  Note: Table creation is skipped as it already exists
*/

-- Make sure RLS is enabled (idempotent)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ BEGIN
  DROP POLICY IF EXISTS "Anyone can submit contact forms" ON contacts;
  DROP POLICY IF EXISTS "Authenticated users can view contacts" ON contacts;
EXCEPTION
  WHEN undefined_object THEN
    NULL;
END $$;

-- Recreate policies
CREATE POLICY "Anyone can submit contact forms" ON contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contacts" ON contacts
  FOR SELECT
  TO authenticated
  USING (true);