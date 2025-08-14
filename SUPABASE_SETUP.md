# Supabase Setup Guide for Holy Sips

This guide will help you set up Supabase as your backend service for the Holy Sips application.

## 🚀 Quick Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `holy-sips`
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
5. Click "Create new project"

### 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key (starts with `eyJ`)

### 3. Configure Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your Supabase credentials:

```env
REACT_APP_SUPABASE_URL=your_project_url_here
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Set Up Database Tables

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Create a profiles table for user data
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a lemonade stands table
CREATE TABLE lemonade_stands (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  address TEXT,
  price DECIMAL(5, 2),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stand_id UUID REFERENCES lemonade_stands(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a prayer requests table
CREATE TABLE prayer_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  request TEXT NOT NULL,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lemonade_stands ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view active lemonade stands" ON lemonade_stands
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can create lemonade stands" ON lemonade_stands
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their lemonade stands" ON lemonade_stands
  FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Anyone can view reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Prayer requests policies
CREATE POLICY "Anyone can view public prayer requests" ON prayer_requests
  FOR SELECT USING (is_public = true);

CREATE POLICY "Anyone can create prayer requests" ON prayer_requests
  FOR INSERT WITH CHECK (true);

-- Create a function to handle new user signups
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to automatically create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### 5. Set Up Storage Buckets

1. Go to **Storage** in your Supabase dashboard
2. Create a new bucket called `avatars` for user profile pictures
3. Set the bucket to public
4. Create another bucket called `stand-images` for lemonade stand photos

### 6. Configure Authentication

1. Go to **Authentication** → **Settings**
2. Configure your site URL (e.g., `http://localhost:3000` for development)
3. Add redirect URLs:
   - `http://localhost:3000`
   - `http://localhost:3000/auth/callback`

## 🔧 Features Included

### Authentication
- ✅ User registration and login
- ✅ Email/password authentication
- ✅ Session management
- ✅ Protected routes

### Database
- ✅ PostgreSQL database
- ✅ Row Level Security (RLS)
- ✅ Real-time subscriptions
- ✅ Optimistic updates

### Storage
- ✅ File upload/download
- ✅ Public URLs for images
- ✅ Secure file access

### Helper Functions
- ✅ `useAuth()` hook for authentication
- ✅ `useDatabase()` hook for database operations
- ✅ Pre-built CRUD operations
- ✅ Error handling

## 🚀 Next Steps

1. **Start the development server**:
   ```bash
   npm start
   ```

2. **Test the authentication**:
   - Try signing up with a new account
   - Try signing in with existing credentials
   - Test the sign-out functionality

3. **Build your features**:
   - Use the `useDatabase()` hook for CRUD operations
   - Use the `storage` functions for file uploads
   - Add real-time subscriptions for live updates

## 📚 Useful Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)

## 🔒 Security Notes

- The `anon` key is safe to use in client-side code
- Row Level Security (RLS) is enabled by default
- All database operations are protected by policies
- Environment variables are properly configured

## 🐛 Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Make sure your `.env` file exists and has the correct variables
   - Restart your development server after adding environment variables

2. **Authentication not working**
   - Check that your site URL and redirect URLs are configured correctly
   - Ensure your Supabase project is active

3. **Database operations failing**
   - Verify that RLS policies are set up correctly
   - Check that tables exist in your database

4. **Storage uploads failing**
   - Ensure storage buckets are created
   - Check bucket permissions and policies

For more help, check the [Supabase Discord](https://discord.supabase.com) or [GitHub Issues](https://github.com/supabase/supabase/issues).