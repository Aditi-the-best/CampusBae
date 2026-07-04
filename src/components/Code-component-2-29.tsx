import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, CheckCircle, XCircle } from 'lucide-react';

export function ProfilePage() {
  const [newSubject, setNewSubject] = useState('');
  const [subjects, setSubjects] = useState([
    'Data Structures',
    'Computer Networks',
    'Database Systems',
    'Operating Systems'
  ]);

  const [attendance, setAttendance] = useState({
    'Data Structures': { present: 18, total: 20 },
    'Computer Networks': { present: 15, total: 18 },
    'Database Systems': { present: 22, total: 24 },
    'Operating Systems': { present: 16, total: 19 }
  });

  const addSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      setSubjects([...subjects, newSubject.trim()]);
      setAttendance({
        ...attendance,
        [newSubject.trim()]: { present: 0, total: 0 }
      });
      setNewSubject('');
    }
  };

  const updateAttendance = (subject: string, isPresent: boolean) => {
    setAttendance(prev => ({
      ...prev,
      [subject]: {
        present: isPresent ? prev[subject].present + 1 : prev[subject].present,
        total: prev[subject].total + 1
      }
    }));
  };

  const getAttendancePercentage = (subject: string) => {
    const subjectData = attendance[subject];
    if (!subjectData || subjectData.total === 0) return 0;
    return Math.round((subjectData.present / subjectData.total) * 100);
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
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#EAEAEA' }}>
            Attendance Tracker
          </h2>

          {/* Add Subject */}
          <div className="flex gap-4 mb-8">
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
            />
            <Button
              onClick={addSubject}
              className="px-6"
              style={{
                background: 'linear-gradient(135deg, #0D47A1, #00BFFF)',
                border: 'none'
              }}
            >
              <Plus size={20} />
              Add Subject
            </Button>
          </div>

          {/* Attendance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {subjects.map((subject) => {
              const percentage = getAttendancePercentage(subject);
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
                    className="text-2xl font-bold mb-1"
                    style={{ color: getAttendanceColor(percentage) }}
                  >
                    {percentage}%
                  </div>
                  <p className="text-sm" style={{ color: '#A0AEC0' }}>
                    {attendance[subject]?.present || 0}/{attendance[subject]?.total || 0} classes
                  </p>
                </div>
              );
            })}
          </div>

          {/* Mark Attendance */}
          <div>
            <h3 className="text-xl font-semibold mb-4" style={{ color: '#EAEAEA' }}>
              Mark Today's Attendance
            </h3>
            <div className="space-y-4">
              {subjects.map((subject) => (
                <div
                  key={subject}
                  className="flex items-center justify-between p-4 rounded-lg border border-white/10"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                >
                  <span style={{ color: '#EAEAEA' }}>{subject}</span>
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      onClick={() => updateAttendance(subject, true)}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle size={16} />
                      Present
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => updateAttendance(subject, false)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
                    >
                      <XCircle size={16} />
                      Absent
                    </Button>
                  </div>
                </div>
              ))}
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
