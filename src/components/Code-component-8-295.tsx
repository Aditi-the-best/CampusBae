import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, CheckCircle, XCircle, X, Trash2, Calendar } from 'lucide-react';

export function ProfilePage() {
  const [newSubject, setNewSubject] = useState('');
  const [subjects, setSubjects] = useState([
    'Data Structures',
    'Computer Networks',
    'Database Systems',
    'Operating Systems'
  ]);

  const [attendance, setAttendance] = useState({
    'Data Structures': { present: 18, absent: 2, cancelled: 1 },
    'Computer Networks': { present: 15, absent: 3, cancelled: 0 },
    'Database Systems': { present: 22, absent: 2, cancelled: 1 },
    'Operating Systems': { present: 16, absent: 3, cancelled: 2 }
  });

  const addSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      setSubjects([...subjects, newSubject.trim()]);
      setAttendance({
        ...attendance,
        [newSubject.trim()]: { present: 0, absent: 0, cancelled: 0 }
      });
      setNewSubject('');
    }
  };

  const deleteSubject = (subjectToDelete: string) => {
    setSubjects(subjects.filter(subject => subject !== subjectToDelete));
    const newAttendance = { ...attendance };
    delete newAttendance[subjectToDelete];
    setAttendance(newAttendance);
  };

  const updateAttendance = (subject: string, type: 'present' | 'absent' | 'cancelled') => {
    setAttendance(prev => ({
      ...prev,
      [subject]: {
        ...prev[subject],
        [type]: prev[subject][type] + 1
      }
    }));
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
              <span className="text-2xl font-bold text-white">[N]</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#EAEAEA' }}>
                [Student Name]
              </h1>
              <p style={{ color: '#A0AEC0' }}>
                Enrollment No: [12345678] • Branch: [Computer Science]
              </p>
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
                className="px-6"
                style={{
                  background: 'linear-gradient(135deg, #0D47A1, #00BFFF)',
                  border: 'none'
                }}
              >
                <Plus size={16} />
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
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 size={16} />
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
                  className="flex items-center justify-between p-4 rounded-lg border border-white/10"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                >
                  <span className="font-medium" style={{ color: '#EAEAEA' }}>{subject}</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => updateAttendance(subject, 'present')}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                    >
                      ✅ Present
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => updateAttendance(subject, 'absent')}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
                    >
                      ❌ Absent
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => updateAttendance(subject, 'cancelled')}
                      className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white"
                    >
                      🚫 Cancelled
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#EAEAEA' }}>
              Attendance Summary
            </h3>
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
        </GlassCard>
      </div>
    </div>
  );
}
