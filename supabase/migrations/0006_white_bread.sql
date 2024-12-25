/*
  # Add user roles and profiles

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `role` (text, enum of roles)
      - `full_name` (text)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on user_profiles
    - Add policies for profile access and updates
*/

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'faculty', 'user');

-- Create user profiles table
CREATE TABLE user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'user',
  full_name text NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON user_profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Function to update profile timestamps
CREATE OR REPLACE FUNCTION update_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating timestamps
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_profile_updated_at();