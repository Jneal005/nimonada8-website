# Quick Fix: Create Prayer Requests Table

You're getting the error `Could not find the table 'public.prayer_requests'` because this table doesn't exist in your Supabase database yet.

## Immediate Fix

1. **Go to your Supabase dashboard**: https://supabase.com/dashboard
2. **Select your project**: `holy-sips` or whatever you named it
3. **Go to SQL Editor** (in the left sidebar)
4. **Run this SQL command**:

```sql
-- Create the prayer requests table
CREATE TABLE prayer_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  request TEXT NOT NULL,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for access control
CREATE POLICY "Anyone can view public prayer requests" ON prayer_requests
  FOR SELECT USING (is_public = true);

CREATE POLICY "Anyone can create prayer requests" ON prayer_requests
  FOR INSERT WITH CHECK (true);
```

5. **Click "Run"** to execute the SQL
6. **Refresh your application** - the prayer request form should now work!

## What This Does

- Creates a `prayer_requests` table with the required columns
- Enables security policies so only public requests can be viewed by others
- Allows anyone to submit new prayer requests
- Stores the submitter's name, request text, privacy setting, and timestamp

## Test It

After running the SQL:
1. Go back to your application
2. Try submitting a prayer request
3. It should now work without errors!

The prayer requests will be saved to your database, and if you've configured EmailJS (see `EMAILJS_SETUP.md`), non-public requests will also be emailed to jordaneneal005@gmail.com.