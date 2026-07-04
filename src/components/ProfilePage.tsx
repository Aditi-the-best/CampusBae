import { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, CheckCircle, XCircle, X, Trash2, Calendar, LogOut, Undo, Loader2, RotateCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { attendanceService, type AttendanceStats } from '../services/attendanceService';

export function ProfilePage() {
  const { signOut, userProfile } = useAuth();
  const [newSubject, setNewSubject] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [attendance, setAttendance] = useState<Record<string, AttendanceStats>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [resetLoading, setResetLoading] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // Track last action for undo functionality (now tracks database operations)
  const [lastActions, setLastActions] = useState<Record<string, { type: 'present' | 'absent' | 'cancelled' | 'no-class', timestamp: number } | null>>({});

  // Load subjects and attendance data on component mount
  useEffect(() => {
    loadAttendanceData();
  }, []);

  const loadAttendanceData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Initialize default subjects for new users
      await attendanceService.initializeDefaultSubjects();
      
      // Load subjects
      const subjectsData = await attendanceService.getSubjects();
      const subjectNames = subjectsData.map(s => s.subject_name);
      setSubjects(subjectNames);
      
      // Load attendance stats
      const stats = await attendanceService.getAttendanceStats();
      
      // Initialize empty stats for subjects that have no attendance records
      const attendanceData: Record<string, AttendanceStats> = {};
      subjectNames.forEach(subject => {
        attendanceData[subject] = stats[subject] || {
          present: 0,
          absent: 0,
          cancelled: 0,
          'no-class': 0
        };
      });
      
      setAttendance(attendanceData);
    } catch (err) {
      setError('Failed to load attendance data. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const addSubject = async () => {
    const subjectName = newSubject.trim();
    if (!subjectName || subjects.includes(subjectName)) return;
    
    try {
      setActionLoading('add-subject');
      setError(null);
      
      await attendanceService.addSubject(subjectName);
      
      // Update local state
      setSubjects([...subjects, subjectName]);
      setAttendance({
        ...attendance,
        [subjectName]: { present: 0, absent: 0, cancelled: 0, 'no-class': 0 }
      });
      setNewSubject('');
    } catch (err) {
      setError('Failed to add subject. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const deleteSubject = async (subjectToDelete: string) => {
    try {
      setActionLoading(`delete-${subjectToDelete}`);
      setError(null);
      
      await attendanceService.deleteSubject(subjectToDelete);
      
      // Update local state
      setSubjects(subjects.filter(subject => subject !== subjectToDelete));
      const newAttendance = { ...attendance };
      delete newAttendance[subjectToDelete];
      setAttendance(newAttendance);
      
      // Clear last action for this subject
      const newLastActions = { ...lastActions };
      delete newLastActions[subjectToDelete];
      setLastActions(newLastActions);
    } catch (err) {
      setError('Failed to delete subject. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const markAttendance = async (subject: string, type: 'present' | 'absent' | 'cancelled' | 'no-class') => {
    try {
      setActionLoading(`mark-${subject}`);
      setError(null);
      
      await attendanceService.markAttendance(subject, type);
      
      // Update local state
      setAttendance(prev => ({
        ...prev,
        [subject]: {
          ...prev[subject],
          [type]: prev[subject][type] + 1
        }
      }));
      
      // Store the last action for undo functionality
      setLastActions(prev => ({
        ...prev,
        [subject]: { type, timestamp: Date.now() }
      }));
    } catch (err) {
      setError('Failed to mark attendance. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };
  
  const undoLastAction = async (subject: string) => {
    const lastAction = lastActions[subject];
    if (!lastAction) return;
    
    try {
      setActionLoading(`undo-${subject}`);
      setError(null);
      
      const deletedRecord = await attendanceService.undoLastAttendance(subject);
      
      if (deletedRecord) {
        // Update local state by decrementing the counter
        setAttendance(prev => ({
          ...prev,
          [subject]: {
            ...prev[subject],
            [lastAction.type]: Math.max(0, prev[subject][lastAction.type] - 1)
          }
        }));
      }
      
      // Clear the last action for this subject
      setLastActions(prev => ({
        ...prev,
        [subject]: null
      }));
    } catch (err) {
      setError('Failed to undo attendance. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleResetAllAttendance = async () => {
    try {
      setResetLoading(true);
      setError(null);
      
      await attendanceService.resetAllAttendance();
      
      // Reset local state - set all attendance counts to 0
      const resetAttendance: Record<string, AttendanceStats> = {};
      subjects.forEach(subject => {
        resetAttendance[subject] = {
          present: 0,
          absent: 0,
          cancelled: 0,
          'no-class': 0
        };
      });
      
      setAttendance(resetAttendance);
      setLastActions({}); // Clear all undo actions
      setShowResetConfirm(false);
      
    } catch (err) {
      setError('Failed to reset attendance. Please try again.');
    } finally {
      setResetLoading(false);
    }
  };

  const getAttendancePercentage = (subject: string) => {
    const subjectData = attendance[subject];
    if (!subjectData) return 0;
    const totalRelevant = subjectData.present + subjectData.absent; // Cancelled classes don't count
    if (totalRelevant === 0) return 0;
    return Math.round((subjectData.present / totalRelevant) * 100);
  };

  const getTodaysDate = () => {
    const today = new Date(2025, 8, 9); // September 9, 2025 (month is 0-indexed)
    return today.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 85) return '#00FF88';
    if (percentage >= 75) return '#FFD700';
    return '#FF6B6B';
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <GlassCard className="mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {userProfile?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#EAEAEA' }}>
                {userProfile?.name || 'Loading...'}
              </h1>
              <p style={{ color: '#A0AEC0' }}>
                Enrollment No: {userProfile?.enrollment_number === 'Not available' ? 'Not set' : (userProfile?.enrollment_number || 'Loading...')} • Branch: {userProfile?.branch === 'Not available' ? 'Not set' : (userProfile?.branch || 'Loading...')}
              </p>
              <p style={{ color: '#A0AEC0' }}>
                Batch: {!userProfile?.batch ? 'Not set' : (userProfile.batch || 'Loading...')} • Email: {userProfile?.email || 'Loading...'}
              </p>
              {(!userProfile?.enrollment_number || userProfile?.branch === 'Not available' || !userProfile?.batch) && (
                <p className="text-xs mt-2" style={{ color: '#A0AEC0', opacity: 0.7 }}>
                  ℹ️ Some profile fields are not set. This information was collected during signup but may not be stored in the current database schema.
                </p>
              )}
            </div>
          </div>
        </GlassCard>

        {/* Attendance Tracker */}
        <GlassCard>
          <div className="flex items-center gap-3 mb-6">
            <Calendar size={28} style={{ color: '#00E5FF' }} />
            <div>
              <h2 className="text-2xl font-semibold" style={{ color: '#EAEAEA' }}>
                Attendance Tracker
              </h2>
              <p className="text-sm" style={{ color: '#A0AEC0' }}>
                Today: {getTodaysDate()}
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-red-400 text-sm">{error}</p>
              <Button 
                onClick={() => loadAttendanceData()} 
                className="mt-2 bg-red-500 hover:bg-red-600 text-white text-xs"
                size="sm"
              >
                Retry
              </Button>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin" size={32} style={{ color: '#00E5FF' }} />
              <span className="ml-3" style={{ color: '#EAEAEA' }}>Loading attendance data...</span>
            </div>
          ) : (
            <>
          {/* Subjects Section (Setup) */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#EAEAEA' }}>
              Subjects Setup
            </h3>
            <div className="flex gap-4 mb-4">
              <Input
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Enter subject name"
                className="flex-1"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#EAEAEA'
                }}
                onKeyPress={(e) => e.key === 'Enter' && addSubject()}
              />
              <Button
                onClick={addSubject}
                disabled={actionLoading === 'add-subject'}
                className="px-6 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #0D47A1, #00BFFF)',
                  border: 'none'
                }}
              >
                {actionLoading === 'add-subject' ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <Plus size={16} />
                )}
                Add Subject
              </Button>
            </div>

            {/* List of subjects */}
            <div className="space-y-2">
              {subjects.map((subject) => (
                <div
                  key={subject}
                  className="flex items-center justify-between p-3 rounded-lg border border-white/10"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                >
                  <span style={{ color: '#EAEAEA' }}>{subject}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteSubject(subject)}
                    disabled={actionLoading === `delete-${subject}`}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    {actionLoading === `delete-${subject}` ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Marking Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#EAEAEA' }}>
              Daily Marking
            </h3>
            <div className="space-y-4">
              {subjects.map((subject) => (
                <div
                  key={subject}
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                  className="sm:flex-row sm:items-center sm:gap-0"
                >
                  <div 
                    style={{ 
                      color: '#EAEAEA',
                      fontSize: '16px',
                      fontWeight: '500',
                      minWidth: '300px',
                      width: '300px',
                      flexShrink: 0,
                      paddingRight: '32px'
                    }}
                    className="text-lg sm:text-base"
                  >
                    {subject}
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Button
                      size="sm"
                      onClick={() => markAttendance(subject, 'present')}
                      disabled={actionLoading === `mark-${subject}`}
                      className="flex-1 sm:flex-none items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm cursor-pointer"
                    >
                      {actionLoading === `mark-${subject}` ? <Loader2 className="animate-spin" size={14} /> : <span className="hidden sm:inline">✅</span>} Present
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => markAttendance(subject, 'absent')}
                      disabled={actionLoading === `mark-${subject}`}
                      className="flex-1 sm:flex-none items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white text-sm cursor-pointer"
                    >
                      {actionLoading === `mark-${subject}` ? <Loader2 className="animate-spin" size={14} /> : <span className="hidden sm:inline">❌</span>} Absent
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => markAttendance(subject, 'cancelled')}
                      disabled={actionLoading === `mark-${subject}`}
                      className="flex-1 sm:flex-none items-center justify-center gap-1 bg-gray-600 hover:bg-gray-700 text-white text-sm cursor-pointer"
                    >
                      {actionLoading === `mark-${subject}` ? <Loader2 className="animate-spin" size={14} /> : <span className="hidden sm:inline">🚫</span>} Cancelled
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => markAttendance(subject, 'no-class')}
                      disabled={actionLoading === `mark-${subject}`}
                      className="flex-1 sm:flex-none items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm cursor-pointer"
                    >
                      {actionLoading === `mark-${subject}` ? <Loader2 className="animate-spin" size={14} /> : <span className="hidden sm:inline">📅</span>} No Class
                    </Button>
                    {lastActions[subject] && (
                      <Button
                        size="sm"
                        onClick={() => undoLastAction(subject)}
                        disabled={actionLoading === `undo-${subject}`}
                        className="items-center justify-center gap-1 bg-orange-500 hover:bg-orange-600 text-white text-sm cursor-pointer ml-2"
                        title={`Undo last ${lastActions[subject]?.type} marking`}
                      >
                        {actionLoading === `undo-${subject}` ? (
                          <Loader2 className="animate-spin" size={14} />
                        ) : (
                          <Undo size={14} />
                        )}
                        <span className="hidden sm:inline">Undo</span>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: '#EAEAEA' }}>
                Attendance Summary
              </h3>
              <Button
                onClick={() => setShowResetConfirm(true)}
                disabled={resetLoading || subjects.length === 0}
                className="h-8 px-3 text-xs bg-red-600/20 hover:bg-red-600/30 border-red-500/50 text-red-200 hover:text-red-100 transition-all"
                style={{ 
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                  color: '#FCA5A5'
                }}
              >
                {resetLoading ? (
                  <Loader2 className="w-3 h-3 animate-spin mr-1" />
                ) : (
                  <RotateCcw className="w-3 h-3 mr-1" />
                )}
                Reset All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => {
                const percentage = getAttendancePercentage(subject);
                const data = attendance[subject];
                const totalRelevant = data.present + data.absent;
                return (
                  <div
                    key={subject}
                    className="p-4 rounded-lg border border-white/10"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                  >
                    <h4 className="font-semibold mb-2" style={{ color: '#EAEAEA' }}>
                      {subject}
                    </h4>
                    <div
                      className="text-2xl font-bold mb-2"
                      style={{ color: getAttendanceColor(percentage) }}
                    >
                      {percentage}%
                    </div>
                    <div className="text-sm space-y-1" style={{ color: '#A0AEC0' }}>
                      <div>Present: {data.present}</div>
                      <div>Absent: {data.absent}</div>
                      <div>Cancelled: {data.cancelled}</div>
                      <div className="border-t border-white/10 pt-1 mt-2">
                        Total: {totalRelevant} classes
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Attendance Tips */}
          <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: 'rgba(0, 229, 255, 0.1)', border: '1px solid rgba(0, 229, 255, 0.3)' }}>
            <h4 className="font-semibold mb-2" style={{ color: '#00E5FF' }}>
              💡 Attendance Tips
            </h4>
            <ul className="text-sm space-y-1" style={{ color: '#A0AEC0' }}>
              <li>• Maintain at least 75% attendance to avoid debarment</li>
              <li>• 85% and above attendance is considered excellent</li>
              <li>• Plan your leaves strategically to maintain good attendance</li>
            </ul>
          </div>

          {/* Logout Button */}
          <div className="mt-8 flex justify-center">
            <Button
              onClick={signOut}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-full flex items-center gap-2 cursor-pointer"
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>

          {/* Reset Confirmation Dialog */}
          {showResetConfirm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div 
                className="bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-lg p-6 max-w-md mx-4"
                style={{ backgroundColor: 'rgba(17, 24, 39, 0.95)' }}
              >
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#EAEAEA' }}>
                  Reset All Attendance?
                </h4>
                <p className="text-sm mb-6" style={{ color: '#A0AEC0' }}>
                  This will permanently delete all attendance records for all subjects. 
                  All counts will be reset to 0. This action cannot be undone.
                </p>
                <div className="flex gap-3 justify-end">
                  <Button
                    onClick={() => setShowResetConfirm(false)}
                    disabled={resetLoading}
                    className="px-4 py-2 bg-white hover:bg-gray-100 border-gray-300 text-gray-900"
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      border: '1px solid #d1d5db'
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleResetAllAttendance}
                    disabled={resetLoading}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 border-red-600 text-white"
                    style={{
                      backgroundColor: '#dc2626',
                      color: 'white',
                      border: '1px solid #dc2626'
                    }}
                  >
                    {resetLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Resetting...
                      </>
                    ) : (
                      'Reset All'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
            </>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
