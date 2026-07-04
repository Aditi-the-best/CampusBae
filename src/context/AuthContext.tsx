import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

interface StudentProfile {
  name: string;
  email: string;
  enrollment_number: string;
  branch: string;
  batch: number;
}

interface AuthContextType {
  user: User | null;
  userProfile: StudentProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string, enrollmentNumber: string, branch: string, batch: string) => Promise<void>;
  signOut: () => Promise<void>;
  getUserProfile: () => Promise<StudentProfile | null>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null,
  userProfile: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  getUserProfile: async () => null,
  resetPassword: async () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string) => {
    
    // Validate email format
    if (!email || !email.includes('@')) {
      throw new Error('📧 Please enter a valid email address.');
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email: email.trim().toLowerCase(), 
      password 
    });
    
    if (error) {
      
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('🔐 Incorrect email or password. Please check your credentials and try again.');
      }
      if (error.message.includes('Email not confirmed')) {
        throw new Error('📧 Please check your email and click the confirmation link before logging in.');
      }
      if (error.message.includes('Too many requests')) {
        throw new Error('⏱️ Too many login attempts. Please wait a moment and try again.');
      }
      if (error.message.includes('User not found')) {
        throw new Error('👤 No account found with this email address. Please sign up first.');
      }
      throw new Error(`❌ Login failed: ${error.message}`);
    }
    
    if (data.user) {
      
    }
  };

  const signUp = async (name: string, email: string, password: string, enrollmentNumber: string, branch: string, batch: string) => {
    // Validate college email domain
    if (!email.endsWith('@igdtuw.ac.in')) {
      throw new Error('🏫 Please use your official IGDTUW college email address (@igdtuw.ac.in)');
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@igdtuw\.ac\.in$/;
    if (!emailRegex.test(email)) {
      throw new Error('📞 Invalid email format. Please use a valid IGDTUW email address.');
    }

    // Enhanced validation for IGDTUW email structure
    const localPart = email.split('@')[0];
    
    // Check minimum length
    if (localPart.length < 5) {
      throw new Error('🏫 Please use your complete college email address (minimum 5 characters before @igdtuw.ac.in).');
    }

    // Check for invalid patterns
    if (localPart.includes('..') || localPart.startsWith('.') || localPart.endsWith('.')) {
      throw new Error('📞 Invalid email format. Please check your email address.');
    }

    // More restrictive validation for realistic email structure
    const validLocalPartRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?$/;
    if (!validLocalPartRegex.test(localPart)) {
      throw new Error('📞 Please enter a valid IGDTUW email address.');
    }

    // Check for suspicious patterns that indicate fake emails
    const suspiciousPatterns = [
      /^test/i, /^fake/i, /^dummy/i, /^sample/i,
      /test$/i, /fake$/i, /dummy$/i, /sample$/i,
      /123456/, /qwerty/i, /asdf/i, /^admin/i,
      /^user/i, /^student/i, /^demo/i
    ];
    
    const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(localPart));
    if (isSuspicious) {
      throw new Error('🏫 Please use your actual IGDTUW college email address, not a test or fake email.');
    }

    // Enhanced IGDTUW email pattern validation
    // IGDTUW emails follow pattern: name###[bt|mt|phd][branch][year]@igdtuw.ac.in
    // Example: ishanvi048bteceai24@igdtuw.ac.in
    
    // Check if it follows the basic structure: letters + 3 digits + degree + branch + year
    const igdtuwEmailPattern = /^[a-zA-Z]+[0-9]{3}(bt|mt|phd)(cseai|cse|ece|mae|eceai|mac|it|aiml|dmam)(2[2-5])$/;
    
    if (!igdtuwEmailPattern.test(localPart)) {
      // Break down the validation to give specific error messages
      const nameNumbersPattern = /^[a-zA-Z]+[0-9]{3}/;
      if (!nameNumbersPattern.test(localPart)) {
        throw new Error('🏫 IGDTUW email must start with your name followed by 3 digits (e.g., ishanvi048...)');
      }
      
      const degreePattern = /(bt|mt|phd)/;
      if (!degreePattern.test(localPart)) {
        throw new Error('🏫 IGDTUW email must include degree code: bt (BTech), mt (MTech), or phd (PhD)');
      }
      
      const branchPattern = /(cseai|cse|ece|mae|eceai|mac|it|aiml|dmam)/;
      if (!branchPattern.test(localPart)) {
        throw new Error('🏫 IGDTUW email must include valid branch code: cseai, cse, ece, mae, eceai, mac, it, aiml, or dmam');
      }
      
      const yearPattern = /(2[2-5])$/;
      if (!yearPattern.test(localPart)) {
        throw new Error('🏫 IGDTUW email must end with admission year: 22, 23, 24, or 25');
      }
      
      // If we reach here, there's some other formatting issue
      throw new Error('🏫 Please use correct IGDTUW email format: yourname###bt/mt/phd + branch + year@igdtuw.ac.in (e.g., ishanvi048bteceai24@igdtuw.ac.in)');
    }

    

    // Validate password strength
    if (password.length < 6) {
      throw new Error('🔒 Password must be at least 6 characters long');
    }


    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          enrollmentNumber,
          branch,
          batch: parseInt(batch)
        }
      }
    });

    if (signUpError) {
      
      if (signUpError.message.includes('User already registered')) {
        throw new Error('📝 This email is already registered. Please try logging in instead.');
      }
      if (signUpError.message.includes('Password should be')) {
        throw new Error('🔒 Password is too weak. Please use a stronger password.');
      }
      if (signUpError.message.includes('Unable to validate email address') || 
          signUpError.message.includes('Invalid email') ||
          signUpError.message.includes('Email address is invalid')) {
        throw new Error('📞 Invalid email address. Please check if your IGDTUW email is correct and exists.');
      }
      if (signUpError.message.includes('Signup is disabled')) {
        throw new Error('🚫 Account registration is temporarily disabled. Please contact support.');
      }
      throw new Error(`❌ Signup failed: ${signUpError.message}`);
    }
    
    if (!user) {
      throw new Error('❌ Signup failed. Please try again with a valid email address.');
    }


    // Save profile info to user metadata (more reliable approach)
    
    try {
      // First, get a fresh user session to ensure we have the latest user object
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay for user creation to complete
      
      const { error: metadataError } = await supabase.auth.updateUser({
        data: {
          name: name?.trim(),
          enrollment_number: enrollmentNumber?.trim(),
          branch: branch?.trim(),
          batch: parseInt(batch)
        }
      });
      
      if (metadataError) {
        // Don't throw error here - signup was successful, profile can be completed later
      } else {
      }
    } catch (err) {
      // Don't throw error here - signup was successful
    }
    
    // Note: Supabase requires email confirmation by default
    // The user will need to check their email and confirm before they can login
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUserProfile(null); // Clear profile on logout
  };

  const resetPassword = async (email: string) => {
    // Validate email format
    if (!email || !email.includes('@')) {
      throw new Error('📧 Please enter a valid email address.');
    }

    // Use same email validation as signup - just check domain and basic format
    const trimmedEmail = email.trim().toLowerCase();
    
    // Check domain first
    if (!trimmedEmail.endsWith('@igdtuw.ac.in')) {
      throw new Error('🏫 Please use your official IGDTUW college email address (@igdtuw.ac.in).');
    }

    // Check basic email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@igdtuw\.ac\.in$/;
    if (!emailRegex.test(trimmedEmail)) {
      throw new Error('📞 Invalid email format. Please use a valid IGDTUW email address.');
    }

    // Now with SendGrid SMTP configured, try to send the reset email
    // Use current origin for both development and production
    const redirectUrl = window.location.origin;
    
    console.log('🔗 Password reset will redirect to:', redirectUrl);
      
    const { error } = await supabase.auth.resetPasswordForEmail(trimmedEmail, {
      redirectTo: redirectUrl
    });

    if (error) {
      console.log('🔍 Password reset error:', error.message, error.status);
      
      // Handle rate limiting
      if (error.message.includes('rate limit') || error.message.includes('too many requests')) {
        throw new Error('⏰ Too many reset attempts. Please wait a few minutes before trying again.');
      }
      // Handle user not found  
      if (error.message.includes('not found') || error.message.includes('user not found')) {
        throw new Error('� No account found with this email address. Please check your email or sign up.');
      }
      // Handle SMTP issues
      if (error.message.includes('Error sending recovery email') || error.status === 500) {
        throw new Error('📧 Email service is having issues. Please try again in a few minutes or contact support via WhatsApp/Instagram.');
      }
      // Handle any other error
      throw new Error(`❌ Password reset failed: ${error.message}`);
    }
  };

  const getUserProfile = async (): Promise<StudentProfile | null> => {
    if (!user) {
      return null;
    }
    
    
    try {
      // Get current user metadata first
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      const userMeta = currentUser?.user_metadata || {};
      
      
      // Try to fetch from database
      let rawData = null;
      try {
        const { data: dbData, error: dbError } = await supabase
          .from('students')
          .select('name, email, enrollment_number, branch, year')
          .eq('id', user.id)
          .single();
        
        if (!dbError && dbData) {
          rawData = dbData;
        } else {
        }
      } catch (dbError) {
      }
      
      // Build profile data with metadata fallback
      const data = {
        name: rawData?.name || userMeta.name || 'Not available',
        email: rawData?.email || currentUser?.email || 'Not available',
        enrollment_number: rawData?.enrollment_number || userMeta.enrollment_number || userMeta.enrollmentNumber || 'Not available',
        branch: rawData?.branch || userMeta.branch || 'Not available', 
        batch: rawData?.year || userMeta.batch || 'Not available'
      };
      
      
      // If we have user metadata but no database record, try to create one
      if (!rawData && userMeta.name) {
        try {
          await supabase
            .from('students')
            .insert([{
              id: user.id,
              name: userMeta.name,
              email: currentUser?.email,
              enrollment_number: userMeta.enrollment_number || userMeta.enrollmentNumber,
              branch: userMeta.branch,
              year: userMeta.batch
            }]);
        } catch (insertError) {
        }
      }
      
      return data as StudentProfile;
    } catch (error) {
      
      // Final fallback - try to get basic info from auth user
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (currentUser?.user_metadata) {
          return {
            name: currentUser.user_metadata.name || 'Not available',
            email: currentUser.email || 'Not available',
            enrollment_number: currentUser.user_metadata.enrollment_number || currentUser.user_metadata.enrollmentNumber || 'Not available',
            branch: currentUser.user_metadata.branch || 'Not available',
            batch: currentUser.user_metadata.batch || 'Not available'
          } as StudentProfile;
        }
      } catch (fallbackError) {
      }
      
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    // Check active sessions and sets the user
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
        }
        if (mounted) {
          const newUser = session?.user ?? null;
          setUser(newUser);
          setLoading(false); // Set loading to false immediately after setting user
          
          // Fetch user profile asynchronously (non-blocking)
          if (newUser) {
            fetchUserProfile(newUser.id);
          } else {
            setUserProfile(null);
          }
        }
      } catch (error) {
        if (mounted) {
          setUser(null);
          setUserProfile(null);
          setLoading(false);
        }
      }
    };

    const fetchUserProfile = async (userId: string) => {
      try {
        // Get current user metadata first
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        const userMeta = currentUser?.user_metadata || {};
        
        
        // We don't use a separate students table anymore - all profile data is in user_metadata
        // This makes the system more reliable and doesn't require database schema
        
        // Build profile data from metadata only
        const data = {
          name: userMeta.name || 'Not available',
          email: currentUser?.email || 'Not available',
          enrollment_number: userMeta.enrollment_number || userMeta.enrollmentNumber || 'Not available',
          branch: userMeta.branch || 'Not available', 
          batch: userMeta.batch || 'Not available'
        };
        
        
        if (mounted) {
          setUserProfile(data as StudentProfile);
        }
        
        // No need to create database records since we use user_metadata only
        
      } catch (error) {
        if (mounted) {
          // Final fallback - use metadata if available
          try {
            const { data: { user: currentUser } } = await supabase.auth.getUser();
            if (currentUser?.user_metadata) {
              setUserProfile({
                name: currentUser.user_metadata.name || 'Not available',
                email: currentUser.email || 'Not available',
                enrollment_number: currentUser.user_metadata.enrollment_number || currentUser.user_metadata.enrollmentNumber || 'Not available',
                branch: currentUser.user_metadata.branch || 'Not available',
                batch: currentUser.user_metadata.batch || 'Not available'
              } as StudentProfile);
            } else {
              setUserProfile(null);
            }
          } catch (fallbackError) {
            setUserProfile(null);
          }
        }
      }
    };

    getInitialSession();

    // Listen for changes on auth state (login, logout, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        const newUser = session?.user ?? null;
        setUser(newUser);
        setLoading(false); // Set loading to false immediately
        
        // Fetch user profile asynchronously (non-blocking)
        if (newUser) {
          fetchUserProfile(newUser.id);
        } else {
          setUserProfile(null);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, signIn, signUp, signOut, getUserProfile, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
