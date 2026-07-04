import { useState, useEffect } from 'react';
import { GalaxyBackground } from './components/GalaxyBackground';
import { LandingPage } from './components/LandingPage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { ProfilePage } from './components/ProfilePage';
import { BranchResourcesPage } from './components/BranchResourcesPage';
import { MarketplacePage } from './components/MarketplacePage';
import { SocietiesPage } from './components/SocietiesPage';
import { RoadmapPage } from './components/RoadmapPage';
import { NetworkingPage } from './components/NetworkingPage';
import { PasswordResetPage } from './components/auth/PasswordResetPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthDebug } from './components/AuthDebug';

function AppContent() {
  const { user, loading } = useAuth();
  
  // IMMEDIATE URL check before anything else can process
  const [initialUrlChecked, setInitialUrlChecked] = useState(false);
  const [forceResetPage, setForceResetPage] = useState(false);
  
  // Check URL immediately on component mount, before any auth processing
  useEffect(() => {
    if (!initialUrlChecked) {
      const currentUrl = window.location.href;
      const hasRecoveryTokens = /[?&#](access_token|refresh_token|type=recovery)/.test(currentUrl) ||
                               currentUrl.includes('password-reset') ||
                               currentUrl.includes('reset-password');
      
      console.log('🚨 IMMEDIATE URL CHECK ON MOUNT:', {
        currentUrl,
        hasRecoveryTokens,
        timestamp: new Date().toISOString()
      });
      
      if (hasRecoveryTokens) {
        console.log('🚨 FORCING RESET PAGE IMMEDIATELY - BLOCKING ALL OTHER PROCESSING');
        setForceResetPage(true);
        setCurrentPage('reset-password');
      }
      
      setInitialUrlChecked(true);
    }
  }, [initialUrlChecked]);

  // Also check on window load to catch any URL processing by Supabase
  useEffect(() => {
    const handleLoad = () => {
      const currentUrl = window.location.href;
      const hasRecoveryTokens = /[?&#](access_token|refresh_token|type=recovery)/.test(currentUrl) ||
                               currentUrl.includes('password-reset') ||
                               currentUrl.includes('reset-password');
      
      console.log('🔍 WINDOW LOAD CHECK:', {
        currentUrl,
        hasRecoveryTokens,
        timestamp: new Date().toISOString()
      });
      
      if (hasRecoveryTokens) {
        console.log('🚨 WINDOW LOAD: FORCING RESET PAGE');
        setForceResetPage(true);
        setCurrentPage('reset-password');
      }
    };

    if (document.readyState === 'loading') {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    } else {
      handleLoad();
    }
  }, []);
  
  // Initialize currentPage based on URL immediately
  const getInitialPage = () => {
    // Check for password reset indicators IMMEDIATELY with comprehensive patterns
    const url = window.location.href;
    const hasRecoveryToken = /[?&#](access_token|refresh_token|type=recovery)/.test(url) ||
                            url.includes('reset-password') ||
                            url.includes('password-reset') ||
                            url.includes('type=recovery');
    
    if (hasRecoveryToken) {
      console.log('� Password reset detected, showing reset page');
      return 'reset-password';
    }
    
    return 'landing';
  };
  
  const [currentPage, setCurrentPage] = useState<'landing' | 'home' | 'profile' | 'resources' | 'marketplace' | 'societies' | 'roadmap' | 'networking' | 'reset-password'>(getInitialPage);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isPdfOpen, setIsPdfOpen] = useState<boolean>(false);
  
  // State for navigation filters
  const [resourceFilters, setResourceFilters] = useState<{
    branch?: string;
    semester?: string;
    subject?: string;
    type?: string;
  }>({});
  
  const [societyFilters, setSocietyFilters] = useState<{
    scrollToSociety?: number;
  }>({});

  // Monitor URL changes to prevent Supabase from redirecting away from reset page
  useEffect(() => {
    const handleUrlChange = () => {
      const currentUrl = window.location.href;
      const hasRecoveryTokens = /[?&#](access_token|refresh_token|type=recovery)/.test(currentUrl) ||
                               currentUrl.includes('password-reset') ||
                               currentUrl.includes('reset-password');
      
      console.log('🔍 URL CHANGE DETECTED:', {
        newUrl: currentUrl,
        hasRecoveryTokens,
        forceResetPage,
        currentPage
      });
      
      if (hasRecoveryTokens && !forceResetPage) {
        console.log('🚨 URL CHANGE: FORCING RESET PAGE');
        setForceResetPage(true);
        setCurrentPage('reset-password');
      }
    };

    // Listen for URL changes (including hash changes)
    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [forceResetPage, currentPage]);

  // Simple navigation logic without complex state management
  useEffect(() => {
    // ALWAYS check for reset tokens first, regardless of user state
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');
    const accessToken = urlParams.get('access_token');
    const hash = window.location.hash;
    
    // Parse hash parameters as well
    let hashType = null;
    let hashAccessToken = null;
    if (hash) {
      const hashParams = new URLSearchParams(hash.substring(1));
      hashType = hashParams.get('type');
      hashAccessToken = hashParams.get('access_token');
    }
    
    // Debug logging
    console.log('🔍 URL Debug:', {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      type,
      hashType,
      hasAccessToken: !!(accessToken || hashAccessToken),
      currentPage,
      user: !!user,
      loading,
      fullURL: window.location.href
    });
    
    // FORCE reset page if ANY recovery indicators are found
    const isResetRequest = type === 'recovery' || 
                          hashType === 'recovery' ||
                          hash.includes('type=recovery') || 
                          hash.includes('access_token') ||
                          accessToken ||
                          hashAccessToken ||
                          window.location.pathname === '/reset-password' ||
                          hash.includes('password-reset') ||
                          // Additional Supabase recovery patterns
                          hash.includes('access_token=') ||
                          hash.includes('refresh_token=') ||
                          hash.includes('expires_in=') ||
                          hash.includes('token_type=') ||
                          window.location.search.includes('access_token=') ||
                          window.location.search.includes('refresh_token=') ||
                          // Check for any auth-related parameters
                          /[?&#](access_token|refresh_token|type=recovery)/.test(window.location.href);
    
    console.log('🔍 Reset Detection:', {
      isResetRequest,
      type,
      hashType,
      hasTokenInHash: hash.includes('access_token'),
      hasTokenInSearch: window.location.search.includes('access_token'),
      regexMatch: /[?&#](access_token|refresh_token|type=recovery)/.test(window.location.href)
    });
    
    if (isResetRequest) {
      console.log('🚨 FORCING RESET PAGE - OVERRIDING USER LOGIN');
      if (currentPage !== 'reset-password') {
        setCurrentPage('reset-password');
      }
      return; // NEVER proceed to regular navigation if reset is detected
    }

    // Only handle regular navigation if no reset tokens detected
    if (!loading && !isResetRequest) {
      if (user && currentPage === 'landing') {
        console.log('📍 User logged in, going to home');
        setCurrentPage('home');
      } else if (!user && currentPage !== 'landing') {
        console.log('📍 No user, going to landing');
        setCurrentPage('landing');
      }
    }
  }, [user, loading]); // Removed currentPage from deps to prevent loops

  const handleNavigate = (page: string, filters?: any) => {
    setAuthError(null);
    if (page === 'resources' && filters) {
      setResourceFilters(filters);
      setSocietyFilters({});
    } else if (page === 'societies' && filters) {
      setSocietyFilters(filters);
      setResourceFilters({});
    } else {
      setResourceFilters({});
      setSocietyFilters({});
    }
    setCurrentPage(page as any);
  };

  const handleLoginSuccess = () => {
    setCurrentPage('home');
    setAuthError(null);
  };

  const handleAuthError = (error: string) => {
    setAuthError(error);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onLoginSuccess={handleLoginSuccess} onAuthError={handleAuthError} authError={authError} />;
      case 'reset-password':
        return <PasswordResetPage />;
      case 'home':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage />;
      case 'resources':
        return <BranchResourcesPage 
          initialBranch={resourceFilters.branch}
          initialSemester={resourceFilters.semester}
          initialSubject={resourceFilters.subject}
          initialType={resourceFilters.type}
        />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'societies':
        return <SocietiesPage scrollToSociety={societyFilters.scrollToSociety} />;
      case 'roadmap':
        return <RoadmapPage onPdfStateChange={setIsPdfOpen} />;
      case 'networking':
        return <NetworkingPage />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  // Special case for password reset page - show only the reset component
  // FORCE reset page if we detected recovery tokens immediately
  if (forceResetPage || currentPage === 'reset-password') {
    console.log('🚨 SHOWING PASSWORD RESET PAGE (forced or detected)');
    return <PasswordResetPage />;
  }

  return (
    <div 
      className="min-h-screen relative flex flex-col"
      style={{ 
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}
    >
      <GalaxyBackground />
      
      {user && currentPage !== 'landing' && !isPdfOpen && (
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      
      <main className="relative z-10 flex-1">
        {currentPage === 'landing' ? (
          <LandingPage 
            onLoginSuccess={handleLoginSuccess}
            onAuthError={handleAuthError}
            authError={authError}
          />
        ) : (
          renderCurrentPage()
        )}
      </main>

      <Footer onNavigate={handleNavigate} currentPage={currentPage} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
