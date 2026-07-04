import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { supabase } from '../../lib/supabaseClient';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

export function PasswordResetPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [validSession, setValidSession] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if we have a valid recovery session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        // Check URL parameters for recovery tokens (query params)
        const urlParams = new URLSearchParams(window.location.search);
        let accessToken = urlParams.get('access_token');
        let refreshToken = urlParams.get('refresh_token');
        let type = urlParams.get('type');

        // Also check hash fragment (Supabase might send tokens in hash)
        if (!accessToken && window.location.hash) {
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          accessToken = hashParams.get('access_token');
          refreshToken = hashParams.get('refresh_token');
          type = hashParams.get('type');
        }

        console.log('🔍 Recovery tokens:', { 
          accessToken: accessToken ? accessToken.substring(0, 20) + '...' : null, 
          refreshToken: !!refreshToken, 
          type,
          currentSession: !!session 
        });

        // Check if this looks like a test link with fake tokens
        const isFakeToken = accessToken && (
          accessToken.includes('fake_token') || 
          accessToken.includes('test_token') || 
          accessToken.length < 50 // Real Supabase tokens are much longer
        );

        if (type === 'recovery' && accessToken) {
          if (isFakeToken) {
            console.log('🧪 Detected test/fake token - showing test message');
            setError('This is a test link with fake tokens. For real testing, use the "Forgot Password" form to get a real reset email.');
          } else {
            // Set the session with the recovery tokens
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || ''
            });

            if (error) {
              console.error('❌ Session error:', error);
              setError('Invalid or expired reset link. Please request a new password reset.');
            } else {
              console.log('✅ Recovery session established');
              setValidSession(true);
              
              // Clean up the URL to prevent re-processing tokens
              if (window.history && window.history.replaceState) {
                window.history.replaceState({}, document.title, window.location.pathname);
              }
            }
          }
        } else if (session) {
          // Already have a valid session
          console.log('✅ Using existing session');
          setValidSession(true);
        } else {
          console.log('❌ No recovery tokens found');
          setError('Invalid or expired reset link. Please request a new password reset.');
        }
      } catch (err: any) {
        console.error('❌ Session check error:', err);
        setError('Something went wrong. Please try again.');
      } finally {
        setChecking(false);
      }
    };

    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);

    } catch (err: any) {
      console.error('❌ Password update error:', err);
      setError(err.message || 'Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)' }}>
        <div className="text-center max-w-md mx-auto">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">Password Updated!</h1>
          <p className="text-gray-400 mb-6">
            Your password has been successfully updated. You will be redirected to the login page shortly.
          </p>
          <div className="animate-pulse text-blue-400">
            Redirecting in 3 seconds...
          </div>
        </div>
      </div>
    );
  }

  if (!validSession) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)' }}>
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">Invalid Reset Link</h1>
          <p className="text-red-400 mb-6">{error}</p>
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Back to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)' }}>
      <div className="max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Set New Password</h1>
          <p className="text-gray-400">
            Enter your new password below to complete the reset process.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 pr-12 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
              disabled={isLoading}
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 pr-12 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
              disabled={isLoading}
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 transition-colors"
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Password Requirements */}
          <div className="text-xs text-gray-400 space-y-1">
            <p className={password.length >= 6 ? 'text-green-400' : ''}>
              ✓ At least 6 characters
            </p>
            <p className={password === confirmPassword && password.length > 0 ? 'text-green-400' : ''}>
              ✓ Passwords match
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg border border-red-500/50 bg-red-500/10 backdrop-blur-sm">
              <p className="text-red-400 font-medium text-sm flex items-center gap-2">
                <span className="text-red-500">⚠️</span>
                {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
            disabled={isLoading || password.length < 6 || password !== confirmPassword}
          >
            {isLoading ? 'Updating Password...' : 'Update Password'}
          </Button>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => window.location.href = '/'}
            className="text-gray-400 hover:text-white text-sm transition-colors"
            disabled={isLoading}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}