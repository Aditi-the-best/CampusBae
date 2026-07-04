import { useState, FormEvent } from 'react';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

interface ForgotPasswordFormProps {
  onSuccess: (message: string) => void;
  onError: (error: string) => void;
  onBackToLogin: () => void;
}

export function ForgotPasswordForm({ onSuccess, onError, onBackToLogin }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await resetPassword(email.trim());
      onSuccess('🎉 Password reset link has been sent to your email! Please check your inbox and follow the instructions to reset your password.');
    } catch (err: any) {
      onError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Back to Login Button */}
      <button
        type="button"
        onClick={onBackToLogin}
        className="flex items-center gap-2 text-white hover:text-blue-300 mb-4 transition-colors"
        disabled={isLoading}
      >
        <ArrowLeft size={16} />
        Back to Login
      </button>

      {/* Form Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
        <p className="text-gray-400 text-sm">
          Enter your IGDTUW email address and we'll send you a link to reset your password.
        </p>
      </div>

      {/* Reset Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Your IGDTUW Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
          disabled={isLoading}
        />
        
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
          disabled={isLoading || !email.trim()}
        >
          {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
        </Button>
      </form>

      {/* Help Text */}
      <div className="mt-6 text-center">
        <p className="text-gray-400 text-xs">
          💡 Make sure to check your spam folder if you don't see the email within a few minutes.
        </p>
      </div>
    </div>
  );
}
