import { supabase } from '../lib/supabaseClient';

// LocalStorage fallback when database is not available
const STORAGE_KEYS = {
  SUBJECTS: 'campusbae_subjects',
  ATTENDANCE: 'campusbae_attendance'
};

export type AttendanceType = 'present' | 'absent' | 'cancelled' | 'no-class';

export interface Subject {
  id: string;
  subject_name: string;
  created_at: string;
  updated_at: string;
}

export interface AttendanceRecord {
  id: string;
  subject_name: string;
  attendance_type: AttendanceType;
  marked_date: string;
  created_at: string;
}

export interface AttendanceStats {
  present: number;
  absent: number;
  cancelled: number;
  'no-class': number;
}

// LocalStorage fallback functions
class LocalStorageAttendanceService {
  private getUserId(): string {
    // Use a consistent user ID for localStorage
    return 'local_user';
  }

  private getStoredSubjects(): string[] {
    const stored = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
    if (stored) {
      const data = JSON.parse(stored);
      return data[this.getUserId()] || [];
    }
    return [];
  }

  private saveSubjects(subjects: string[]): void {
    const stored = localStorage.getItem(STORAGE_KEYS.SUBJECTS) || '{}';
    const data = JSON.parse(stored);
    data[this.getUserId()] = subjects;
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(data));
  }

  private getStoredAttendance(): Record<string, AttendanceRecord[]> {
    const stored = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
    if (stored) {
      const data = JSON.parse(stored);
      return data[this.getUserId()] || {};
    }
    return {};
  }

  private saveAttendance(attendance: Record<string, AttendanceRecord[]>): void {
    const stored = localStorage.getItem(STORAGE_KEYS.ATTENDANCE) || '{}';
    const data = JSON.parse(stored);
    data[this.getUserId()] = attendance;
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(data));
  }

  async getSubjects(): Promise<Subject[]> {
    const subjects = this.getStoredSubjects();
    return subjects.map((name, index) => ({
      id: `local_${index}`,
      subject_name: name,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
  }

  async addSubject(subjectName: string): Promise<Subject> {
    const subjects = this.getStoredSubjects();
    if (!subjects.includes(subjectName)) {
      subjects.push(subjectName);
      this.saveSubjects(subjects);
    }
    return {
      id: `local_${subjects.length - 1}`,
      subject_name: subjectName,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  async deleteSubject(subjectName: string): Promise<void> {
    const subjects = this.getStoredSubjects().filter(s => s !== subjectName);
    this.saveSubjects(subjects);
    
    // Remove attendance records for this subject
    const attendance = this.getStoredAttendance();
    delete attendance[subjectName];
    this.saveAttendance(attendance);
  }

  async markAttendance(subjectName: string, attendanceType: AttendanceType): Promise<AttendanceRecord> {
    const attendance = this.getStoredAttendance();
    if (!attendance[subjectName]) {
      attendance[subjectName] = [];
    }
    
    const record: AttendanceRecord = {
      id: `local_${Date.now()}`,
      subject_name: subjectName,
      attendance_type: attendanceType,
      marked_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    };
    
    attendance[subjectName].push(record);
    this.saveAttendance(attendance);
    return record;
  }

  async getAttendanceStats(): Promise<Record<string, AttendanceStats>> {
    const attendance = this.getStoredAttendance();
    const stats: Record<string, AttendanceStats> = {};
    
    Object.entries(attendance).forEach(([subject, records]) => {
      stats[subject] = {
        present: 0,
        absent: 0,
        cancelled: 0,
        'no-class': 0
      };
      
      records.forEach(record => {
        stats[subject][record.attendance_type]++;
      });
    });
    
    return stats;
  }

  async getSubjectAttendance(subjectName: string): Promise<AttendanceRecord[]> {
    const attendance = this.getStoredAttendance();
    return attendance[subjectName] || [];
  }

  async undoLastAttendance(subjectName: string): Promise<AttendanceRecord | null> {
    const attendance = this.getStoredAttendance();
    if (!attendance[subjectName] || attendance[subjectName].length === 0) {
      return null;
    }
    
    const records = attendance[subjectName];
    const lastRecord = records.pop();
    this.saveAttendance(attendance);
    return lastRecord || null;
  }

  async initializeDefaultSubjects(): Promise<void> {
    const existingSubjects = this.getStoredSubjects();
    if (existingSubjects.length === 0) {
      const defaultSubjects = [
        'Data Structures',
        'Computer Networks',
        'Database Systems',
        'Operating Systems'
      ];
      this.saveSubjects(defaultSubjects);
    }
  }

  async resetAllAttendance(): Promise<void> {
    // Clear all attendance data from localStorage
    const userId = this.getUserId();
    const stored = localStorage.getItem(STORAGE_KEYS.ATTENDANCE) || '{}';
    const allData = JSON.parse(stored);
    
    // Keep the structure but reset all attendance to empty
    allData[userId] = {};
    
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(allData));
  }
}

class AttendanceService {
  private fallbackService = new LocalStorageAttendanceService();
  
  private async tryDatabaseFirst<T>(databaseOperation: () => Promise<T>, fallbackOperation: () => Promise<T>): Promise<T> {
    try {
      // Check if user is authenticated first
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return await fallbackOperation();
      }
      
      return await databaseOperation();
    } catch (error) {
      return await fallbackOperation();
    }
  }

  // Get all subjects for the current user
  async getSubjects(): Promise<Subject[]> {
    return this.tryDatabaseFirst(
      async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
          .from('student_subjects')
          .select('*')
          .eq('student_id', user.id)
          .order('subject_name');

        if (error) throw error;
        return data || [];
      },
      () => this.fallbackService.getSubjects()
    );
  }

  // Add a new subject
  async addSubject(subjectName: string): Promise<Subject> {
    return this.tryDatabaseFirst(
      async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
          .from('student_subjects')
          .insert([{
            student_id: user.id,
            subject_name: subjectName.trim()
          }])
          .select()
          .single();

        if (error) throw error;
        return data;
      },
      () => this.fallbackService.addSubject(subjectName)
    );
  }

  // Delete a subject (this will cascade delete all attendance records)
  async deleteSubject(subjectName: string): Promise<void> {
    return this.tryDatabaseFirst(
      async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { error } = await supabase
          .from('student_subjects')
          .delete()
          .eq('student_id', user.id)
          .eq('subject_name', subjectName);

        if (error) throw error;
      },
      () => this.fallbackService.deleteSubject(subjectName)
    );
  }

  // Mark attendance for a subject
  async markAttendance(subjectName: string, attendanceType: AttendanceType): Promise<AttendanceRecord> {
    return this.tryDatabaseFirst(
      async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
          .from('attendance_records')
          .insert([{
            student_id: user.id,
            subject_name: subjectName,
            attendance_type: attendanceType
          }])
          .select()
          .single();

        if (error) throw error;
        return data;
      },
      () => this.fallbackService.markAttendance(subjectName, attendanceType)
    );
  }

  // Get attendance statistics for all subjects
  async getAttendanceStats(): Promise<Record<string, AttendanceStats>> {
    return this.tryDatabaseFirst(
      async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
          .from('attendance_records')
          .select('subject_name, attendance_type')
          .eq('student_id', user.id);

        if (error) throw error;

        // Process the data to get counts
        const stats: Record<string, AttendanceStats> = {};
        
        data?.forEach((record) => {
          if (!stats[record.subject_name]) {
            stats[record.subject_name] = {
              present: 0,
              absent: 0,
              cancelled: 0,
              'no-class': 0
            };
          }
          const attendanceType = record.attendance_type as AttendanceType;
          stats[record.subject_name][attendanceType]++;
        });

        return stats;
      },
      () => this.fallbackService.getAttendanceStats()
    );
  }

  // Get attendance records for a specific subject (for detailed view)
  async getSubjectAttendance(subjectName: string): Promise<AttendanceRecord[]> {
    return this.tryDatabaseFirst(
      async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
          .from('attendance_records')
          .select('*')
          .eq('student_id', user.id)
          .eq('subject_name', subjectName)
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data || [];
      },
      () => this.fallbackService.getSubjectAttendance(subjectName)
    );
  }

  // Delete the most recent attendance record for undo functionality
  async undoLastAttendance(subjectName: string): Promise<AttendanceRecord | null> {
    return this.tryDatabaseFirst(
      async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // First, get the most recent record for this subject
        const { data: records, error: fetchError } = await supabase
          .from('attendance_records')
          .select('*')
          .eq('student_id', user.id)
          .eq('subject_name', subjectName)
          .order('created_at', { ascending: false })
          .limit(1);

        if (fetchError) throw fetchError;
        if (!records || records.length === 0) return null;

        const recordToDelete = records[0];

        // Delete the most recent record
        const { error: deleteError } = await supabase
          .from('attendance_records')
          .delete()
          .eq('id', recordToDelete.id);

        if (deleteError) throw deleteError;
        return recordToDelete;
      },
      () => this.fallbackService.undoLastAttendance(subjectName)
    );
  }

  // Initialize default subjects for new users (optional)
  async initializeDefaultSubjects(): Promise<void> {
    return this.tryDatabaseFirst(
      async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // Check if user already has subjects
        const { data: existingSubjects } = await supabase
          .from('student_subjects')
          .select('id')
          .eq('student_id', user.id)
          .limit(1);

        // Only add default subjects if user has none
        if (!existingSubjects || existingSubjects.length === 0) {
          const defaultSubjects = [
            'Data Structures',
            'Computer Networks',
            'Database Systems',
            'Operating Systems'
          ];

          const { error } = await supabase
            .from('student_subjects')
            .insert(
              defaultSubjects.map(subject => ({
                student_id: user.id,
                subject_name: subject
              }))
            );

          if (error) throw error;
        }
      },
      () => this.fallbackService.initializeDefaultSubjects()
    );
  }

  async resetAllAttendance(): Promise<void> {
    return this.tryDatabaseFirst(
      async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // Delete all attendance records for the user
        const { error } = await supabase
          .from('attendance_records')
          .delete()
          .eq('student_id', user.id);

        if (error) throw error;
      },
      () => this.fallbackService.resetAllAttendance()
    );
  }
}

export const attendanceService = new AttendanceService();
