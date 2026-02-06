/*
  # Add User Profiles Table

  ## Overview
  Creates a user profiles table to store additional user information like full name.

  ## New Tables

  ### `user_profiles`
  Stores extended user profile information
  - `id` (uuid, primary key) - References auth.users(id)
  - `full_name` (text) - User's full name
  - `created_at` (timestamptz) - Profile creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on user_profiles table
  - Users can read all profiles (for displaying names in UI)
  - Users can only update their own profile
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Anyone can view user profiles"
  ON user_profiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create index for efficient lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_id ON user_profiles(id);
