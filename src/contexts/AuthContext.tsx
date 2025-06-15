
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// Helper: Fake user/session for dev mode with unique but deterministic values
let DEV_FAKE_USER: User | null = null;
let DEV_FAKE_SESSION: Session | null = null;
if (typeof window !== "undefined" && (window as any).__DEV_AUTH_BYPASS__) {
  DEV_FAKE_USER = {
    id: "dev-user-id",
    app_metadata: { provider: "dev" },
    user_metadata: { email: "dev@local.test", name: "Dev User" },
    aud: "authenticated",
    created_at: new Date().toISOString(),
    email: "dev@local.test",
    phone: null,
    confirmation_sent_at: new Date().toISOString(),
    confirmed_at: new Date().toISOString(),
    recovery_sent_at: null,
    last_sign_in_at: new Date().toISOString(),
    role: "authenticated",
    updated_at: new Date().toISOString(),
    identities: [],
    factors: null,
    email_confirmed_at: new Date().toISOString(),
    phone_confirmed_at: null,
  };
  DEV_FAKE_SESSION = {
    access_token: "dev-token",
    token_type: "bearer",
    expires_in: 3600 * 24 * 365,
    refresh_token: "dev-refresh",
    user: DEV_FAKE_USER,
    provider_token: null,
    provider_refresh_token: null,
    expires_at: Math.floor(Date.now() / 1000) + 3600 * 24 * 365,
  };
}

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
  const [user, setUser] = useState<User | null>(DEV_FAKE_USER);
  const [session, setSession] = useState<Session | null>(DEV_FAKE_SESSION);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for dev bypass and short-circuit all logic if enabled
    if (typeof window !== "undefined" && (window as any).__DEV_AUTH_BYPASS__) {
      setUser(DEV_FAKE_USER);
      setSession(DEV_FAKE_SESSION);
      setLoading(false);
      return;
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (
      typeof window !== "undefined" &&
      (window as any).__DEV_AUTH_BYPASS__
    ) {
      // "Fake" sign in—no-op, always succeeds
      setUser(DEV_FAKE_USER);
      setSession(DEV_FAKE_SESSION);
      return { error: null };
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    if (
      typeof window !== "undefined" &&
      (window as any).__DEV_AUTH_BYPASS__
    ) {
      setUser(DEV_FAKE_USER);
      setSession(DEV_FAKE_SESSION);
      return { error: null };
    }
    const redirectUrl = `${window.location.origin}/dashboard`;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    return { error };
  };

  const signOut = async () => {
    if (
      typeof window !== "undefined" &&
      (window as any).__DEV_AUTH_BYPASS__
    ) {
      setUser(DEV_FAKE_USER);
      setSession(DEV_FAKE_SESSION);
      return;
    }
    await supabase.auth.signOut();
  };

  const signInWithGoogle = async () => {
    if (
      typeof window !== "undefined" &&
      (window as any).__DEV_AUTH_BYPASS__
    ) {
      setUser(DEV_FAKE_USER);
      setSession(DEV_FAKE_SESSION);
      return { error: null };
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    return { error };
  };

  const value = {
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
