/*
  # Add Write Policies for Data Tables

  ## Changes
  This migration adds INSERT, UPDATE, and DELETE policies for data tables to allow the application 
  to write market data, price history, and AI analyses.

  ### Tables Updated
  1. `markets` - Add policies for INSERT and UPDATE operations
  2. `market_prices` - Add policy for INSERT operations
  3. `ai_analyses` - Add policies for INSERT and UPDATE operations

  ## Security Notes
  - Policies allow public (anon) access for writing data since this is a public analysis tool
  - Data is sourced from Polymarket API and AI analysis, not user input requiring authentication
  - Future versions can restrict to service role if needed

  ## Policies Added
  ### markets table
  - INSERT: Allow anyone to insert market data
  - UPDATE: Allow anyone to update market data

  ### market_prices table
  - INSERT: Allow anyone to insert price snapshots

  ### ai_analyses table
  - INSERT: Allow anyone to insert AI analyses
  - UPDATE: Allow anyone to update AI analyses
*/

-- Markets table policies
CREATE POLICY "Anyone can insert markets"
  ON markets FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update markets"
  ON markets FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Market prices table policies
CREATE POLICY "Anyone can insert market prices"
  ON market_prices FOR INSERT
  TO public
  WITH CHECK (true);

-- AI analyses table policies
CREATE POLICY "Anyone can insert AI analyses"
  ON ai_analyses FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update AI analyses"
  ON ai_analyses FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);
