/*
  # Add Email Verification Tokens

  1. New Tables
    - `email_verification_tokens`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `token` (text, unique)
      - `email` (text)
      - `expires_at` (timestamptz)
      - `verified_at` (timestamptz, nullable)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `email_verification_tokens` table
    - Add policies for token verification

  3. Notes
    - Tokens expire after 24 hours
    - Used for custom email verification flow via Resend
*/

CREATE TABLE IF NOT EXISTS email_verification_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  token text UNIQUE NOT NULL,
  email text NOT NULL,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '24 hours'),
  verified_at timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE email_verification_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can verify their token"
  ON email_verification_tokens
  FOR SELECT
  USING (verified_at IS NULL AND expires_at > now());

CREATE POLICY "System can insert verification tokens"
  ON email_verification_tokens
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "System can update verification tokens"
  ON email_verification_tokens
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_email_verification_tokens_token ON email_verification_tokens(token);
CREATE INDEX IF NOT EXISTS idx_email_verification_tokens_user_id ON email_verification_tokens(user_id);
