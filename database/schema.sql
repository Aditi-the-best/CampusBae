-- CampusBae Attendance Tracking Database Schema
-- Run these commands in your Supabase SQL Editor to set up the attendance system

-- 1. Create student_subjects table
CREATE TABLE IF NOT EXISTS student_subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure unique subjects per student
  UNIQUE(student_id, subject_name)
);

-- 2. Create attendance_records table
CREATE TABLE IF NOT EXISTS attendance_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_name VARCHAR(255) NOT NULL,
  attendance_type VARCHAR(20) NOT NULL CHECK (attendance_type IN ('present', 'absent', 'cancelled', 'no-class')),
  marked_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Foreign key constraint to ensure subject exists
  FOREIGN KEY (student_id, subject_name) REFERENCES student_subjects(student_id, subject_name) ON DELETE CASCADE
);

-- 3. Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_student_subjects_student_id ON student_subjects(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_records_student_id ON attendance_records(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_records_subject ON attendance_records(student_id, subject_name);
CREATE INDEX IF NOT EXISTS idx_attendance_records_date ON attendance_records(marked_date);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE student_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies for student_subjects
CREATE POLICY "Students can view their own subjects" ON student_subjects
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can insert their own subjects" ON student_subjects
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own subjects" ON student_subjects
  FOR UPDATE USING (auth.uid() = student_id);

CREATE POLICY "Students can delete their own subjects" ON student_subjects
  FOR DELETE USING (auth.uid() = student_id);

-- 6. Create RLS policies for attendance_records
CREATE POLICY "Students can view their own attendance" ON attendance_records
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Students can insert their own attendance" ON attendance_records
  FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update their own attendance" ON attendance_records
  FOR UPDATE USING (auth.uid() = student_id);

CREATE POLICY "Students can delete their own attendance" ON attendance_records
  FOR DELETE USING (auth.uid() = student_id);

-- 7. Create a function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 8. Create trigger for auto-updating updated_at
CREATE TRIGGER update_student_subjects_updated_at 
  BEFORE UPDATE ON student_subjects 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 9. Optional: Create a view for attendance statistics (for easier querying)
CREATE OR REPLACE VIEW attendance_stats AS
SELECT 
  student_id,
  subject_name,
  COUNT(CASE WHEN attendance_type = 'present' THEN 1 END) as present_count,
  COUNT(CASE WHEN attendance_type = 'absent' THEN 1 END) as absent_count,
  COUNT(CASE WHEN attendance_type = 'cancelled' THEN 1 END) as cancelled_count,
  COUNT(CASE WHEN attendance_type = 'no-class' THEN 1 END) as no_class_count,
  COUNT(CASE WHEN attendance_type IN ('present', 'absent') THEN 1 END) as total_relevant_classes,
  ROUND(
    (COUNT(CASE WHEN attendance_type = 'present' THEN 1 END) * 100.0) / 
    NULLIF(COUNT(CASE WHEN attendance_type IN ('present', 'absent') THEN 1 END), 0), 
    2
  ) as attendance_percentage
FROM attendance_records
GROUP BY student_id, subject_name;

-- 10. Grant access to the view
GRANT SELECT ON attendance_stats TO authenticated;