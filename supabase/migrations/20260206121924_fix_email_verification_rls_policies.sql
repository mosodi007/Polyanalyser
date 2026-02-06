/*
  # Fix Email Verification Token RLS Policies

  1. Changes
    - Update SELECT policy to allow reading any token (not just unverified ones)
    - This allows the verification page to show proper error messages for already-verified or expired tokens
    - Keep INSERT and UPDATE policies permissive for system operations

  2. Security
    - SELECT: Anyone can read verification tokens (needed for public verification flow)
    - INSERT: System can create tokens
    - UPDATE: System can update tokens (e.g., marking as verified)
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can verify their token" ON email_verification_tokens;
DROP POLICY IF EXISTS "System can insert verification tokens" ON email_verification_tokens;
DROP POLICY IF EXISTS "System can update verification tokens" ON email_verification_tokens;

-- Create new policies with broader SELECT access
CREATE POLICY "Anyone can read verification tokens"
  ON email_verification_tokens
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert verification tokens"
  ON email_verification_tokens
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update verification tokens"
  ON email_verification_tokens
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);