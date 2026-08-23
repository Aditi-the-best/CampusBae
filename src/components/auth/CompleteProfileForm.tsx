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
    if (!branch.trim()) {
      setError('🎓 Please enter your branch.');
      return;
    }
    if (!batch.trim()) {
      setError('📅 Please enter your batch year.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await updateProfile({
        name: name.trim(),
        enrollment_number: enrollmentNumber.trim(),
        branch: branch.trim(),
        batch: parseInt(batch)
      });
    } catch (err: any) {
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full mx-auto" style={{ maxWidth: '400px' }}>
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
              <label className="text-xs font-semibold block" style={{ color: '#EAEAEA' }}>Full Name</label>
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
              <label className="text-xs font-semibold block" style={{ color: '#EAEAEA' }}>Enrollment Number</label>
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

            {/* Branch */}
            <div className="space-y-1">
              <label className="text-xs font-semibold block" style={{ color: '#EAEAEA' }}>Branch</label>
              <Input
                type="text"
                placeholder="e.g. ECE-AI"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required
                className="w-full bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-[#00E5FF] transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* Batch of (Graduation Year) */}
            <div className="space-y-1">
              <label className="text-xs font-semibold block" style={{ color: '#EAEAEA' }}>Batch of (Graduation Year)</label>
              <Input
                type="number"
                placeholder="e.g. 2028"
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                required
                className="w-full bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-[#00E5FF] transition-colors"
                disabled={isLoading}
                min="2020"
                max="2035"
              />
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
                className="w-full text-center text-gray-400 hover:text-white text-xs py-2 transition-colors cursor-pointer bg-transparent border-none"
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
