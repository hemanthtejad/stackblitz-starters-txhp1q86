-- Drop and recreate user_profiles table with proper constraints
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
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_role CHECK (role IN ('super_admin', 'admin', 'faculty', 'user'))
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
  WITH CHECK (auth.uid() = id AND (
    -- Users can't change their role
    (OLD.role = NEW.role) OR 
    -- Only super_admin can change roles
    (auth.uid() IN (SELECT id FROM user_profiles WHERE role = 'super_admin'))
  ));

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(
      NULLIF(NULLIF(NEW.raw_user_meta_data->>'role', ''), 'authenticated')::user_role,
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

-- Create default super admin
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
)
SELECT 
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
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'admin@horizonlync.com'
);