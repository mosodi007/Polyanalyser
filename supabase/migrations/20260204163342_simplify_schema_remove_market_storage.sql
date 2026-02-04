/*
  # Simplify Database Schema - Remove Polymarket Data Storage

  ## Overview
  Remove storage of Polymarket data (markets, prices) and fetch on-demand instead.
  Keep only our own generated data: AI analyses, user watchlists, and performance tracking.

  ## Changes

  ### Removed Tables
  - `markets` - Fetch from Polymarket API on-demand
  - `market_prices` - Fetch from Polymarket API on-demand

  ### Modified Tables
  - `ai_analyses` - Remove foreign key to markets, store market_id as text reference
  - `user_watchlist` - Remove foreign key to markets, store market_id as text reference
  - `analysis_performance` - Remove foreign key to markets, store market_id as text reference

  ## Rationale
  - Polymarket data is large and changes frequently
  - Real-time fetching ensures fresh data
  - Reduces database size and sync complexity
  - Only store our own analysis and user data
*/

-- Drop existing foreign key constraints
ALTER TABLE IF EXISTS ai_analyses DROP CONSTRAINT IF EXISTS ai_analyses_market_id_fkey;
ALTER TABLE IF EXISTS user_watchlist DROP CONSTRAINT IF EXISTS user_watchlist_market_id_fkey;
ALTER TABLE IF EXISTS analysis_performance DROP CONSTRAINT IF EXISTS analysis_performance_market_id_fkey;

-- Drop market-related tables
DROP TABLE IF EXISTS market_prices CASCADE;
DROP TABLE IF EXISTS markets CASCADE;

-- Ensure ai_analyses table has correct structure without foreign keys
DO $$
BEGIN
  -- Add market_title column to ai_analyses for caching the market question
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ai_analyses' AND column_name = 'market_title'
  ) THEN
    ALTER TABLE ai_analyses ADD COLUMN market_title text;
  END IF;
END $$;

-- Add index for quick lookups
CREATE INDEX IF NOT EXISTS idx_ai_analyses_market_id ON ai_analyses(market_id);
CREATE INDEX IF NOT EXISTS idx_user_watchlist_market_id ON user_watchlist(market_id);
