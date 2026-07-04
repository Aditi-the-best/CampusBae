-- Simple table creation script for Supabase
-- Copy and paste this into your Supabase SQL Editor

-- Step 1: Create student_subjects table (simplified)
CREATE TABLE student_subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, subject_name)
);

-- Step 2: Create attendance_records table (simplified)
CREATE TABLE attendance_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_name TEXT NOT NULL,
  attendance_type TEXT NOT NULL,
  marked_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (attendance_type IN ('present', 'absent', 'cancelled', 'no-class'))
);

-- Step 3: Add indexes for performance
CREATE INDEX idx_student_subjects_student_id ON student_subjects(student_id);
CREATE INDEX idx_attendance_records_student_id ON attendance_records(student_id);

-- Step 4: Enable Row Level Security
ALTER TABLE student_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;

-- Step 5: Create simple RLS policies
CREATE POLICY "Enable all operations for users on their own subjects" ON student_subjects
  FOR ALL USING (auth.uid() = student_id);

CREATE POLICY "Enable all operations for users on their own attendance" ON attendance_records
  FOR ALL USING (auth.uid() = student_id);

-- Step 6: Verify tables were created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('student_subjects', 'attendance_records');