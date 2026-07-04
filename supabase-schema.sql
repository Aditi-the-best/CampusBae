-- Attendance Tracking Schema for CampusBae
-- Run these queries in your Supabase SQL Editor

-- Table for student subjects
CREATE TABLE IF NOT EXISTS student_subjects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    subject_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Ensure a student can't have duplicate subjects
    UNIQUE(student_id, subject_name)
);

-- Table for attendance records
CREATE TABLE IF NOT EXISTS attendance_records (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    subject_name TEXT NOT NULL,
    attendance_type TEXT NOT NULL CHECK (attendance_type IN ('present', 'absent', 'cancelled', 'no-class')),
    marked_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign key to subjects table
    FOREIGN KEY (student_id, subject_name) REFERENCES student_subjects(student_id, subject_name) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_student_subjects_student_id ON student_subjects(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_records_student_id ON attendance_records(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_records_subject ON attendance_records(student_id, subject_name);
CREATE INDEX IF NOT EXISTS idx_attendance_records_date ON attendance_records(marked_date);

-- Enable Row Level Security (RLS)
ALTER TABLE student_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Students can only access their own data
CREATE POLICY IF NOT EXISTS "Students can view their own subjects" ON student_subjects
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY IF NOT EXISTS "Students can insert their own subjects" ON student_subjects
    FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY IF NOT EXISTS "Students can update their own subjects" ON student_subjects
    FOR UPDATE USING (auth.uid() = student_id);

CREATE POLICY IF NOT EXISTS "Students can delete their own subjects" ON student_subjects
    FOR DELETE USING (auth.uid() = student_id);

CREATE POLICY IF NOT EXISTS "Students can view their own attendance" ON attendance_records
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY IF NOT EXISTS "Students can insert their own attendance" ON attendance_records
    FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY IF NOT EXISTS "Students can update their own attendance" ON attendance_records
    FOR UPDATE USING (auth.uid() = student_id);

CREATE POLICY IF NOT EXISTS "Students can delete their own attendance" ON attendance_records
    FOR DELETE USING (auth.uid() = student_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER IF NOT EXISTS update_student_subjects_updated_at 
    BEFORE UPDATE ON student_subjects 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
