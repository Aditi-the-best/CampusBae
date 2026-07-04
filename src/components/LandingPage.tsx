import { useState } from 'react';
import { Button } from './ui/button';
import { LoginForm } from './auth/LoginForm';
import { SignupForm } from './auth/SignupForm';
import { ForgotPasswordForm } from './auth/ForgotPasswordForm';

interface LandingPageProps {
  onLoginSuccess: () => void;
  onAuthError: (error: string) => void;
  authError: string | null;
}

export function LandingPage({ onLoginSuccess, onAuthError, authError }: LandingPageProps) {
  const [showLogin, setShowLogin] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  return (
    <div className="min-h-screen">
      {/* Main Landing Section */}
      <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span style={{ color: '#EAEAEA' }}>Don't just study it, </span>
            <span 
              style={{ 
                color: '#00E5FF', 
                textShadow: '0 0 20px rgba(0, 229, 255, 0.6)' 
              }}
              className="block sm:inline"
            >
              CampusBae
            </span>
            <span style={{ color: '#EAEAEA' }}> it.</span>
          </h1>
          
          <p 
            className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto"
            style={{ color: '#A0AEC0' }}
          >
            Your all-in-one campus companion for IGDTUW students.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
          {/* Login Button */}
          <Button
            size="lg"
            onClick={() => {
              setShowLogin(true);
              setShowForm(true);
              setSignupSuccess(false);
              onAuthError(''); // Clear any errors
            }}
            className={`
              text-lg px-12 py-4 rounded-full
              transition-all duration-300
              hover:scale-105 hover:shadow-2xl
            `}
            style={{
              background: showLogin 
                ? 'linear-gradient(135deg, #0D47A1, #00BFFF)'
                : 'transparent',
              color: '#EAEAEA',
              border: showLogin ? 'none' : '2px solid #00BFFF',
              boxShadow: showLogin ? '0 8px 32px rgba(0, 191, 255, 0.3)' : 'none'
            }}
          >
            Login
          </Button>

          {/* Signup Button */}
          <Button
            size="lg"
            onClick={() => {
              setShowLogin(false);
              setShowForm(true);
              setSignupSuccess(false);
              onAuthError(''); // Clear any errors
            }}
            className={`
              text-lg px-12 py-4 rounded-full
              transition-all duration-300
              hover:scale-105
            `}
            style={{
              background: !showLogin 
                ? 'linear-gradient(135deg, #0D47A1, #00BFFF)'
                : 'transparent',
              color: '#EAEAEA',
              border: !showLogin ? 'none' : '2px solid #00BFFF',
              boxShadow: !showLogin ? '0 8px 32px rgba(0, 191, 255, 0.3)' : 'none'
            }}
          >
            Signup
          </Button>
        </div>

        {/* Auth Forms */}
        {showForm && (
          <div className="max-w-md mx-auto mb-12">
            {showForgotPassword ? (
              <ForgotPasswordForm 
                onSuccess={(message) => {
                  setSuccessMessage(message);
                  onAuthError(''); // Clear any errors
                  setShowForgotPassword(false);
                  setShowLogin(true);
                }}
                onError={onAuthError}
                onBackToLogin={() => {
                  setShowForgotPassword(false);
                  setShowLogin(true);
                  onAuthError('');
                  setSuccessMessage('');
                }}
              />
            ) : showLogin ? (
              <LoginForm 
                onSuccess={onLoginSuccess} 
                onError={onAuthError} 
                hasError={!!authError}
                onForgotPassword={() => {
                  setShowForgotPassword(true);
                  onAuthError('');
                }}
              />
            ) : (
              <SignupForm 
                onSuccess={() => {
                  setSignupSuccess(true);
                  setShowLogin(true);
                  onAuthError(''); // Clear any previous errors
                }} 
                onError={onAuthError} 
                hasError={!!authError}
              />
            )}
            {authError && (
              <div className="mt-4 p-3 rounded-lg border border-red-500/50 bg-red-500/10 backdrop-blur-sm">
                <p className="text-red-400 font-medium text-sm flex items-center gap-2">
                  <span className="text-red-500">⚠️</span>
                  {authError}
                </p>
              </div>
            )}
            {successMessage && (
              <div className="mt-4 p-4 rounded-lg border border-green-500/50 bg-green-500/10 backdrop-blur-sm">
                <p className="font-medium text-sm flex items-center gap-2" style={{color: '#22c55e'}}>
                  <span style={{color: '#22c55e'}}>✅</span>
                  {successMessage}
                </p>
              </div>
            )}
            {signupSuccess && showLogin && (
              <div className="mt-4 p-4 rounded-lg border border-green-500/50 bg-green-500/10 backdrop-blur-sm">
                <p className="font-medium text-sm flex items-center gap-2" style={{color: '#22c55e !important'}}>
                  <span style={{color: '#22c55e'}}>✅</span>
                  Signup Successful! Please verify your IGDTUW email.
                </p>
                <div className="text-xs mt-3 space-y-1" style={{color: '#22c55e', opacity: 0.9}}>
                  <p>📧 <strong>Check your IGDTUW email inbox</strong> for verification link</p>
                  <p>📁 <strong>Check spam/junk folder</strong> if not in inbox</p>
                  <p>⏱️ <strong>Wait 5-10 minutes</strong> for email delivery</p>
                  <p>🔗 <strong>Click the verification link</strong>, then return here to login</p>
                </div>
                <div className="mt-3 pt-2 border-t border-green-500/20">
                  <p className="text-xs" style={{color: '#22c55e', opacity: 0.7}}>
                    💡 <strong>Tip:</strong> Make sure you used your correct IGDTUW email address
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Scroll to Meet the Creators */}
        {!showForm && (
          <div className="mt-24 mb-8">
            <div 
              className="flex flex-col items-center cursor-pointer group transition-all duration-300 hover:scale-105"
              onClick={() => {
                const creatorsSection = document.getElementById('creators-section');
                creatorsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <p 
                className="text-lg mb-2 group-hover:text-cyan-400 transition-colors duration-300"
                style={{ color: '#A0AEC0' }}
              >
                Scroll to meet the creators
              </p>
              <div 
                className="animate-bounce group-hover:text-cyan-400 transition-colors duration-300"
                style={{ color: '#00BFFF' }}
              >
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-10 w-40 h-40 bg-cyan-400 rounded-full opacity-5 blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>
      </div>

      {/* Meet the Creators Section */}
      <div id="creators-section" className="pt-20 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-4xl md:text-5xl font-bold text-center mb-4"
            style={{ color: '#EAEAEA' }}
          >
            Meet the{' '}
            <span 
              style={{ 
                color: '#00E5FF', 
                textShadow: '0 0 20px rgba(0, 229, 255, 0.6)' 
              }}
            >
              Creators
            </span>
          </h2>
          <p 
            className="text-xl text-center mb-12 max-w-2xl mx-auto"
            style={{ color: '#A0AEC0' }}
          >
            The passionate team behind CampusBae
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            {/* Ishanvi Srivastava */}
            <div className="group">
              <div 
                className="p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center min-h-96"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="mb-4">
                  <div 
                    className="w-28 h-28 mx-auto mb-4 transition-all duration-300 group-hover:scale-110 overflow-hidden border-2 border-cyan-400/30"
                    style={{
                      borderRadius: '50%',
                      aspectRatio: '1 / 1'
                    }}
                  >
                    <img 
                      src="/ish.jpg" 
                      alt="Ish" 
                      className="w-full h-full object-cover"
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                  <h3 
                    className="text-xl font-bold mb-1"
                    style={{ color: '#EAEAEA' }}
                  >
                    Ishanvi Srivastava
                  </h3>
                  <p 
                    className="text-sm mb-3"
                    style={{ color: '#00BFFF' }}
                  >
                    ECE-AI'28
                  </p>
                </div>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: '#A0AEC0' }}
                >
                  Always ready to guide you through.
                </p>
              </div>
            </div>

            {/* Nishtha */}
            <div className="group">
              <div 
                className="p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center min-h-96"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="mb-4">
                  <div 
                    className="w-28 h-28 mx-auto mb-4 transition-all duration-300 group-hover:scale-110 overflow-hidden border-2 border-cyan-400/30"
                    style={{
                      borderRadius: '50%',
                      aspectRatio: '1 / 1'
                    }}
                  >
                    <img 
                      src="/nish.png" 
                      alt="Nish" 
                      className="w-full h-full object-cover"
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                  <h3 
                    className="text-xl font-bold mb-1"
                    style={{ color: '#EAEAEA' }}
                  >
                    Nishtha
                  </h3>
                  <p 
                    className="text-sm mb-3"
                    style={{ color: '#00BFFF' }}
                  >
                    ECE-AI'28
                  </p>
                </div>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: '#A0AEC0' }}
                >
                  Always ready to help you out.
                </p>
              </div>
            </div>

            {/* Kavya */}
            <div className="group">
              <div 
                className="p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center min-h-96"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="mb-4">
                  <div 
                    className="w-28 h-28 mx-auto mb-4 transition-all duration-300 group-hover:scale-110 overflow-hidden border-2 border-cyan-400/30"
                    style={{
                      borderRadius: '50%',
                      aspectRatio: '1 / 1'
                    }}
                  >
                    <img 
                      src="/kavya.jpg" 
                      alt="Kavya" 
                      className="w-full h-full object-cover"
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                  <h3 
                    className="text-xl font-bold mb-1"
                    style={{ color: '#EAEAEA' }}
                  >
                    Kavya Jain
                  </h3>
                  <p 
                    className="text-sm mb-3"
                    style={{ color: '#00BFFF' }}
                  >
                    ECE-AI'28
                  </p>
                </div>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: '#A0AEC0' }}
                >
                  Always ready to cheer you up.
                </p>
              </div>
            </div>

            {/* Manvi */}
            <div className="group">
              <div 
                className="p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center min-h-96"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="mb-4">
                  <div 
                    className="w-28 h-28 mx-auto mb-4 transition-all duration-300 group-hover:scale-110 overflow-hidden border-2 border-cyan-400/30"
                    style={{
                      borderRadius: '50%',
                      aspectRatio: '1 / 1'
                    }}
                  >
                    <img 
                      src="/manvi.jpg" 
                      alt="Manvi" 
                      className="w-full h-full object-cover"
                      style={{ borderRadius: '50%' }}
                    />
                  </div>
                  <h3 
                    className="text-xl font-bold mb-1"
                    style={{ color: '#EAEAEA' }}
                  >
                    Manvi
                  </h3>
                  <p 
                    className="text-sm mb-3"
                    style={{ color: '#00BFFF' }}
                  >
                    ECE-AI'28
                  </p>
                </div>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: '#A0AEC0' }}
                >
                  Always ready to make things fun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
