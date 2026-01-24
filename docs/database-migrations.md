# Database Migrations

## Whitepaper Leads Table

Run this SQL in your Supabase SQL editor to create the whitepaper_leads table:

```sql
-- Create whitepaper_leads table
CREATE TABLE IF NOT EXISTS whitepaper_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL DEFAULT 'website',
  whitepaper_sent BOOLEAN DEFAULT false,
  nurture_sequence_started BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_whitepaper_leads_email ON whitepaper_leads(email);

-- Create index for source filtering
CREATE INDEX IF NOT EXISTS idx_whitepaper_leads_source ON whitepaper_leads(source);

-- Enable Row Level Security
ALTER TABLE whitepaper_leads ENABLE ROW LEVEL SECURITY;

-- Create policy for service role access
CREATE POLICY "Service role can manage whitepaper_leads" ON whitepaper_leads
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_whitepaper_leads_updated_at
  BEFORE UPDATE ON whitepaper_leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Verify Tables Exist

Run this to check all assessment-related tables:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('assessments', 'leads', 'whitepaper_leads');
```
