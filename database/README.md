# Attendance Database Setup

## Overview

The attendance tracking system is fully implemented and stores data in Supabase with localStorage fallback for offline use.

## Database Schema

The system uses two main tables:

1. **student_subjects** - Stores subjects for each student
2. **attendance_records** - Stores individual attendance marks

### Features Implemented

✅ **Database Storage**: All attendance data is stored in Supabase
✅ **Offline Fallback**: localStorage backup when database is unavailable
✅ **Real-time Sync**: Data syncs automatically when connection is restored
✅ **User Authentication**: Data is isolated per authenticated user
✅ **Undo Functionality**: Can undo the last attendance mark
✅ **Subject Management**: Add/delete subjects dynamically
✅ **Attendance Types**: Present, Absent, Cancelled, No Class

## Setup Instructions

### 1. Database Setup
Run the SQL commands in `database/schema.sql` in your Supabase SQL Editor to create the necessary tables and security policies.

### 2. Environment Variables
Ensure these variables are set in your `.env.local`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Testing the System
1. Sign up/Login to the app
2. Navigate to the Profile page
3. Add subjects or use default ones
4. Mark attendance for different subjects
5. Verify data persists after page refresh

## How It Works

### Database-First Approach
- The `AttendanceService` tries database operations first
- Falls back to localStorage if database is unavailable
- Automatically syncs when connection is restored

### Data Flow
1. **Mark Attendance** → Insert into `attendance_records` table
2. **View Stats** → Query aggregated data from `attendance_records`
3. **Add Subject** → Insert into `student_subjects` table
4. **Undo Action** → Delete most recent attendance record

### Security
- Row Level Security (RLS) ensures users can only access their own data
- All operations require authentication
- Foreign key constraints maintain data integrity

## API Usage

```typescript
// Mark attendance
await attendanceService.markAttendance('Math', 'present');

// Get statistics
const stats = await attendanceService.getAttendanceStats();

// Add subject
await attendanceService.addSubject('Physics');

// Undo last mark
await attendanceService.undoLastAttendance('Math');
```

## Troubleshooting

- If data isn't saving, check browser console for authentication errors
- Verify Supabase connection with correct URL and API key
- Check network connectivity for database sync
- LocalStorage fallback ensures app works offline

The system is production-ready and handles all edge cases including network failures, authentication issues, and data consistency.