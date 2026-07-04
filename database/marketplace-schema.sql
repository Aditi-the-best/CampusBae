-- CampusBae Marketplace Database Schema
-- Run these commands in your Supabase SQL Editor to set up the marketplace system

-- 1. Create marketplace_items table
CREATE TABLE IF NOT EXISTS marketplace_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price VARCHAR(50) NOT NULL,
  original_price VARCHAR(50),
  category VARCHAR(100) NOT NULL,
  branch VARCHAR(100) NOT NULL,
  semester VARCHAR(20),
  condition VARCHAR(50) NOT NULL,
  seller_name VARCHAR(255) NOT NULL,
  seller_phone VARCHAR(20) NOT NULL,
  seller_year VARCHAR(20),
  image_url TEXT,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Indexes for better query performance
  INDEX idx_marketplace_items_user_id (user_id),
  INDEX idx_marketplace_items_category (category),
  INDEX idx_marketplace_items_branch (branch),
  INDEX idx_marketplace_items_created_at (created_at DESC)
);

-- 2. Create marketplace_likes table (for tracking who liked what)
CREATE TABLE IF NOT EXISTS marketplace_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id UUID REFERENCES marketplace_items(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure unique likes per user per item
  UNIQUE(user_id, item_id),
  
  -- Indexes for better query performance
  INDEX idx_marketplace_likes_user_id (user_id),
  INDEX idx_marketplace_likes_item_id (item_id)
);

-- 3. Enable Row Level Security (RLS) for security
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_likes ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies for marketplace_items
-- Allow all users to read items
CREATE POLICY "Allow public read access to marketplace items" ON marketplace_items
  FOR SELECT USING (true);

-- Allow users to insert their own items
CREATE POLICY "Allow users to insert their own items" ON marketplace_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own items
CREATE POLICY "Allow users to update their own items" ON marketplace_items
  FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete their own items
CREATE POLICY "Allow users to delete their own items" ON marketplace_items
  FOR DELETE USING (auth.uid() = user_id);

-- 5. Create RLS policies for marketplace_likes
-- Allow all users to read likes
CREATE POLICY "Allow public read access to likes" ON marketplace_likes
  FOR SELECT USING (true);

-- Allow users to insert their own likes
CREATE POLICY "Allow users to insert their own likes" ON marketplace_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own likes
CREATE POLICY "Allow users to delete their own likes" ON marketplace_likes
  FOR DELETE USING (auth.uid() = user_id);

-- 6. Create function to update likes count automatically
CREATE OR REPLACE FUNCTION update_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE marketplace_items 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.item_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE marketplace_items 
    SET likes_count = likes_count - 1 
    WHERE id = OLD.item_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 7. Create triggers to automatically update likes count
DROP TRIGGER IF EXISTS update_likes_count_trigger ON marketplace_likes;
CREATE TRIGGER update_likes_count_trigger
  AFTER INSERT OR DELETE ON marketplace_likes
  FOR EACH ROW EXECUTE FUNCTION update_likes_count();

-- 8. Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_marketplace_items_updated_at ON marketplace_items;
CREATE TRIGGER update_marketplace_items_updated_at
  BEFORE UPDATE ON marketplace_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 10. Create storage bucket for marketplace images (run this separately in Storage section)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('marketplace-images', 'marketplace-images', true);

-- 11. Create storage policy for marketplace images
-- CREATE POLICY "Give users access to own folder" ON storage.objects
--   FOR ALL USING (auth.uid()::text = (storage.foldername(name))[1]);