-- Supabase Database Schema for Critter Canvas

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Photos Table
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  ipfs_hash TEXT,
  tags TEXT[] DEFAULT '{}',
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX photos_user_id_idx ON photos(user_id);

-- Create index on tags for faster filtering
CREATE INDEX photos_tags_idx ON photos USING GIN(tags);

-- Gallery Settings Table
CREATE TABLE gallery_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  layout_type TEXT NOT NULL DEFAULT 'grid',
  customization_options JSONB DEFAULT '{"theme": "light", "primaryColor": "#3B82F6", "showTitles": true, "showDescriptions": true, "showTags": true}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_user_settings UNIQUE (user_id)
);

-- Subscriptions Table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_user_subscription UNIQUE (user_id)
);

-- Deployments Table
CREATE TABLE deployments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  domain TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id for faster queries
CREATE INDEX deployments_user_id_idx ON deployments(user_id);

-- Row Level Security Policies

-- Users table policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Photos table policies
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own photos" ON photos
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own photos" ON photos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own photos" ON photos
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own photos" ON photos
  FOR DELETE USING (auth.uid() = user_id);

-- Gallery settings table policies
ALTER TABLE gallery_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own gallery settings" ON gallery_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own gallery settings" ON gallery_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own gallery settings" ON gallery_settings
  FOR UPDATE USING (auth.uid() = user_id);

-- Subscriptions table policies
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Deployments table policies
ALTER TABLE deployments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own deployments" ON deployments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own deployments" ON deployments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Functions and Triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Trigger for photos table
CREATE TRIGGER update_photos_updated_at
BEFORE UPDATE ON photos
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Trigger for gallery_settings table
CREATE TRIGGER update_gallery_settings_updated_at
BEFORE UPDATE ON gallery_settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Trigger for subscriptions table
CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Trigger for deployments table
CREATE TRIGGER update_deployments_updated_at
BEFORE UPDATE ON deployments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

