/*
  # User Profile and Role Management

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key)
      - `role` (user_role enum)
      - `full_name` (text)
      - `avatar_url` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on user_profiles
    - Public read access for profiles
    - Users can update their own profiles
    - Role-based update restrictions
*/

-- Drop existing objects if they exist
DROP TABLE IF EXISTS user_profiles;
DROP TYPE IF EXISTS user_role;

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

-- Allow users to update their own profiles, except role
CREATE POLICY "Users can update own profile except role"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND
    (role = (SELECT role FROM user_profiles WHERE id = auth.uid()))
  );

-- Allow super_admin to update any profile
CREATE POLICY "Super admin can update any profile"
  ON user_profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  )
  WITH CHECK (true);

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(
      (NEW.raw_user_meta_data->>'role')::user_role,
      'user'
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Create default super admin if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT FROM auth.users 
    WHERE email = 'admin@horizonlync.com'
  ) THEN
    -- Insert into auth.users
    INSERT INTO auth.users (
      id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      role,
      instance_id
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      'admin@horizonlync.com',
      crypt('admin123', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"System Admin","role":"super_admin"}',
      now(),
      now(),
      'authenticated',
      '00000000-0000-0000-0000-000000000000'
    );

    -- Insert into user_profiles
    INSERT INTO user_profiles (
      id,
      role,
      full_name
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      'super_admin',
      'System Admin'
    );
  END IF;
END $$;