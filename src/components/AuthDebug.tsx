import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { Button } from './ui/button';

export function AuthDebug() {
  const { user, userProfile } = useAuth();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkAuthState = async () => {
    setLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      const { data: user } = await supabase.auth.getUser();
      
      // Check if students table exists and what's in it
      const { data: students, error: studentsError } = await supabase
        .from('students')
        .select('*')
        .limit(5);

      const debugData = {
        session: session.session,
        user: user.user,
        userMetadata: user.user?.user_metadata,
        studentsTableError: studentsError,
        studentsData: students,
        contextUser: user,
        contextProfile: userProfile
      };

      setDebugInfo(debugData);
    } catch (error) {
      setDebugInfo({ error: error.message });
    }
    setLoading(false);
  };

  if (!user) {
    return null; // Only show for authenticated users
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={checkAuthState}
        disabled={loading}
        className="mb-2"
        size="sm"
        style={{
          background: 'linear-gradient(135deg, #dc2626, #ef4444)',
          border: 'none'
        }}
      >
        {loading ? 'Checking...' : '🔍 Debug Auth'}
      </Button>
      
      {debugInfo && (
        <div className="bg-black/90 text-white p-4 rounded-lg max-w-md max-h-96 overflow-auto text-xs">
          <h3 className="font-bold mb-2">Auth Debug Info:</h3>
          <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
          <Button
            onClick={() => setDebugInfo(null)}
            size="sm"
            className="mt-2"
            variant="outline"
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
}
