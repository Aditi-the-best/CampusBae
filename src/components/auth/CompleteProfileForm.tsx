import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { GlassCard } from '../GlassCard';
import { useAuth } from '../../context/AuthContext';
import { Loader2, GraduationCap } from 'lucide-react';

export function CompleteProfileForm() {
  const { user, updateProfile, signOut } = useAuth();
  const [name, setName] = useState(user?.user_metadata?.full_name || user?.user_metadata?.name || '');
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [branch, setBranch] = useState('');
  const [batch, setBatch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const branches = [
    { value: 'cse', label: 'CSE (Computer Science & Engineering)' },
    { value: 'cseai', label: 'CSE-AI (Computer Science & Engineering - AI)' },
    { value: 'ece', label: 'ECE (Electronics & Communication Engineering)' },
    { value: 'eceai', label: 'ECE-AI (Electronics & Communication Engineering - AI)' },
    { value: 'it', label: 'IT (Information Technology)' },
    { value: 'mae', label: 'MAE (Mechanical & Automation Engineering)' },
    { value: 'mac', label: 'MAC (Mathematics & Computing)' },
    { value: 'aiml', label: 'AIML (Artificial Intelligence & Machine Learning)' },
    { value: 'dmam', label: 'DMAM (Dual Degree Management & Automation)' }
  ];

  const batches = Array.from({ length: 7 }, (_, i) => (2024 + i).toString());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('📝 Please enter your name.');
      return;
    }
    if (!enrollmentNumber.trim()) {
      setError('📝 Please enter your Enrollment Number.');
      return;
    }
    if (!branch) {
      setError('🎓 Please select your branch.');
      return;
    }
    if (!batch) {
      setError('📅 Please select your batch year.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await updateProfile({
        name: name.trim(),
        enrollment_number: enrollmentNumber.trim(),
        branch: branch,
        batch: parseInt(batch)
      });
      // Profile update will automatically refresh the AuthContext profile
    } catch (err: any) {
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md mx-auto">
        <GlassCard className="p-8 border border-white/10" hover={false}>
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,229,255,0.4)]">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Complete Your Profile</h2>
            <p className="text-gray-400 text-sm">
              We just need a few more details to set up your companion dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300 block">Full Name</label>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-[#00E5FF] transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Enrollment Number */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300 block">Enrollment Number</label>
              <Input
                type="text"
                placeholder="e.g. 04801012024"
                value={enrollmentNumber}
                onChange={(e) => setEnrollmentNumber(e.target.value)}
                required
                className="w-full bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-[#00E5FF] transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Branch Selection */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300 block">Branch</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required
                className="w-full h-9 px-3 py-1 bg-gray-900/90 border border-white/10 rounded-md text-white text-sm focus:border-[#00E5FF] outline-none transition-colors"
                disabled={isLoading}
              >
                <option value="" disabled className="text-gray-500">Select your branch</option>
                {branches.map((b) => (
                  <option key={b.value} value={b.value} className="bg-gray-900 text-white">
                    {b.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Batch Selection */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300 block">Batch of (Graduation Year)</label>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                required
                className="w-full h-9 px-3 py-1 bg-gray-900/90 border border-white/10 rounded-md text-white text-sm focus:border-[#00E5FF] outline-none transition-colors"
                disabled={isLoading}
              >
                <option value="" disabled className="text-gray-500">Select graduation year</option>
                {batches.map((year) => (
                  <option key={year} value={year} className="bg-gray-900 text-white">
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg border border-red-500/50 bg-red-500/10 backdrop-blur-sm">
                <p className="text-red-400 font-medium text-sm flex items-center gap-2">
                  <span>⚠️</span>
                  {error}
                </p>
              </div>
            )}

            {/* Submit & Cancel Buttons */}
            <div className="pt-2 space-y-2">
              <Button
                type="submit"
                className="w-full text-white font-medium py-3 rounded-lg transition-all duration-300 hover:scale-102"
                style={{
                  background: 'linear-gradient(135deg, #0D47A1, #00BFFF)',
                  boxShadow: '0 4px 20px rgba(0, 191, 255, 0.2)'
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin w-4 h-4" />
                    Saving details...
                  </span>
                ) : (
                  'Complete Setup'
                )}
              </Button>

              <button
                type="button"
                onClick={signOut}
                className="w-full text-center text-gray-400 hover:text-white text-xs py-2 transition-colors cursor-pointer"
                disabled={isLoading}
              >
                Log Out / Switch Account
              </button>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
