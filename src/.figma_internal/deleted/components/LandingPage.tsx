import { Button } from './ui/button';

interface LandingPageProps {
  onEnter: () => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
  return (
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            onClick={onEnter}
            className="
              text-lg px-12 py-4 rounded-full
              transition-all duration-300
              hover:scale-105 hover:shadow-2xl
            "
            style={{
              background: 'linear-gradient(135deg, #0D47A1, #00BFFF)',
              color: '#EAEAEA',
              border: 'none',
              boxShadow: '0 8px 32px rgba(0, 191, 255, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 191, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 191, 255, 0.3)';
            }}
          >
            Login
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="
              text-lg px-12 py-4 rounded-full
              transition-all duration-300
              hover:scale-105
            "
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: '#00E5FF',
              color: '#00E5FF',
              backdropFilter: 'blur(10px)'
            }}
            onClick={() => alert('Login functionality coming soon!')}
          >
            Signup
          </Button>
        </div>

        {/* Auth Note */}
        <div className="text-sm" style={{ color: '#A0AEC0' }}>
          <p>Authentication with Student Email (Coming Soon)</p>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-cyan-400 rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}
