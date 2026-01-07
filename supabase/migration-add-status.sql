-- =============================================
-- Migration: Add status field to leads
-- Run this in Supabase SQL Editor
-- =============================================

-- Create enum type if not exists
DO $$ BEGIN
  CREATE TYPE lead_status AS ENUM ('pending', 'accepted', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add status column to leads table
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS status lead_status DEFAULT 'pending';

-- Add updated_at column if not exists
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create index for status filtering
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- Update existing leads to have 'pending' status (if null)
UPDATE leads SET status = 'pending' WHERE status IS NULL;

-- Function to increment founding spots (for un-accepting)
CREATE OR REPLACE FUNCTION increment_founding_spots()
RETURNS INTEGER AS $$
DECLARE
  new_remaining INTEGER;
BEGIN
  UPDATE founding_spots
  SET remaining = LEAST(remaining + 1, total),
      updated_at = NOW()
  WHERE id = 1
  RETURNING remaining INTO new_remaining;

  RETURN COALESCE(new_remaining, -1);
END;
$$ LANGUAGE plpgsql;
