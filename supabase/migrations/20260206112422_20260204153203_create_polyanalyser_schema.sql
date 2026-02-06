/*
  # PolyAnalyser Database Schema

  ## Overview
  Creates the complete database structure for PolyAnalyser, an AI-powered Polymarket analysis tool.

  ## New Tables

  ### 1. `markets`
  Stores Polymarket market data with comprehensive metadata
  - `id` (text, primary key) - Unique market identifier from Polymarket
  - `slug` (text) - URL-friendly market identifier
  - `title` (text) - Market question/title
  - `description` (text) - Detailed market description
  - `category` (text) - Market category (politics, sports, crypto, etc.)
  - `close_time` (timestamptz) - When market closes for betting
  - `end_date` (timestamptz) - When market resolves
  - `current_price` (numeric) - Current YES share price (0-1)
  - `volume` (numeric) - Total trading volume
  - `liquidity` (numeric) - Available liquidity
  - `tags` (jsonb) - Market tags array
  - `metadata` (jsonb) - Additional market data
  - `active` (boolean) - Whether market is still active
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `market_prices`
  Historical price data for tracking market trends
  - `id` (uuid, primary key) - Unique identifier
  - `market_id` (text, foreign key) - References markets table
  - `price` (numeric) - YES share price at timestamp
  - `bid` (numeric) - Best bid price
  - `ask` (numeric) - Best ask price
  - `spread` (numeric) - Bid-ask spread
  - `timestamp` (timestamptz) - Price snapshot time
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. `ai_analyses`
  AI-generated market analysis and recommendations
  - `id` (uuid, primary key) - Unique identifier
  - `market_id` (text, foreign key) - References markets table
  - `ai_probability` (numeric) - AI-assessed probability (0-1)
  - `market_probability` (numeric) - Current market price (0-1)
  - `edge_percentage` (numeric) - Difference between AI and market odds
  - `confidence_score` (numeric) - AI confidence level (0-100)
  - `recommendation` (text) - BUY, SELL, or HOLD
  - `reasoning` (text) - Detailed AI explanation
  - `research_data` (jsonb) - Supporting research and sources
  - `risk_factors` (text[]) - Array of identified risks
  - `created_at` (timestamptz) - Analysis timestamp
  - `expires_at` (timestamptz) - When analysis becomes stale

  ### 4. `user_watchlist`
  Markets saved by users for monitoring
  - `id` (uuid, primary key) - Unique identifier
  - `user_id` (uuid) - User identifier (auth.users)
  - `market_id` (text, foreign key) - References markets table
  - `notes` (text) - User's personal notes
  - `alert_threshold` (numeric) - Price change % for alerts
  - `created_at` (timestamptz) - When added to watchlist

  ### 5. `analysis_performance`
  Track AI prediction accuracy over time
  - `id` (uuid, primary key) - Unique identifier
  - `analysis_id` (uuid, foreign key) - References ai_analyses
  - `market_id` (text, foreign key) - References markets table
  - `predicted_outcome` (text) - What AI predicted
  - `actual_outcome` (text) - What actually happened
  - `prediction_correct` (boolean) - Whether prediction was correct
  - `profit_loss` (numeric) - Theoretical P&L if followed
  - `resolution_date` (timestamptz) - When market resolved
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for markets and analyses (read-only data)
  - Authenticated users can manage their own watchlist
  - Only system can write to markets, prices, and analyses tables

  ## Indexes
  - Markets: category, close_time, active status for efficient filtering
  - Prices: market_id and timestamp for historical queries
  - Analyses: market_id, confidence_score, edge_percentage for opportunity finding
  - Performance: analysis_id for tracking
*/

-- Create markets table
CREATE TABLE IF NOT EXISTS markets (
  id text PRIMARY KEY,
  slug text UNIQUE,
  title text NOT NULL,
  description text,
  category text,
  close_time timestamptz,
  end_date timestamptz,
  current_price numeric CHECK (current_price >= 0 AND current_price <= 1),
  volume numeric DEFAULT 0,
  liquidity numeric DEFAULT 0,
  tags jsonb DEFAULT '[]'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create market_prices table
CREATE TABLE IF NOT EXISTS market_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  market_id text NOT NULL REFERENCES markets(id) ON DELETE CASCADE,
  price numeric NOT NULL CHECK (price >= 0 AND price <= 1),
  bid numeric CHECK (bid >= 0 AND bid <= 1),
  ask numeric CHECK (ask >= 0 AND ask <= 1),
  spread numeric,
  timestamp timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create ai_analyses table
CREATE TABLE IF NOT EXISTS ai_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  market_id text NOT NULL REFERENCES markets(id) ON DELETE CASCADE,
  ai_probability numeric NOT NULL CHECK (ai_probability >= 0 AND ai_probability <= 1),
  market_probability numeric NOT NULL CHECK (market_probability >= 0 AND market_probability <= 1),
  edge_percentage numeric NOT NULL,
  confidence_score numeric CHECK (confidence_score >= 0 AND confidence_score <= 100),
  recommendation text CHECK (recommendation IN ('BUY', 'SELL', 'HOLD', 'PASS')),
  reasoning text NOT NULL,
  research_data jsonb DEFAULT '{}'::jsonb,
  risk_factors text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz
);

-- Create user_watchlist table
CREATE TABLE IF NOT EXISTS user_watchlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  market_id text NOT NULL REFERENCES markets(id) ON DELETE CASCADE,
  notes text,
  alert_threshold numeric DEFAULT 5,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, market_id)
);

-- Create analysis_performance table
CREATE TABLE IF NOT EXISTS analysis_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id uuid REFERENCES ai_analyses(id) ON DELETE SET NULL,
  market_id text NOT NULL REFERENCES markets(id) ON DELETE CASCADE,
  predicted_outcome text,
  actual_outcome text,
  prediction_correct boolean,
  profit_loss numeric,
  resolution_date timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_markets_category ON markets(category);
CREATE INDEX IF NOT EXISTS idx_markets_close_time ON markets(close_time);
CREATE INDEX IF NOT EXISTS idx_markets_active ON markets(active);
CREATE INDEX IF NOT EXISTS idx_market_prices_market_id ON market_prices(market_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_ai_analyses_market_id ON ai_analyses(market_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_analyses_confidence ON ai_analyses(confidence_score DESC, edge_percentage DESC);
CREATE INDEX IF NOT EXISTS idx_user_watchlist_user ON user_watchlist(user_id);
CREATE INDEX IF NOT EXISTS idx_analysis_performance_market ON analysis_performance(market_id);

-- Enable Row Level Security
ALTER TABLE markets ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_performance ENABLE ROW LEVEL SECURITY;

-- RLS Policies for markets (public read)
CREATE POLICY "Anyone can view markets"
  ON markets FOR SELECT
  TO public
  USING (true);

-- RLS Policies for market_prices (public read)
CREATE POLICY "Anyone can view market prices"
  ON market_prices FOR SELECT
  TO public
  USING (true);

-- RLS Policies for ai_analyses (public read)
CREATE POLICY "Anyone can view AI analyses"
  ON ai_analyses FOR SELECT
  TO public
  USING (true);

-- RLS Policies for user_watchlist (users manage their own)
CREATE POLICY "Users can view own watchlist"
  ON user_watchlist FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert to own watchlist"
  ON user_watchlist FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own watchlist"
  ON user_watchlist FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from own watchlist"
  ON user_watchlist FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for analysis_performance (public read)
CREATE POLICY "Anyone can view analysis performance"
  ON analysis_performance FOR SELECT
  TO public
  USING (true);
