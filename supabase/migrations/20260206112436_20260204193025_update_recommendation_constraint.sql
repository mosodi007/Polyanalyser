/*
  # Update AI Analysis Recommendation Constraint

  ## Changes
  Updates the recommendation field constraint in the `ai_analyses` table to accept new values:
  - 'Yes' (AI predicts YES outcome, previously 'BUY')
  - 'No' (AI predicts NO outcome, previously 'SELL')
  - 'Uncertain' (AI is uncertain, previously 'HOLD' or 'PASS')

  ## Migration Steps
  1. Drop the existing check constraint
  2. Add new check constraint with updated values

  ## Notes
  - The ai_analyses table has been cleared before this migration
  - New values are more intuitive for users
*/

-- Drop the old constraint
ALTER TABLE ai_analyses 
DROP CONSTRAINT IF EXISTS ai_analyses_recommendation_check;

-- Add new constraint with updated values
ALTER TABLE ai_analyses 
ADD CONSTRAINT ai_analyses_recommendation_check 
CHECK (recommendation IN ('Yes', 'No', 'Uncertain'));
