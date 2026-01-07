-- =============================================
-- re.build Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- Leads table: stores form submissions
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  business_name TEXT NOT NULL,
  website_url TEXT,
  industry TEXT NOT NULL,
  has_website TEXT NOT NULL,
  looking_for TEXT NOT NULL,
  frustration TEXT NOT NULL,
  heard_from TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Founding spots table: tracks limited availability
CREATE TABLE IF NOT EXISTS founding_spots (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- Singleton row
  total INTEGER NOT NULL DEFAULT 5,
  remaining INTEGER NOT NULL DEFAULT 5 CHECK (remaining >= 0),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial founding spots (only if not exists)
INSERT INTO founding_spots (id, total, remaining)
VALUES (1, 5, 5)
ON CONFLICT (id) DO NOTHING;

-- Function to decrement founding spots atomically
CREATE OR REPLACE FUNCTION decrement_founding_spots()
RETURNS INTEGER AS $$
DECLARE
  new_remaining INTEGER;
BEGIN
  UPDATE founding_spots
  SET remaining = remaining - 1,
      updated_at = NOW()
  WHERE id = 1 AND remaining > 0
  RETURNING remaining INTO new_remaining;

  RETURN COALESCE(new_remaining, -1);
END;
$$ LANGUAGE plpgsql;

-- Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE founding_spots ENABLE ROW LEVEL SECURITY;

-- Policies: Only service role can access (API routes use service key)
-- No public access to leads
CREATE POLICY "Service role only" ON leads
  FOR ALL
  USING (auth.role() = 'service_role');

-- Public can read founding spots count
CREATE POLICY "Public read founding spots" ON founding_spots
  FOR SELECT
  USING (true);

-- Only service role can update founding spots
CREATE POLICY "Service role update founding spots" ON founding_spots
  FOR UPDATE
  USING (auth.role() = 'service_role');

-- Index for email lookups (duplicate checking)
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
