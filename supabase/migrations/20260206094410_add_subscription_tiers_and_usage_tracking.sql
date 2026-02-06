/*
  # Add Subscription Tiers and Usage Tracking

  ## Overview
  This migration implements a three-tier subscription model (Free, Lite, Pro) with daily analysis limits:
  - Free: 5 analyses per day
  - Lite: 50 analyses per day
  - Pro: Unlimited analyses

  ## Changes

  1. **User Profiles**
     - Add `subscription_tier` column to track user's current tier (free, lite, pro)
     - Defaults to 'free' for new users

  2. **AI Analyses**
     - Add `user_id` column to link analyses to specific users
     - Required for tracking who requested each analysis

  3. **New Tables**
     - `user_usage_tracking`: Tracks daily analysis counts per user
       - `user_id`: References auth.users
       - `date`: Date of usage (for daily tracking)
       - `analyses_count`: Number of analyses performed that day
       - Unique constraint on (user_id, date) to ensure one record per user per day

  4. **Database Functions**
     - `get_user_daily_usage`: Returns today's analysis count for a user
     - `increment_user_usage`: Increments today's usage count for a user
     - `get_user_tier_limit`: Returns the daily limit based on user's tier

  5. **Security (RLS)**
     - Enable RLS on user_usage_tracking table
     - Users can read only their own usage data
     - System can insert/update usage records for authenticated users
*/

-- Add subscription_tier to user_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'subscription_tier'
  ) THEN
    ALTER TABLE user_profiles 
    ADD COLUMN subscription_tier text DEFAULT 'free' 
    CHECK (subscription_tier IN ('free', 'lite', 'pro'));
  END IF;
END $$;

-- Add user_id to ai_analyses
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ai_analyses' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE ai_analyses 
    ADD COLUMN user_id uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- Create user_usage_tracking table
CREATE TABLE IF NOT EXISTS user_usage_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  analyses_count integer DEFAULT 0 CHECK (analyses_count >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

-- Enable RLS on user_usage_tracking
ALTER TABLE user_usage_tracking ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_usage_tracking
CREATE POLICY "Users can view own usage data"
  ON user_usage_tracking
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage data"
  ON user_usage_tracking
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own usage data"
  ON user_usage_tracking
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Function to get user's daily usage count
CREATE OR REPLACE FUNCTION get_user_daily_usage(p_user_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_count integer;
BEGIN
  SELECT COALESCE(analyses_count, 0)
  INTO v_count
  FROM user_usage_tracking
  WHERE user_id = p_user_id
    AND date = CURRENT_DATE;
  
  RETURN COALESCE(v_count, 0);
END;
$$;

-- Function to increment user's daily usage
CREATE OR REPLACE FUNCTION increment_user_usage(p_user_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_new_count integer;
BEGIN
  INSERT INTO user_usage_tracking (user_id, date, analyses_count)
  VALUES (p_user_id, CURRENT_DATE, 1)
  ON CONFLICT (user_id, date)
  DO UPDATE SET
    analyses_count = user_usage_tracking.analyses_count + 1,
    updated_at = now()
  RETURNING analyses_count INTO v_new_count;
  
  RETURN v_new_count;
END;
$$;

-- Function to get user's tier limit
CREATE OR REPLACE FUNCTION get_user_tier_limit(p_user_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_tier text;
BEGIN
  SELECT subscription_tier
  INTO v_tier
  FROM user_profiles
  WHERE id = p_user_id;
  
  -- Return limit based on tier
  CASE v_tier
    WHEN 'free' THEN RETURN 5;
    WHEN 'lite' THEN RETURN 50;
    WHEN 'pro' THEN RETURN -1; -- -1 means unlimited
    ELSE RETURN 5; -- Default to free tier
  END CASE;
END;
$$;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_usage_tracking_user_date 
  ON user_usage_tracking(user_id, date);

CREATE INDEX IF NOT EXISTS idx_ai_analyses_user_id 
  ON ai_analyses(user_id);
