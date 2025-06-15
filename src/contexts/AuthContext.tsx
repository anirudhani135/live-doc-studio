import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { logSecurityEvent } from "@/lib/securityLogger";

// The shape of our AuthContext
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<{ error: any }>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook
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

  // Listen to auth state changes and session restoration
  useEffect(() => {
    // 1. Listen to onAuthStateChange events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Restore session at app start
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Secure sign in
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      logSecurityEvent({ event: "login_failed", detail: { email, message: error.message } });
    } else {
      logSecurityEvent({ event: "login_success", detail: { email } });
    }
    return { error: error ? { message: error.message } : null };
  };

  // Secure sign up, with redirect for email validation
  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });
    if (error) {
      logSecurityEvent({ event: "signup_failed", detail: { email, message: error.message } });
    } else {
      logSecurityEvent({ event: "signup_success", detail: { email } });
    }
    return { error: error ? { message: error.message } : null };
  };

  const signOut = async () => {
    if (user) {
      logSecurityEvent({ event: "signout", userId: user.id });
    }
    await supabase.auth.signOut();
    // user and session will be nulled by the event handler
  };

  // Google OAuth
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    if (error) {
      logSecurityEvent({ event: "google_login_failed", detail: { message: error.message } });
    } else {
      logSecurityEvent({ event: "google_login_attempt" });
    }
    return { error: error ? { message: error.message } : null };
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
