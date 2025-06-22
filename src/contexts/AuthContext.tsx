
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { logSecurityEvent } from "@/lib/securityLogger";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Enhanced session tracking with device info
  const trackSession = async (session: Session | null) => {
    if (!session) return;

    const deviceInfo = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
    };

    try {
      await supabase
        .from('user_sessions')
        .upsert({
          user_id: session.user.id,
          session_token: session.access_token,
          device_info: deviceInfo,
          last_activity: new Date().toISOString(),
          expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          is_active: true,
        });
    } catch (error) {
      console.error('Error tracking session:', error);
    }
  };

  // Enhanced auth state listener
  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      console.log('Auth state change:', event, !!session);
      
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Track security events
      if (event === 'SIGNED_IN' && session) {
        setTimeout(() => {
          trackSession(session);
          logSecurityEvent({ 
            event: "session_started", 
            userId: session.user.id,
            detail: { event }
          });
        }, 0);
      } else if (event === 'SIGNED_OUT') {
        setTimeout(() => {
          logSecurityEvent({ 
            event: "session_ended",
            detail: { event }
          });
        }, 0);
      }
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      console.log('Initial session:', !!session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (session) {
        setTimeout(() => trackSession(session), 0);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Enhanced sign in with audit logging
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        logSecurityEvent({ 
          event: "login_failed", 
          detail: { email, message: error.message } 
        });
        
        setTimeout(() => {
          supabase
            .from('security_audit_logs')
            .insert([{
              event_type: 'login_failed',
              event_data: { email, error: error.message },
              success: false,
            }]);
        }, 0);
      } else {
        logSecurityEvent({ event: "login_success", detail: { email } });
      }
      
      return { error: error ? { message: error.message } : null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      return { error: { message: error.message || 'An error occurred during sign in' } };
    }
  };

  // Enhanced sign up with audit logging
  const signUp = async (email: string, password: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });
      
      if (error) {
        logSecurityEvent({ 
          event: "signup_failed", 
          detail: { email, message: error.message } 
        });
        
        setTimeout(() => {
          supabase
            .from('security_audit_logs')
            .insert([{
              event_type: 'signup_failed',
              event_data: { email, error: error.message },
              success: false,
            }]);
        }, 0);
      } else {
        logSecurityEvent({ event: "signup_success", detail: { email } });
      }
      
      return { error: error ? { message: error.message } : null };
    } catch (error: any) {
      console.error('Sign up error:', error);
      return { error: { message: error.message || 'An error occurred during sign up' } };
    }
  };

  // Enhanced sign out with session cleanup
  const signOut = async () => {
    try {
      console.log('Starting sign out process...');
      
      if (user) {
        logSecurityEvent({ event: "signout", userId: user.id });
        
        // Mark user sessions as inactive
        setTimeout(() => {
          supabase
            .from('user_sessions')
            .update({ is_active: false })
            .eq('user_id', user.id);
            
          // Log security event
          supabase
            .from('security_audit_logs')
            .insert([{
              user_id: user.id,
              event_type: 'logout',
              event_data: {},
              success: true,
            }]);
        }, 0);
      }
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        throw error;
      }
      
      console.log('Sign out successful');
    } catch (error) {
      console.error('Error during sign out:', error);
      // Force clear the state even if the API call fails
      setUser(null);
      setSession(null);
      throw error;
    }
  };

  // Enhanced Google OAuth with audit logging
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      
      if (error) {
        logSecurityEvent({ 
          event: "google_login_failed", 
          detail: { message: error.message } 
        });
      } else {
        logSecurityEvent({ event: "google_login_attempt" });
      }
      
      return { error: error ? { message: error.message } : null };
    } catch (error: any) {
      console.error('Google sign in error:', error);
      return { error: { message: error.message || 'An error occurred during Google sign in' } };
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
