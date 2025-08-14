# Fix Prayer Request Submissions - Complete Guide

Your prayer requests are failing for two reasons:
1. **Missing Supabase Table** - The `prayer_requests` table doesn't exist
2. **EmailJS Not Configured** - Email notifications aren't set up

## STEP 1: Create the Database Table

### Option A: Using Supabase Dashboard (Recommended)
1. Go to https://supabase.com/dashboard
2. Open your project: `ufrbubthlifbfvflvwue`
3. Click "Table Editor" in the sidebar
4. Click "Create a new table"
5. Set table name: `prayer_requests`
6. Add these columns:
   - `id` (bigint, primary key, auto-increment) ✓
   - `name` (text, not null)
   - `request` (text, not null)
   - `is_public` (boolean, default: false)
   - `created_at` (timestamptz, default: now())
7. Click "Save"

### Option B: Using SQL Editor
1. Go to "SQL Editor" in your Supabase dashboard
2. Run this SQL:

```sql
-- Create prayer_requests table
CREATE TABLE prayer_requests (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  request TEXT NOT NULL,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view public requests
CREATE POLICY "Anyone can view public prayer requests" ON prayer_requests
  FOR SELECT USING (is_public = true);

-- Allow anyone to insert prayer requests
CREATE POLICY "Anyone can insert prayer requests" ON prayer_requests
  FOR INSERT WITH CHECK (true);
```

## STEP 2: Set Up EmailJS (5 minutes)

### Get EmailJS Credentials
1. Go to https://www.emailjs.com/ and sign up
2. **Add Email Service:**
   - Click "Email Services" → "Add New Service"
   - Choose "Gmail" and connect your account
   - **Copy the Service ID** (starts with `service_`)

3. **Create Email Template:**
   - Go to "Email Templates" → "Create New Template"
   - Name: `Prayer Request Notification`
   - Subject: `New Prayer Request from {{from_name}}`
   - Body:
   ```
   Hello,
   
   A new prayer request has been submitted:
   
   From: {{from_name}}
   Submitted: {{submitted_at}}
   Public Request: {{is_public}}
   
   Prayer Request:
   {{prayer_request}}
   
   Blessings,
   Holy Sips Ministry Website
   ```
   - **Copy the Template ID** (starts with `template_`)

4. **Get Public Key:**
   - Go to "Account" → copy your "Public Key"

### Update Your .env File
Replace these lines in your `.env` file:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_actual_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_actual_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_actual_public_key_here
```

## STEP 3: Test the Fix

1. **Restart your app:**
   - Stop the server (Ctrl+C)
   - Run `npm start`

2. **Test submission:**
   - Go to Prayer Requests page
   - Submit a test request
   - Check for success message
   - Check your email (jordaneneal005@gmail.com)

## Troubleshooting

### If you still get database errors:
- Verify the table exists in Supabase Table Editor
- Check that RLS policies are created
- Look at browser console for specific error messages

### If emails don't send:
- Verify EmailJS credentials are correct
- Check that Gmail is connected in EmailJS dashboard
- Test with a public prayer request (no email sent)

### Check Browser Console
Press F12 → Console tab to see detailed error messages

## Quick Verification

Run this in your browser console on the prayer request page:
```javascript
console.log('EmailJS Config:', {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY
});
```

This should show your actual IDs, not placeholder values.

---

**Need help?** Check the detailed guides:
- `SUPABASE_SETUP.md` for database setup
- `EMAILJS_SETUP.md` for email configuration