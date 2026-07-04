-- SQL Script to Update Google Drive URLs from Download to Viewer Format
-- Run this in your Supabase SQL Editor

-- First, let's see what we're working with
SELECT 
  id, 
  file_name, 
  public_url,
  -- Extract file ID and create new URL
  CASE 
    WHEN public_url LIKE '%drive.google.com/uc?id=%' THEN
      'https://drive.google.com/file/d/' || 
      substring(public_url from 'id=([^&]+)') || 
      '/view'
    ELSE public_url
  END as new_url
FROM resources 
WHERE public_url LIKE '%drive.google.com/uc?id=%'
LIMIT 10;

-- Uncomment the lines below AFTER you've verified the preview above looks correct:

/*
-- Update all download URLs to viewer URLs
UPDATE resources 
SET public_url = 'https://drive.google.com/file/d/' || 
                 substring(public_url from 'id=([^&]+)') || 
                 '/view'
WHERE public_url LIKE '%drive.google.com/uc?id=%';

-- Verify the update
SELECT COUNT(*) as updated_count 
FROM resources 
WHERE public_url LIKE '%/file/d/%/view';
*/